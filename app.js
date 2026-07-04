/* ============================================================================
 * BathCooking — app.js
 * Logique : génération de menu + liste de courses selon les contraintes.
 * Dépend de window.BATHCOOKING_DATA (défini dans data.js, chargé avant).
 * ==========================================================================*/
(function () {
  "use strict";

  const { ENSEIGNES, RAYONS, CATALOGUE, RECETTES } = window.BATHCOOKING_DATA;

  const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const SAISON_LABEL = {
    printemps: "🌸 printemps",
    ete: "☀️ été",
    automne: "🍂 automne",
    hiver: "❄️ hiver",
    toutes: "toute l'année",
  };

  // Saison courante d'après le mois (Date du navigateur)
  function saisonActuelle() {
    const m = new Date().getMonth(); // 0 = janvier
    if (m >= 2 && m <= 4) return "printemps";
    if (m >= 5 && m <= 7) return "ete";
    if (m >= 8 && m <= 10) return "automne";
    return "hiver";
  }

  // Résout l'option saison ("auto" -> saison courante ; "toutes"/explicite tel quel)
  function resoudreSaison(saison) {
    return saison === "auto" ? saisonActuelle() : saison || "toutes";
  }

  // Une recette convient-elle à la saison visée ?
  // (recette sans champ `saisons` = valable toute l'année)
  function recetteDeSaison(r, saisonEff) {
    if (!saisonEff || saisonEff === "toutes") return true;
    if (!r.saisons || !r.saisons.length) return true;
    return r.saisons.includes(saisonEff);
  }

  // Formate une quantité par personne × N convives pour l'affichage recette
  function fmtQte(qte, unite, personnes) {
    const total = Math.round(qte * personnes * 100) / 100;
    if (unite === "kg" && total < 1) return total * 1000 + " g";
    if (unite === "l" && total < 1) return Math.round(total * 1000) + " ml";
    if (unite === "piece") return total + (total > 1 ? " pièces" : " pièce");
    return total + " " + unite;
  }

  // --- Helpers -------------------------------------------------------------

  // Prix mini d'un ingrédient parmi les enseignes retenues (ignore les null)
  function prixMini(ingId, enseignes) {
    const prix = CATALOGUE[ingId].prix;
    let best = null;
    for (const e of enseignes) {
      const p = prix[e];
      if (p == null) continue;
      if (best === null || p < best.prix) best = { enseigne: e, prix: p };
    }
    return best; // { enseigne, prix } ou null si inconnu partout
  }

  // Coût d'une recette pour N personnes en achetant chaque ingrédient au moins cher
  function coutRecette(recette, personnes, enseignes) {
    let total = 0;
    for (const ing of recette.ingredients) {
      const best = prixMini(ing.id, enseignes);
      if (best) total += ing.qte * personnes * best.prix;
    }
    return total;
  }

  // Mélange déterministe léger (Fisher-Yates) — variété sans dépendance externe
  function melange(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // --- Génération du menu --------------------------------------------------
  /*
   * options = {
   *   personnes, budget, creneaux ('midi'|'soir'|'les_deux'),
   *   repetition (repas identiques d'affilée par plat cuisiné),
   *   complexiteMax (1-3), enseignes: [...]
   * }
   */
  function genererMenu(options) {
    const { personnes, budget, creneaux, repetition, complexiteMax, enseignes, saison } = options;
    const saisonEff = resoudreSaison(saison);

    // 1. Liste des créneaux à remplir (jour + moment)
    const moments = creneaux === "les_deux" ? ["midi", "soir"] : [creneaux];
    const slots = [];
    for (const jour of JOURS) {
      for (const moment of moments) {
        slots.push({ jour, moment });
      }
    }
    const nbRepas = slots.length;

    // 2. Recettes éligibles (complexité <= max + de saison), avec coût par repas.
    //    Si le filtre saison laisse trop peu de recettes, on retombe sur toutes
    //    les recettes (complexité seule) pour ne jamais bloquer la génération.
    const eligiblesSaison = RECETTES.filter(
      (r) => r.complexite <= complexiteMax && recetteDeSaison(r, saisonEff)
    );
    const base =
      eligiblesSaison.length >= 12
        ? eligiblesSaison
        : RECETTES.filter((r) => r.complexite <= complexiteMax);
    const avecCout = base.map((r) => ({
      recette: r,
      cout: coutRecette(r, personnes, enseignes),
    }));

    // 3. Batch cooking : on regroupe les créneaux par paquets de `repetition`
    //    repas consécutifs. Chaque paquet = UN SEUL plat (cuisiné une fois,
    //    mangé N fois) → moins de cuisine dans la semaine.
    const R = Math.max(1, repetition || 1);
    const groupes = [];
    for (let i = 0; i < slots.length; i += R) {
      groupes.push(slots.slice(i, i + R));
    }

    const compteur = {};       // id -> nb de fois choisi (pour la variété)
    const menu = [];
    let coutCourant = 0;

    for (const groupe of groupes) {
      // Le plat doit convenir à TOUS les moments couverts par le paquet
      // (ex. si un paquet couvre midi ET soir, il faut une recette compatible
      //  avec les deux).
      const momentsGroupe = [...new Set(groupe.map((s) => s.moment))];
      let candidates = avecCout.filter((c) =>
        momentsGroupe.every((m) => c.recette.creneaux.includes(m))
      );
      // repli si aucune recette ne couvre tous les moments : au moins le 1er
      if (candidates.length === 0) {
        candidates = avecCout.filter((c) =>
          c.recette.creneaux.includes(momentsGroupe[0])
        );
      }

      if (candidates.length === 0) {
        for (const slot of groupe) menu.push({ ...slot, recette: null });
        continue;
      }

      // Cible de coût par repas (budget restant / repas restants)
      const repasRestants = nbRepas - menu.length;
      const budgetRestant = budget - coutCourant;
      const cible = budgetRestant / repasRestants;

      // Priorité : recettes pas encore utilisées (variété entre paquets) et
      // sous la cible budget ; sinon la moins chère.
      const sousCible = melange(candidates.filter((c) => c.cout <= cible));
      sousCible.sort((a, b) => (compteur[a.recette.id] || 0) - (compteur[b.recette.id] || 0));

      const choix =
        sousCible.find((c) => !compteur[c.recette.id]) ||
        sousCible[0] ||
        candidates.slice().sort((a, b) => a.cout - b.cout)[0];

      compteur[choix.recette.id] = (compteur[choix.recette.id] || 0) + 1;

      // On affecte le MÊME plat à tous les créneaux du paquet
      for (const slot of groupe) {
        coutCourant += choix.cout;
        menu.push({ ...slot, recette: choix.recette, cout: choix.cout });
      }
    }

    return { menu, nbRepas };
  }

  // --- Liste de courses ----------------------------------------------------
  // Agrège les ingrédients de tout le menu (quantités × personnes cumulées),
  // puis attribue chaque article à l'enseigne la moins chère.
  function genererListeCourses(menu, personnes, enseignes) {
    const agr = {}; // ingId -> qte totale

    for (const jour of menu) {
      if (!jour.recette) continue;
      for (const ing of jour.recette.ingredients) {
        agr[ing.id] = (agr[ing.id] || 0) + ing.qte * personnes;
      }
    }

    // Construit les lignes, regroupées par rayon, avec enseigne la moins chère
    const parRayon = {};
    const totalParEnseigne = {};
    enseignes.forEach((e) => (totalParEnseigne[e] = 0));
    let totalOptimise = 0;

    for (const ingId in agr) {
      const cat = CATALOGUE[ingId];
      const best = prixMini(ingId, enseignes);
      const qte = agr[ingId];
      const cout = best ? qte * best.prix : null;

      if (best) {
        totalOptimise += cout;
        totalParEnseigne[best.enseigne] += cout;
      }

      const rayon = cat.rayon;
      if (!parRayon[rayon]) parRayon[rayon] = [];
      parRayon[rayon].push({
        id: ingId,
        nom: cat.nom,
        qte: Math.round(qte * 100) / 100,
        unite: cat.unite,
        enseigne: best ? best.enseigne : null,
        cout: cout ? Math.round(cout * 100) / 100 : null,
      });
    }

    return { parRayon, totalOptimise, totalParEnseigne };
  }

  // --- Rendu HTML ----------------------------------------------------------

  // Dernière liste de courses générée, en texte (pour export)
  let listeCoursesTexte = "";
  let listeCoursesBring = "";

  function fmt(chf) {
    return chf == null ? "—" : chf.toFixed(2) + " CHF";
  }

  // --- Export de la liste de courses ---------------------------------------
  function toast(message) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("visible"), 2600);
  }

  // Copie robuste : Clipboard API si dispo, sinon repli execCommand (http, etc.)
  async function copierTexte(texte) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(texte);
        return;
      }
      throw new Error("clipboard indisponible");
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = texte;
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (!ok) throw new Error("copie échouée");
    }
  }

  function copierListe() {
    if (!listeCoursesTexte) return toast("Génère d'abord un menu 🙂");
    copierTexte(listeCoursesTexte)
      .then(() => toast("📋 Liste copiée dans le presse-papier !"))
      .catch(() => toast("Impossible de copier."));
  }

  function telechargerListe() {
    if (!listeCoursesTexte) return toast("Génère d'abord un menu 🙂");
    const blob = new Blob([listeCoursesTexte], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "liste-courses-bathcooking.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast("⬇️ Liste téléchargée");
  }

  function imprimerListe() {
    if (!listeCoursesTexte) return toast("Génère d'abord un menu 🙂");
    document.body.classList.add("impression-liste");
    window.print();
    setTimeout(() => document.body.classList.remove("impression-liste"), 500);
  }

  function bringListe() {
    if (!listeCoursesBring) return toast("Génère d'abord un menu 🙂");
    // Bring! n'importe que du HTML statique (schema.org) : pas d'import auto
    // possible depuis une liste générée à la volée. On copie donc la liste et
    // on ouvre Bring! pour l'ajouter manuellement.
    const faire = () => {
      window.open("https://web.getbring.com/", "_blank", "noopener");
      toast("📋 Liste copiée — ajoute-la dans Bring!");
    };
    copierTexte(listeCoursesBring).then(faire).catch(faire);
  }

  function afficherResultats(options) {
    const { personnes, budget, enseignes } = options;
    const saisonEff = resoudreSaison(options.saison);
    const { menu, nbRepas } = genererMenu(options);
    const { parRayon, totalOptimise, totalParEnseigne } = genererListeCourses(
      menu,
      personnes,
      enseignes
    );

    // Bannière budget
    const bandeau = document.getElementById("bandeau-budget");
    const depasse = totalOptimise > budget;
    bandeau.className = "bandeau " + (depasse ? "bandeau--rouge" : "bandeau--vert");
    bandeau.innerHTML = `
      <strong>${fmt(totalOptimise)}</strong> estimés pour
      <strong>${nbRepas} repas</strong> · ${personnes} pers.
      &nbsp;·&nbsp; 🌿 ${SAISON_LABEL[saisonEff] || saisonEff}
      &nbsp;|&nbsp; Budget : ${fmt(budget)}
      &nbsp;→&nbsp; ${
        depasse
          ? `⚠️ dépassement de ${fmt(totalOptimise - budget)}`
          : `✅ dans le budget (${fmt(budget - totalOptimise)} de marge)`
      }`;

    // 📅 Menu de la semaine — planning compact (le plat par créneau, sans
    //    répéter la recette entière à chaque fois).
    const elMenu = document.getElementById("resultat-menu");
    let htmlMenu = "";
    let jourCourant = "";
    for (const item of menu) {
      if (item.jour !== jourCourant) {
        if (jourCourant) htmlMenu += "</div>";
        htmlMenu += `<div class="jour"><h3>${item.jour}</h3>`;
        jourCourant = item.jour;
      }
      if (!item.recette) {
        htmlMenu += `
          <div class="repas-plan repas--vide">
            <span class="moment">${item.moment}</span>
            <span class="plat">— aucune recette dispo —</span>
          </div>`;
        continue;
      }
      const r = item.recette;
      htmlMenu += `
        <div class="repas-plan">
          <span class="moment">${item.moment}</span>
          <span class="plat">${r.nom}</span>
          <span class="complexite c${r.complexite}">${"●".repeat(r.complexite)}</span>
          <span class="prix">${fmt(item.cout)}</span>
        </div>`;
    }
    if (jourCourant) htmlMenu += "</div>";
    elMenu.innerHTML = htmlMenu;

    // 🍳 À cuisiner cette semaine — chaque plat UNE fois, avec les quantités
    //    TOTALES (× nb de repas × personnes) : le batch cooking pour de vrai.
    const parRecette = new Map(); // id -> { recette, count, coutRepas }
    for (const item of menu) {
      if (!item.recette) continue;
      const e =
        parRecette.get(item.recette.id) ||
        { recette: item.recette, count: 0, coutRepas: item.cout };
      e.count++;
      parRecette.set(item.recette.id, e);
    }
    const elRec = document.getElementById("resultat-recettes");
    let htmlRec = "";
    for (const { recette: r, count, coutRepas } of parRecette.values()) {
      const totalPortions = personnes * count; // à cuisiner en une seule fois
      const ingHtml = r.ingredients
        .map(
          (ing) =>
            `<li>${CATALOGUE[ing.id].nom} — <strong>${fmtQte(
              ing.qte,
              ing.unite,
              totalPortions
            )}</strong></li>`
        )
        .join("");
      const etapesHtml = (r.etapes || []).map((e) => `<li>${e}</li>`).join("");
      const nbRepasTxt = count > 1 ? `${count} repas` : `1 repas`;

      htmlRec += `
        <details class="repas recette-cuisiner">
          <summary>
            <span class="plat">${r.nom}</span>
            <span class="badge-repas">🔁 ${nbRepasTxt}</span>
            <span class="complexite c${r.complexite}">${"●".repeat(r.complexite)}</span>
            <span class="prix">${fmt(coutRepas * count)}</span>
          </summary>
          <div class="recette-detail">
            <p class="recette-meta">⏱️ ${r.temps || "?"} min · <strong>${nbRepasTxt}</strong> · ${personnes} pers./repas → cuisine <strong>${totalPortions} portions</strong> d'un coup</p>
            <h5>Ingrédients — quantités totales à acheter/cuisiner</h5>
            <ul class="recette-ing">${ingHtml}</ul>
            <h5>Préparation</h5>
            <ol class="recette-etapes">${etapesHtml}</ol>
          </div>
        </details>`;
    }
    elRec.innerHTML = htmlRec;

    // Liste de courses par rayon
    const elListe = document.getElementById("resultat-liste");
    let htmlListe = "";
    for (const rayonKey in RAYONS) {
      const lignes = parRayon[rayonKey];
      if (!lignes || lignes.length === 0) continue;
      htmlListe += `<div class="rayon"><h4>${RAYONS[rayonKey]}</h4><ul>`;
      lignes.sort((a, b) => a.nom.localeCompare(b.nom));
      for (const l of lignes) {
        htmlListe += `
          <li>
            <label><input type="checkbox"> ${l.nom}</label>
            <span class="qte">${l.qte} ${l.unite}</span>
            <span class="ens ens--${l.enseigne || "na"}">${l.enseigne || "?"}</span>
            <span class="prix">${fmt(l.cout)}</span>
          </li>`;
      }
      htmlListe += "</ul></div>";
    }
    elListe.innerHTML = htmlListe;

    // Versions texte de la liste (pour Copier / Télécharger / Bring!)
    let txt = "🛒 Liste de courses — BathCooking\n";
    txt += "Prix : " + window.BATHCOOKING_DATA.prixMaj + "\n";
    let bring = "";
    for (const rayonKey in RAYONS) {
      const lignes = parRayon[rayonKey];
      if (!lignes || !lignes.length) continue;
      txt += `\n${RAYONS[rayonKey]} :\n`;
      const tri = lignes.slice().sort((a, b) => a.nom.localeCompare(b.nom));
      for (const l of tri) {
        txt += `  - ${l.nom} — ${l.qte} ${l.unite}  (${l.enseigne || "?"}, ${fmt(l.cout)})\n`;
        bring += `${l.nom} — ${l.qte} ${l.unite}\n`;
      }
    }
    txt += `\nTotal estimé : ${fmt(totalOptimise)} · ${nbRepas} repas · ${personnes} pers.\n`;
    listeCoursesTexte = txt;
    listeCoursesBring = bring;

    // Récap par enseigne
    const elRecap = document.getElementById("resultat-recap");
    let htmlRecap = '<h4>Répartition par enseigne (au moins cher)</h4><ul>';
    for (const e of enseignes) {
      htmlRecap += `<li><span class="ens ens--${e}">${e}</span> <span class="prix">${fmt(
        totalParEnseigne[e]
      )}</span></li>`;
    }
    htmlRecap += "</ul>";
    elRecap.innerHTML = htmlRecap;

    document.getElementById("resultats").hidden = false;
  }

  // --- Onglet « Recettes » : liste consultable de toutes les recettes ------
  function afficherToutesRecettes() {
    const cont = document.getElementById("liste-recettes");
    if (!cont) return;
    const q = (document.getElementById("recherche-recette").value || "")
      .trim()
      .toLowerCase();
    const cx = parseInt(document.getElementById("filtre-complexite").value, 10) || 0;

    const recettes = RECETTES.filter((r) => {
      if (cx && r.complexite !== cx) return false;
      if (q) {
        const foin =
          (r.nom + " " + r.ingredients.map((i) => CATALOGUE[i.id].nom).join(" ")).toLowerCase();
        if (!foin.includes(q)) return false;
      }
      return true;
    });

    let html = "";
    for (const r of recettes) {
      const ingHtml = r.ingredients
        .map(
          (ing) =>
            `<li>${CATALOGUE[ing.id].nom} — <strong>${fmtQte(ing.qte, ing.unite, 1)}</strong></li>`
        )
        .join("");
      const etapesHtml = (r.etapes || []).map((e) => `<li>${e}</li>`).join("");
      const creneaux = r.creneaux.map((c) => `<span class="moment">${c}</span>`).join(" ");

      html += `
        <details class="repas recette-browse">
          <summary>
            <span class="plat">${r.nom}</span>
            <span class="complexite c${r.complexite}">${"●".repeat(r.complexite)}</span>
            <span class="prix">⏱️ ${r.temps || "?"} min</span>
          </summary>
          <div class="recette-detail">
            <p class="recette-meta">${creneaux} · quantités pour 1 personne</p>
            <h5>Ingrédients</h5>
            <ul class="recette-ing">${ingHtml}</ul>
            <h5>Préparation</h5>
            <ol class="recette-etapes">${etapesHtml}</ol>
          </div>
        </details>`;
    }
    cont.innerHTML =
      html || '<p class="vide-recettes">Aucune recette ne correspond à ta recherche.</p>';
  }

  function initOnglets() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        tabs.forEach((x) => x.classList.remove("actif"));
        t.classList.add("actif");
        const cible = "tab-" + t.dataset.tab;
        document
          .querySelectorAll(".tab-contenu")
          .forEach((c) => (c.hidden = c.id !== cible));
      });
    });
  }

  // --- Branchement du formulaire ------------------------------------------
  function init() {
    // Les prix (Migros + Coop) sont stockés directement dans data.js,
    // relevés à la demande via le navigateur. On affiche juste leur date.
    const majEl = document.getElementById("prix-maj");
    if (majEl) majEl.textContent = window.BATHCOOKING_DATA.prixMaj;

    // Onglet Recettes
    initOnglets();
    const nbEl = document.getElementById("nb-recettes");
    if (nbEl) nbEl.textContent = RECETTES.length;
    afficherToutesRecettes();
    const rech = document.getElementById("recherche-recette");
    const filt = document.getElementById("filtre-complexite");
    if (rech) rech.addEventListener("input", afficherToutesRecettes);
    if (filt) filt.addEventListener("change", afficherToutesRecettes);

    // Boutons d'export de la liste de courses
    const brancher = (id, fn) => {
      const b = document.getElementById(id);
      if (b) b.addEventListener("click", fn);
    };
    brancher("btn-copier", copierListe);
    brancher("btn-telecharger", telechargerListe);
    brancher("btn-imprimer", imprimerListe);
    brancher("btn-bring", bringListe);

    const form = document.getElementById("form-courses");

    function lireOptions() {
      const fd = new FormData(form);
      return {
        personnes: parseInt(fd.get("personnes"), 10) || 1,
        budget: parseFloat(fd.get("budget")) || 0,
        creneaux: fd.get("creneaux"),
        repetition: parseInt(fd.get("repetition"), 10) || 1,
        complexiteMax: parseInt(fd.get("complexiteMax"), 10) || 3,
        saison: fd.get("saison") || "auto",
        enseignes: ENSEIGNES.filter((en) => fd.get("enseigne_" + en)),
      };
    }

    function lancerGeneration(scroll) {
      const options = lireOptions();
      if (!options.enseignes.length) {
        const b = document.getElementById("bandeau-budget");
        b.className = "bandeau bandeau--rouge";
        b.textContent = "Sélectionne au moins une enseigne pour calculer les prix.";
        document.getElementById("resultats").hidden = false;
        return;
      }
      afficherResultats(options);
      if (scroll) {
        document.getElementById("resultats").scrollIntoView({ behavior: "smooth" });
      }
    }

    // Génération uniquement au clic : à l'arrivée la page est vide, on remplit
    // le formulaire puis on clique pour obtenir le menu.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      lancerGeneration(true);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
