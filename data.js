/* ============================================================================
 * BathCooking — data.js
 * Base de données : catalogue d'ingrédients (prix 3 enseignes) + recettes.
 *
 * ⚠️ Prix = DÉMO. Ils sont remplacés au chargement par les prix réels
 *    récupérés via Google Apps Script si config.js définit un endpoint
 *    (voir google-apps-script/Code.gs et config.js).
 *
 * Wrappé en IIFE et exposé via window.BATHCOOKING_DATA pour éviter toute
 * collision de const/let au niveau global avec app.js.
 * ==========================================================================*/
(function () {
  "use strict";

  const ENSEIGNES = ["migros", "coop"];

  const RAYONS = {
    legumes: "Fruits & légumes",
    viande: "Viande & poisson",
    frais: "Produits frais",
    epicerie: "Épicerie",
    feculents: "Féculents",
    surgele: "Surgelés",
    boisson: "Boissons",
    autre: "Divers",
  };

  /* --------------------------------------------------------------------------
   * CATALOGUE D'INGRÉDIENTS
   *   id · nom · unite (kg|l|piece) · rayon · prix {migros,denner,coop} CHF/unité
   * ------------------------------------------------------------------------*/
  const CATALOGUE = {
    pates:        { nom: "Pâtes",              unite: "kg",    rayon: "feculents", prix: { migros: 1.2, denner: 1.60, coop: 3.5 } },
    riz:          { nom: "Riz",                unite: "kg",    rayon: "feculents", prix: { migros: 1.4, denner: 2.10, coop: 1.4 } },
    pommesdeterre:{ nom: "Pommes de terre",    unite: "kg",    rayon: "legumes",   prix: { migros: 1.2, denner: 1.70, coop: 1.1 } },
    quinoa:       { nom: "Quinoa",             unite: "kg",    rayon: "feculents", prix: { migros: 5.9, denner: 7.90, coop: 8.9 } },
    lentilles:    { nom: "Lentilles",          unite: "kg",    rayon: "epicerie",  prix: { migros: 4.1, denner: 3.30, coop: 3.8 } },
    poischiches:  { nom: "Pois chiches",       unite: "kg",    rayon: "epicerie",  prix: { migros: 4.3, denner: 3.00, coop: 4.3 } },
    farine:       { nom: "Farine",             unite: "kg",    rayon: "epicerie",  prix: { migros: 1, denner: 1.20, coop: 1 } },
    painburger:   { nom: "Pains à burger",     unite: "piece", rayon: "feculents", prix: { migros: 0.4, denner: 0.45, coop: 0.4 } },
    tortillas:    { nom: "Tortillas",          unite: "piece", rayon: "feculents", prix: { migros: 0.35, denner: 0.40, coop: 0.7 } },
    pate_feuille: { nom: "Pâte feuilletée",    unite: "piece", rayon: "epicerie",  prix: { migros: 1.6, denner: 1.90, coop: 1.15 } },

    pouletfilet:  { nom: "Filet de poulet",    unite: "kg",    rayon: "viande",    prix: { migros: 15.8, denner: 18.5, coop: 15.8 } },
    boeufhache:   { nom: "Bœuf haché",         unite: "kg",    rayon: "viande",    prix: { migros: 16, denner: 15.0, coop: 14.2 } },
    lardons:      { nom: "Lardons",            unite: "kg",    rayon: "viande",    prix: { migros: 12, denner: 13.0, coop: 11.8 } },
    saumon:       { nom: "Filet de saumon",    unite: "kg",    rayon: "viande",    prix: { migros: 14, denner: 29.0, coop: 23.8 } },
    thonboite:    { nom: "Thon en boîte",      unite: "kg",    rayon: "epicerie",  prix: { migros: 8.7, denner: 11.0, coop: 8.4 } },
    saucisse:     { nom: "Saucisses",          unite: "kg",    rayon: "viande",    prix: { migros: 6.3, denner: 12.0, coop: 6.3 } },
    jambon:       { nom: "Jambon",             unite: "kg",    rayon: "viande",    prix: { migros: 16.5, denner: 19.0, coop: 16.5 } },

    oeufs:        { nom: "Œufs",               unite: "piece", rayon: "frais",     prix: { migros: 0.53, denner: 0.42, coop: 0.43 } },
    lait:         { nom: "Lait",               unite: "l",     rayon: "frais",     prix: { migros: 1.4, denner: 1.45, coop: 1.13 } },
    creme:        { nom: "Crème",              unite: "l",     rayon: "frais",     prix: { migros: 6.4, denner: 3.90, coop: 6.6 } },
    beurre:       { nom: "Beurre",             unite: "kg",    rayon: "frais",     prix: { migros: 13.6, denner: 11.5, coop: 15.4 } },
    fromagerape:  { nom: "Fromage râpé",       unite: "kg",    rayon: "frais",     prix: { migros: 7.4, denner: 12.5, coop: 15 } },
    mozzarella:   { nom: "Mozzarella",         unite: "kg",    rayon: "frais",     prix: { migros: 5.6, denner: 9.50, coop: 5.6 } },
    parmesan:     { nom: "Parmesan",           unite: "kg",    rayon: "frais",     prix: { migros: 36, denner: 22.0, coop: 22.4 } },
    yaourtnature: { nom: "Yaourt nature",      unite: "kg",    rayon: "frais",     prix: { migros: 1.6, denner: 2.50, coop: 1.6 } },

    oignon:       { nom: "Oignons",            unite: "kg",    rayon: "legumes",   prix: { migros: 1.7, denner: 2.10, coop: 1.7 } },
    ail:          { nom: "Ail",                unite: "kg",    rayon: "legumes",   prix: { migros: 5, denner: 6.50, coop: 5 } },
    carotte:      { nom: "Carottes",           unite: "kg",    rayon: "legumes",   prix: { migros: 2, denner: 1.80, coop: 1.6 } },
    tomate:       { nom: "Tomates",            unite: "kg",    rayon: "legumes",   prix: { migros: 1.6, denner: 2.90, coop: 1.6 } },
    courgette:    { nom: "Courgettes",         unite: "kg",    rayon: "legumes",   prix: { migros: 4, denner: 2.50, coop: 4 } },
    poivron:      { nom: "Poivrons",           unite: "kg",    rayon: "legumes",   prix: { migros: 3.2, denner: 3.80, coop: 3.3 } },
    salade:       { nom: "Salade",             unite: "piece", rayon: "legumes",   prix: { migros: 1.8, denner: 1.50, coop: 1.8 } },
    champignon:   { nom: "Champignons",        unite: "kg",    rayon: "legumes",   prix: { migros: 4, denner: 5.80, coop: 7.5 } },
    brocoli:      { nom: "Brocoli",            unite: "kg",    rayon: "legumes",   prix: { migros: 4.5, denner: 3.30, coop: 4.5 } },
    epinard:      { nom: "Épinards",           unite: "kg",    rayon: "legumes",   prix: { migros: 4, denner: 4.20, coop: 2.6 } },
    citron:       { nom: "Citron",             unite: "piece", rayon: "legumes",   prix: { migros: 0.4, denner: 0.55, coop: 0.4 } },
    avocat:       { nom: "Avocat",             unite: "piece", rayon: "legumes",   prix: { migros: 2.0, denner: 1.50, coop: 1.3 } },

    saucetomate:  { nom: "Sauce tomate",       unite: "kg",    rayon: "epicerie",  prix: { migros: 4.3, denner: 2.30, coop: 1.3 } },
    huile:        { nom: "Huile d'olive",      unite: "l",     rayon: "epicerie",  prix: { migros: 7, denner: 9.50, coop: 7 } },
    boncube:      { nom: "Bouillon cube",      unite: "piece", rayon: "epicerie",  prix: { migros: 0.15, denner: 0.11, coop: 0.15 } },
    curry:        { nom: "Curry / épices",     unite: "kg",    rayon: "epicerie",  prix: { migros: 90, denner: 24.0, coop: 130 } },
    laitcoco:     { nom: "Lait de coco",       unite: "l",     rayon: "epicerie",  prix: { migros: 3.5, denner: 2.80, coop: 4 } },
    saucesoja:    { nom: "Sauce soja",         unite: "l",     rayon: "epicerie",  prix: { migros: 7, denner: 4.80, coop: 9.85 } },
    haricotrouge: { nom: "Haricots rouges",    unite: "kg",    rayon: "epicerie",  prix: { migros: 3.1, denner: 2.90, coop: 3.1 } },
    mais:         { nom: "Maïs",               unite: "kg",    rayon: "epicerie",  prix: { migros: 3.3, denner: 3.20, coop: 1.5 } },
    pesto:        { nom: "Pesto",              unite: "kg",    rayon: "epicerie",  prix: { migros: 7.1, denner: 11.0, coop: 7.1 } },

    /* --- Ingredients lot 3 (auto) --- */
  gnocchi:      { nom: "Gnocchi",                unite: "kg",    rayon: "feculents", prix: { migros: 2.8,  denner: 4.20,  coop: 2.8  } },
  spaetzli:     { nom: "Spätzli",                unite: "kg",    rayon: "feculents", prix: { migros: 3.6,  denner: 5.50,  coop: 3.6  } },
  nouilleschin: { nom: "Nouilles chinoises",     unite: "kg",    rayon: "feculents", prix: { migros: 7.8,  denner: 3.80,  coop: 7.8  } },
  boulgour:     { nom: "Boulgour",               unite: "kg",    rayon: "feculents", prix: { migros: 2.6,  denner: 3.40,  coop: 3.7  } },
  couscous:     { nom: "Semoule de couscous",    unite: "kg",    rayon: "feculents", prix: { migros: 3,  denner: 3.20,  coop: 3  } },
  pain:         { nom: "Pain",                   unite: "kg",    rayon: "feculents", prix: { migros: 2,  denner: 3.30,  coop: 2  } },
  chorizo:      { nom: "Chorizo",                unite: "kg",    rayon: "viande",    prix: { migros: 18, denner: 18.50, coop: 17.7 } },
  cabillaud:    { nom: "Filet de cabillaud",     unite: "kg",    rayon: "surgele",   prix: { migros: 10.8, denner: 20.00, coop: 15.3 } },
  crevettes:    { nom: "Crevettes",              unite: "kg",    rayon: "surgele",   prix: { migros: 23.9, denner: 23.00, coop: 19.7 } },
  feta:         { nom: "Feta",                   unite: "kg",    rayon: "frais",     prix: { migros: 12.2, denner: 11.50, coop: 12.2 } },
  ricotta:      { nom: "Ricotta",                unite: "kg",    rayon: "frais",     prix: { migros: 8.8,  denner: 7.50,  coop: 6.8 } },
  gruyere:      { nom: "Gruyère",                unite: "kg",    rayon: "frais",     prix: { migros: 13, denner: 18.00, coop: 14.8 } },
  raclette:     { nom: "Fromage à raclette",     unite: "kg",    rayon: "frais",     prix: { migros: 12, denner: 16.50, coop: 22.5 } },
  tofu:         { nom: "Tofu",                   unite: "kg",    rayon: "frais",     prix: { migros: 3.8, denner: 10.00, coop: 13.8 } },
  aubergine:    { nom: "Aubergine",              unite: "kg",    rayon: "legumes",   prix: { migros: 3.8,  denner: 4.60,  coop: 3.8  } },
  choufleur:    { nom: "Chou-fleur",             unite: "kg",    rayon: "legumes",   prix: { migros: 2.5,  denner: 3.80,  coop: 4.5  } },
  petitspois:   { nom: "Petits pois",            unite: "kg",    rayon: "surgele",   prix: { migros: 3.2,  denner: 3.30,  coop: 3.2  } },
  patatedouce:  { nom: "Patate douce",           unite: "kg",    rayon: "legumes",   prix: { migros: 1.8,  denner: 3.80,  coop: 1.8  } },
  poireau:      { nom: "Poireau",                unite: "kg",    rayon: "legumes",   prix: { migros: 4.3,  denner: 3.40,  coop: 4.8  } },
  concombre:    { nom: "Concombre",              unite: "piece", rayon: "legumes",   prix: { migros: 1.5,  denner: 1.50,  coop: 1.48  } },
  gingembre:    { nom: "Gingembre",              unite: "kg",    rayon: "legumes",   prix: { migros: 6.5,  denner: 7.50,  coop: 9.0 } },
  basilic:      { nom: "Basilic frais",          unite: "piece", rayon: "legumes",   prix: { migros: 1.95,  denner: 2.30,  coop: 0.85  } },
  paprika:      { nom: "Paprika",                unite: "kg",    rayon: "epicerie",  prix: { migros: 9, denner: 15.00, coop: 8.8 } },
  cumin:        { nom: "Cumin",                  unite: "kg",    rayon: "epicerie",  prix: { migros: 24, denner: 18.00, coop: 80 } },
  moutarde:     { nom: "Moutarde",               unite: "kg",    rayon: "epicerie",  prix: { migros: 3,  denner: 5.00,  coop: 3  } },
  vinbalsamique:{ nom: "Vinaigre balsamique",    unite: "l",     rayon: "epicerie",  prix: { migros: 7.9,  denner: 6.50,  coop: 11.8  } },
  miel:         { nom: "Miel",                   unite: "kg",    rayon: "epicerie",  prix: { migros: 6, denner: 13.00, coop: 6 } },
  vinaigre:     { nom: "Vinaigre",               unite: "l",     rayon: "epicerie",  prix: { migros: 0.7,  denner: 2.40,  coop: 0.65  } },
  olives:       { nom: "Olives",                 unite: "kg",    rayon: "epicerie",  prix: { migros: 4.7, denner: 10.00, coop: 4.7 } },
  };

  /* --------------------------------------------------------------------------
   * RECETTES
   *   id · nom · complexite (1-3) · creneaux ["midi","soir"]
   *   temps       : minutes de préparation totale
   *   etapes      : [ "étape 1", "étape 2", ... ]
   *   ingredients : [{ id, qte, unite }]  — QUANTITÉS PAR PERSONNE
   * ------------------------------------------------------------------------*/
  const RECETTES = [
    {
      id: "pates_bolo", nom: "Pâtes bolognaise", complexite: 1, creneaux: ["midi", "soir"], temps: 25,
      etapes: [
        "Faire revenir l'oignon émincé dans un filet d'huile.",
        "Ajouter le bœuf haché et faire dorer.",
        "Verser la sauce tomate, saler, poivrer et laisser mijoter 15 min.",
        "Cuire les pâtes al dente, égoutter et mélanger à la sauce.",
        "Servir avec le fromage râpé.",
      ],
      ingredients: [
        { id: "pates", qte: 0.10, unite: "kg" },
        { id: "boeufhache", qte: 0.12, unite: "kg" },
        { id: "saucetomate", qte: 0.15, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "pates_carbo", nom: "Pâtes carbonara", complexite: 1, creneaux: ["midi", "soir"], temps: 20,
      etapes: [
        "Cuire les pâtes al dente.",
        "Faire dorer les lardons à sec dans une poêle.",
        "Battre les œufs avec la crème et le parmesan.",
        "Hors du feu, mélanger les pâtes chaudes, les lardons et l'appareil aux œufs.",
        "Poivrer généreusement et servir aussitôt.",
      ],
      ingredients: [
        { id: "pates", qte: 0.10, unite: "kg" },
        { id: "lardons", qte: 0.08, unite: "kg" },
        { id: "oeufs", qte: 1, unite: "piece" },
        { id: "creme", qte: 0.05, unite: "l" },
        { id: "parmesan", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "pates_pesto", nom: "Pâtes au pesto", complexite: 1, creneaux: ["midi", "soir"], temps: 15,
      etapes: [
        "Cuire les pâtes al dente et réserver un peu d'eau de cuisson.",
        "Égoutter, remettre dans la casserole hors du feu.",
        "Ajouter le pesto et un peu d'eau de cuisson pour lier.",
        "Parsemer de parmesan et servir.",
      ],
      ingredients: [
        { id: "pates", qte: 0.10, unite: "kg" },
        { id: "pesto", qte: 0.04, unite: "kg" },
        { id: "parmesan", qte: 0.015, unite: "kg" },
      ],
    },
    {
      id: "riz_curry_poulet", nom: "Curry de poulet au riz", complexite: 2, creneaux: ["midi", "soir"], temps: 30,
      etapes: [
        "Cuire le riz.",
        "Faire revenir l'oignon et le poivron émincés.",
        "Ajouter le poulet en morceaux et faire dorer.",
        "Saupoudrer de curry, verser le lait de coco et mijoter 10 min.",
        "Servir sur le riz.",
      ],
      ingredients: [
        { id: "riz", qte: 0.08, unite: "kg" },
        { id: "pouletfilet", qte: 0.15, unite: "kg" },
        { id: "laitcoco", qte: 0.10, unite: "l" },
        { id: "curry", qte: 0.005, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "poivron", qte: 0.08, unite: "kg" },
      ],
    },
    {
      id: "riz_cantonnais", nom: "Riz cantonais", complexite: 2, creneaux: ["midi", "soir"], temps: 25,
      etapes: [
        "Cuire le riz et le laisser refroidir un peu.",
        "Brouiller les œufs dans une poêle, réserver.",
        "Faire sauter la carotte en petits dés et le jambon.",
        "Ajouter le riz, les œufs et la sauce soja, faire sauter à feu vif.",
      ],
      ingredients: [
        { id: "riz", qte: 0.09, unite: "kg" },
        { id: "oeufs", qte: 1, unite: "piece" },
        { id: "jambon", qte: 0.06, unite: "kg" },
        { id: "carotte", qte: 0.05, unite: "kg" },
        { id: "saucesoja", qte: 0.02, unite: "l" },
      ],
    },
    {
      id: "salade_cesar", nom: "Salade César au poulet", complexite: 2, creneaux: ["midi"], temps: 20,
      etapes: [
        "Cuire le poulet à la poêle, le trancher.",
        "Cuire les œufs durs (9 min), les écaler et couper en quartiers.",
        "Laver et couper la salade.",
        "Dresser salade, poulet, œufs, copeaux de parmesan et sauce César.",
      ],
      ingredients: [
        { id: "salade", qte: 0.5, unite: "piece" },
        { id: "pouletfilet", qte: 0.12, unite: "kg" },
        { id: "parmesan", qte: 0.02, unite: "kg" },
        { id: "oeufs", qte: 1, unite: "piece" },
      ],
    },
    {
      id: "omelette", nom: "Omelette aux légumes", complexite: 1, creneaux: ["midi", "soir"], temps: 15,
      etapes: [
        "Faire revenir oignon et poivron en dés.",
        "Battre les œufs, saler, poivrer.",
        "Verser sur les légumes, ajouter le fromage râpé.",
        "Cuire à feu doux, plier et servir.",
      ],
      ingredients: [
        { id: "oeufs", qte: 3, unite: "piece" },
        { id: "poivron", qte: 0.06, unite: "kg" },
        { id: "oignon", qte: 0.04, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "soupe_legumes", nom: "Soupe de légumes", complexite: 1, creneaux: ["soir"], temps: 30,
      etapes: [
        "Éplucher et couper carottes, pommes de terre et oignon.",
        "Faire suer l'oignon, ajouter les légumes.",
        "Couvrir d'eau, ajouter le bouillon cube, cuire 20 min.",
        "Mixer, rectifier l'assaisonnement.",
      ],
      ingredients: [
        { id: "carotte", qte: 0.1, unite: "kg" },
        { id: "pommesdeterre", qte: 0.15, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "boncube", qte: 1, unite: "piece" },
      ],
    },
    {
      id: "burger_maison", nom: "Burger maison & frites", complexite: 2, creneaux: ["soir"], temps: 40,
      etapes: [
        "Couper les pommes de terre en frites, enfourner à 220°C 25 min.",
        "Former les steaks de bœuf haché et les cuire à la poêle.",
        "Toaster les pains, ajouter fromage, tomate et salade.",
        "Assembler le burger et servir avec les frites.",
      ],
      ingredients: [
        { id: "painburger", qte: 1, unite: "piece" },
        { id: "boeufhache", qte: 0.13, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
        { id: "tomate", qte: 0.05, unite: "kg" },
        { id: "salade", qte: 0.2, unite: "piece" },
        { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      ],
    },
    {
      id: "gratin_dauphinois", nom: "Gratin dauphinois", complexite: 2, creneaux: ["soir"], temps: 60,
      etapes: [
        "Éplucher et trancher finement les pommes de terre.",
        "Frotter le plat d'ail, disposer les pommes de terre.",
        "Couvrir de crème et lait, saler, poivrer, ajouter le fromage.",
        "Cuire au four à 180°C pendant 45 min.",
      ],
      ingredients: [
        { id: "pommesdeterre", qte: 0.25, unite: "kg" },
        { id: "creme", qte: 0.1, unite: "l" },
        { id: "lait", qte: 0.05, unite: "l" },
        { id: "fromagerape", qte: 0.03, unite: "kg" },
        { id: "ail", qte: 0.005, unite: "kg" },
      ],
    },
    {
      id: "saumon_riz_brocoli", nom: "Saumon, riz & brocoli", complexite: 2, creneaux: ["soir"], temps: 30,
      etapes: [
        "Cuire le riz.",
        "Cuire le brocoli à la vapeur 8 min.",
        "Poêler le saumon 3 min de chaque côté, arroser de jus de citron.",
        "Dresser et servir.",
      ],
      ingredients: [
        { id: "saumon", qte: 0.13, unite: "kg" },
        { id: "riz", qte: 0.08, unite: "kg" },
        { id: "brocoli", qte: 0.15, unite: "kg" },
        { id: "citron", qte: 0.3, unite: "piece" },
      ],
    },
    {
      id: "chili_con_carne", nom: "Chili con carne", complexite: 2, creneaux: ["midi", "soir"], temps: 40,
      etapes: [
        "Faire revenir l'oignon, ajouter le bœuf haché.",
        "Ajouter haricots rouges, maïs et sauce tomate.",
        "Épicer (piment/cumin), mijoter 20 min.",
        "Servir avec le riz.",
      ],
      ingredients: [
        { id: "boeufhache", qte: 0.12, unite: "kg" },
        { id: "haricotrouge", qte: 0.1, unite: "kg" },
        { id: "saucetomate", qte: 0.12, unite: "kg" },
        { id: "mais", qte: 0.05, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "riz", qte: 0.06, unite: "kg" },
      ],
    },
    {
      id: "dahl_lentilles", nom: "Dahl de lentilles", complexite: 2, creneaux: ["midi", "soir"], temps: 35,
      etapes: [
        "Faire revenir l'oignon avec le curry.",
        "Ajouter les lentilles et couvrir de lait de coco + eau.",
        "Mijoter 25 min jusqu'à ce que les lentilles soient tendres.",
        "Servir avec le riz.",
      ],
      ingredients: [
        { id: "lentilles", qte: 0.08, unite: "kg" },
        { id: "laitcoco", qte: 0.1, unite: "l" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "curry", qte: 0.005, unite: "kg" },
        { id: "riz", qte: 0.06, unite: "kg" },
      ],
    },
    {
      id: "tortilla_poulet", nom: "Wraps de poulet", complexite: 1, creneaux: ["midi"], temps: 20,
      etapes: [
        "Cuire le poulet en lamelles à la poêle.",
        "Réchauffer les tortillas.",
        "Garnir de salade, tomate, poulet et fromage.",
        "Rouler serré et couper en deux.",
      ],
      ingredients: [
        { id: "tortillas", qte: 2, unite: "piece" },
        { id: "pouletfilet", qte: 0.1, unite: "kg" },
        { id: "salade", qte: 0.2, unite: "piece" },
        { id: "tomate", qte: 0.05, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "quiche_lorraine", nom: "Quiche lorraine", complexite: 2, creneaux: ["midi", "soir"], temps: 45,
      etapes: [
        "Étaler la pâte dans un moule et la piquer.",
        "Répartir les lardons.",
        "Battre œufs + crème + fromage, saler, poivrer, verser.",
        "Cuire au four à 190°C pendant 30 min.",
      ],
      ingredients: [
        { id: "pate_feuille", qte: 0.33, unite: "piece" },
        { id: "lardons", qte: 0.06, unite: "kg" },
        { id: "oeufs", qte: 1.5, unite: "piece" },
        { id: "creme", qte: 0.08, unite: "l" },
        { id: "fromagerape", qte: 0.03, unite: "kg" },
      ],
    },
    {
      id: "risotto_champignons", nom: "Risotto aux champignons", complexite: 3, creneaux: ["soir"], temps: 40,
      etapes: [
        "Préparer un bouillon chaud avec le cube.",
        "Faire revenir oignon puis champignons émincés.",
        "Ajouter le riz, nacrer, puis verser le bouillon louche par louche.",
        "Remuer 18 min, finir avec le parmesan.",
      ],
      ingredients: [
        { id: "riz", qte: 0.09, unite: "kg" },
        { id: "champignon", qte: 0.1, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "parmesan", qte: 0.02, unite: "kg" },
        { id: "boncube", qte: 1, unite: "piece" },
      ],
    },
    {
      id: "pizza_maison", nom: "Pizza maison", complexite: 3, creneaux: ["soir"], temps: 50,
      etapes: [
        "Préparer la pâte (farine, eau, levure, sel), laisser lever.",
        "Étaler, napper de sauce tomate.",
        "Garnir de mozzarella, jambon et champignons.",
        "Cuire à 240°C pendant 12 min.",
      ],
      ingredients: [
        { id: "farine", qte: 0.1, unite: "kg" },
        { id: "saucetomate", qte: 0.08, unite: "kg" },
        { id: "mozzarella", qte: 0.06, unite: "kg" },
        { id: "jambon", qte: 0.04, unite: "kg" },
        { id: "champignon", qte: 0.05, unite: "kg" },
      ],
    },
    {
      id: "poulet_roti_legumes", nom: "Poulet rôti & légumes", complexite: 2, creneaux: ["soir"], temps: 45,
      etapes: [
        "Couper pommes de terre, carottes et courgettes en morceaux.",
        "Disposer avec le poulet dans un plat, huile, sel, herbes.",
        "Rôtir au four à 200°C pendant 35 min en remuant à mi-cuisson.",
      ],
      ingredients: [
        { id: "pouletfilet", qte: 0.15, unite: "kg" },
        { id: "pommesdeterre", qte: 0.2, unite: "kg" },
        { id: "carotte", qte: 0.1, unite: "kg" },
        { id: "courgette", qte: 0.1, unite: "kg" },
      ],
    },
    {
      id: "salade_thon", nom: "Salade de thon", complexite: 1, creneaux: ["midi"], temps: 15,
      etapes: [
        "Cuire les œufs durs, écaler et couper.",
        "Laver et couper la salade et les tomates.",
        "Égoutter le thon et le maïs.",
        "Mélanger le tout, assaisonner d'huile et sel.",
      ],
      ingredients: [
        { id: "thonboite", qte: 0.06, unite: "kg" },
        { id: "salade", qte: 0.4, unite: "piece" },
        { id: "mais", qte: 0.04, unite: "kg" },
        { id: "tomate", qte: 0.08, unite: "kg" },
        { id: "oeufs", qte: 1, unite: "piece" },
      ],
    },
    {
      id: "buddha_bowl", nom: "Buddha bowl quinoa", complexite: 2, creneaux: ["midi"], temps: 25,
      etapes: [
        "Cuire le quinoa et le laisser tiédir.",
        "Égoutter les pois chiches, râper la carotte.",
        "Disposer dans un bol quinoa, pois chiches, épinards, carotte et avocat en tranches.",
        "Assaisonner d'huile, citron et sel.",
      ],
      ingredients: [
        { id: "quinoa", qte: 0.07, unite: "kg" },
        { id: "poischiches", qte: 0.06, unite: "kg" },
        { id: "avocat", qte: 0.5, unite: "piece" },
        { id: "carotte", qte: 0.06, unite: "kg" },
        { id: "epinard", qte: 0.05, unite: "kg" },
      ],
    },
    {
      id: "saucisse_puree", nom: "Saucisses & purée", complexite: 1, creneaux: ["soir"], temps: 30,
      etapes: [
        "Cuire les pommes de terre à l'eau salée 20 min.",
        "Écraser avec lait et beurre, saler.",
        "Griller les saucisses à la poêle.",
        "Servir la purée avec les saucisses.",
      ],
      ingredients: [
        { id: "saucisse", qte: 0.12, unite: "kg" },
        { id: "pommesdeterre", qte: 0.25, unite: "kg" },
        { id: "lait", qte: 0.05, unite: "l" },
        { id: "beurre", qte: 0.015, unite: "kg" },
      ],
    },
    {
      id: "pates_courgette", nom: "Pâtes courgette-crème", complexite: 1, creneaux: ["midi", "soir"], temps: 20,
      etapes: [
        "Cuire les pâtes al dente.",
        "Faire revenir la courgette en dés.",
        "Ajouter la crème, mijoter 5 min, saler et poivrer.",
        "Mélanger aux pâtes, parsemer de parmesan.",
      ],
      ingredients: [
        { id: "pates", qte: 0.1, unite: "kg" },
        { id: "courgette", qte: 0.12, unite: "kg" },
        { id: "creme", qte: 0.06, unite: "l" },
        { id: "parmesan", qte: 0.015, unite: "kg" },
      ],
    },
    {
      id: "gratin_pates", nom: "Gratin de pâtes au jambon", complexite: 2, creneaux: ["soir"], temps: 40,
      etapes: [
        "Cuire les pâtes al dente.",
        "Mélanger avec le jambon en dés et la crème.",
        "Verser dans un plat, couvrir de fromage.",
        "Gratiner au four à 200°C pendant 20 min.",
      ],
      ingredients: [
        { id: "pates", qte: 0.1, unite: "kg" },
        { id: "jambon", qte: 0.05, unite: "kg" },
        { id: "creme", qte: 0.08, unite: "l" },
        { id: "fromagerape", qte: 0.03, unite: "kg" },
      ],
    },
    {
      id: "poivron_farci", nom: "Poivrons farcis", complexite: 3, creneaux: ["soir"], temps: 55,
      etapes: [
        "Cuire le riz à moitié.",
        "Faire revenir le bœuf haché, mélanger au riz et à la sauce tomate.",
        "Évider les poivrons, les farcir.",
        "Couvrir de fromage, cuire au four à 180°C pendant 35 min.",
      ],
      ingredients: [
        { id: "poivron", qte: 0.2, unite: "kg" },
        { id: "boeufhache", qte: 0.1, unite: "kg" },
        { id: "riz", qte: 0.05, unite: "kg" },
        { id: "saucetomate", qte: 0.08, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },

    /* ---------- Nouvelles recettes (lot 2) ---------- */
    {
      id: "tacos_boeuf", nom: "Tacos de bœuf", complexite: 2, creneaux: ["midi", "soir"], temps: 25,
      etapes: [
        "Faire revenir le bœuf haché avec des épices.",
        "Réchauffer les tortillas.",
        "Garnir de bœuf, maïs, tomate, salade et fromage.",
        "Plier et servir.",
      ],
      ingredients: [
        { id: "tortillas", qte: 2, unite: "piece" },
        { id: "boeufhache", qte: 0.1, unite: "kg" },
        { id: "mais", qte: 0.04, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
        { id: "tomate", qte: 0.05, unite: "kg" },
        { id: "salade", qte: 0.2, unite: "piece" },
      ],
    },
    {
      id: "poulet_basquaise", nom: "Poulet basquaise", complexite: 2, creneaux: ["soir"], temps: 40,
      etapes: [
        "Faire dorer le poulet, réserver.",
        "Faire revenir oignon et poivron, ajouter les tomates.",
        "Remettre le poulet, mijoter 20 min.",
        "Servir avec le riz.",
      ],
      ingredients: [
        { id: "pouletfilet", qte: 0.15, unite: "kg" },
        { id: "poivron", qte: 0.1, unite: "kg" },
        { id: "tomate", qte: 0.1, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "riz", qte: 0.07, unite: "kg" },
      ],
    },
    {
      id: "pates_thon", nom: "Pâtes au thon", complexite: 1, creneaux: ["midi", "soir"], temps: 20,
      etapes: [
        "Cuire les pâtes al dente.",
        "Faire revenir oignon et ail, ajouter la sauce tomate.",
        "Incorporer le thon égoutté, réchauffer.",
        "Mélanger aux pâtes.",
      ],
      ingredients: [
        { id: "pates", qte: 0.1, unite: "kg" },
        { id: "thonboite", qte: 0.06, unite: "kg" },
        { id: "saucetomate", qte: 0.12, unite: "kg" },
        { id: "oignon", qte: 0.04, unite: "kg" },
        { id: "ail", qte: 0.004, unite: "kg" },
      ],
    },
    {
      id: "veloute_brocoli", nom: "Velouté de brocoli", complexite: 1, creneaux: ["soir"], temps: 30,
      etapes: [
        "Faire suer l'oignon.",
        "Ajouter brocoli et pommes de terre en morceaux, couvrir d'eau + bouillon.",
        "Cuire 20 min, mixer avec la crème.",
        "Rectifier l'assaisonnement.",
      ],
      ingredients: [
        { id: "brocoli", qte: 0.15, unite: "kg" },
        { id: "pommesdeterre", qte: 0.1, unite: "kg" },
        { id: "creme", qte: 0.04, unite: "l" },
        { id: "boncube", qte: 1, unite: "piece" },
        { id: "oignon", qte: 0.04, unite: "kg" },
      ],
    },
    {
      id: "frittata", nom: "Frittata pommes de terre", complexite: 2, creneaux: ["midi", "soir"], temps: 30,
      etapes: [
        "Cuire les pommes de terre en dés à la poêle avec l'oignon.",
        "Battre les œufs avec le fromage, saler.",
        "Verser sur les pommes de terre, cuire à couvert à feu doux.",
        "Retourner ou passer sous le gril pour dorer le dessus.",
      ],
      ingredients: [
        { id: "oeufs", qte: 3, unite: "piece" },
        { id: "pommesdeterre", qte: 0.15, unite: "kg" },
        { id: "oignon", qte: 0.04, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "poelee_poulet", nom: "Poêlée poulet-légumes", complexite: 2, creneaux: ["midi", "soir"], temps: 30,
      etapes: [
        "Cuire le riz.",
        "Faire sauter le poulet en lamelles.",
        "Ajouter courgette et poivron, faire sauter à feu vif.",
        "Déglacer à la sauce soja, servir sur le riz.",
      ],
      ingredients: [
        { id: "pouletfilet", qte: 0.13, unite: "kg" },
        { id: "courgette", qte: 0.08, unite: "kg" },
        { id: "poivron", qte: 0.08, unite: "kg" },
        { id: "riz", qte: 0.07, unite: "kg" },
        { id: "saucesoja", qte: 0.02, unite: "l" },
      ],
    },
    {
      id: "soupe_lentilles", nom: "Soupe de lentilles", complexite: 1, creneaux: ["soir"], temps: 35,
      etapes: [
        "Faire revenir oignon et carotte en dés.",
        "Ajouter les lentilles et couvrir d'eau + bouillon.",
        "Cuire 25 min jusqu'à tendreté.",
        "Rectifier l'assaisonnement.",
      ],
      ingredients: [
        { id: "lentilles", qte: 0.08, unite: "kg" },
        { id: "carotte", qte: 0.08, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "boncube", qte: 1, unite: "piece" },
      ],
    },
    {
      id: "ratatouille_riz", nom: "Ratatouille & riz", complexite: 2, creneaux: ["midi", "soir"], temps: 45,
      etapes: [
        "Couper courgette, poivron, tomate et oignon en dés.",
        "Faire revenir l'oignon et l'ail, ajouter les légumes.",
        "Mijoter 30 min à couvert, saler, poivrer, herbes.",
        "Servir avec le riz.",
      ],
      ingredients: [
        { id: "courgette", qte: 0.12, unite: "kg" },
        { id: "poivron", qte: 0.1, unite: "kg" },
        { id: "tomate", qte: 0.12, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "ail", qte: 0.004, unite: "kg" },
        { id: "riz", qte: 0.07, unite: "kg" },
      ],
    },
    {
      id: "omelette_champ", nom: "Omelette aux champignons", complexite: 1, creneaux: ["midi", "soir"], temps: 15,
      etapes: [
        "Faire revenir les champignons et l'oignon.",
        "Battre les œufs, saler, poivrer.",
        "Verser sur les champignons, ajouter le fromage.",
        "Cuire, plier et servir.",
      ],
      ingredients: [
        { id: "oeufs", qte: 3, unite: "piece" },
        { id: "champignon", qte: 0.08, unite: "kg" },
        { id: "oignon", qte: 0.03, unite: "kg" },
        { id: "fromagerape", qte: 0.02, unite: "kg" },
      ],
    },
    {
      id: "curry_poischiches", nom: "Curry de pois chiches", complexite: 2, creneaux: ["midi", "soir"], temps: 30,
      etapes: [
        "Faire revenir l'oignon avec le curry.",
        "Ajouter pois chiches et lait de coco, mijoter 15 min.",
        "Incorporer les épinards en fin de cuisson.",
        "Servir avec le riz.",
      ],
      ingredients: [
        { id: "poischiches", qte: 0.09, unite: "kg" },
        { id: "laitcoco", qte: 0.1, unite: "l" },
        { id: "curry", qte: 0.005, unite: "kg" },
        { id: "oignon", qte: 0.05, unite: "kg" },
        { id: "epinard", qte: 0.05, unite: "kg" },
        { id: "riz", qte: 0.06, unite: "kg" },
      ],
    },
    {
      id: "saumon_pates_citron", nom: "Pâtes saumon-citron", complexite: 2, creneaux: ["soir"], temps: 25,
      etapes: [
        "Cuire les pâtes al dente.",
        "Faire revenir le saumon en morceaux.",
        "Ajouter crème, jus de citron et épinards, mijoter 5 min.",
        "Mélanger aux pâtes.",
      ],
      ingredients: [
        { id: "saumon", qte: 0.1, unite: "kg" },
        { id: "pates", qte: 0.1, unite: "kg" },
        { id: "creme", qte: 0.06, unite: "l" },
        { id: "citron", qte: 0.3, unite: "piece" },
        { id: "epinard", qte: 0.04, unite: "kg" },
      ],
    },
    {
      id: "wrap_vege", nom: "Wrap végétarien", complexite: 1, creneaux: ["midi"], temps: 15,
      etapes: [
        "Écraser grossièrement les pois chiches avec l'avocat.",
        "Réchauffer les tortillas.",
        "Garnir de la préparation, salade et tomate.",
        "Rouler et couper en deux.",
      ],
      ingredients: [
        { id: "tortillas", qte: 2, unite: "piece" },
        { id: "poischiches", qte: 0.06, unite: "kg" },
        { id: "avocat", qte: 0.5, unite: "piece" },
        { id: "salade", qte: 0.2, unite: "piece" },
        { id: "tomate", qte: 0.05, unite: "kg" },
      ],
    },

    /* ---------- Lot 3 (64 recettes) ---------- */
  // ======= Complexité 1 (facile) — ~26 =======
  {
    id: "spaetzli_beurre",
    nom: "Spätzli au beurre et fromage",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 20,
    etapes: [
      "Cuire les spätzli à l'eau bouillante salée jusqu'à ce qu'ils remontent.",
      "Égoutter et faire revenir dans le beurre chaud.",
      "Ajouter le fromage râpé et remuer jusqu'à ce qu'il fonde.",
      "Poivrer et servir aussitôt."
    ],
    ingredients: [
      { id: "spaetzli", qte: 0.18, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "raclette_pommes",
    nom: "Raclette aux pommes de terre",
    complexite: 1,
    creneaux: ["soir"],
    temps: 30,
    etapes: [
      "Cuire les pommes de terre en robe des champs à l'eau salée.",
      "Faire fondre le fromage à raclette au four ou à l'appareil.",
      "Napper les pommes de terre de fromage fondu.",
      "Accompagner de cornichons et servir bien chaud."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.30, unite: "kg" },
      { id: "raclette", qte: 0.20, unite: "kg" }
    ]
  },
  {
    id: "gnocchi_creme_parmesan",
    nom: "Gnocchi à la crème et parmesan",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 20,
    etapes: [
      "Cuire les gnocchi à l'eau bouillante salée jusqu'à ce qu'ils remontent.",
      "Chauffer la crème dans une poêle avec un peu d'ail.",
      "Ajouter les gnocchi égouttés et le parmesan.",
      "Mélanger, poivrer et servir."
    ],
    ingredients: [
      { id: "gnocchi", qte: 0.20, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "parmesan", qte: 0.03, unite: "kg" }
    ]
  },
  {
    id: "gnocchi_tomate",
    nom: "Gnocchi à la tomate et mozzarella",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 25,
    etapes: [
      "Cuire les gnocchi et les égoutter.",
      "Chauffer la sauce tomate avec un peu de basilic.",
      "Mélanger les gnocchi à la sauce dans un plat.",
      "Ajouter la mozzarella et gratiner 10 min au four."
    ],
    ingredients: [
      { id: "gnocchi", qte: 0.20, unite: "kg" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "mozzarella", qte: 0.06, unite: "kg" },
      { id: "basilic", qte: 0.2, unite: "piece" }
    ]
  },
  {
    id: "pates_arrabiata",
    nom: "Pâtes all'arrabbiata",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 20,
    etapes: [
      "Faire revenir l'ail dans l'huile avec une pointe de paprika piquant.",
      "Ajouter la sauce tomate et laisser réduire.",
      "Cuire les pâtes al dente.",
      "Mélanger les pâtes à la sauce et servir avec du parmesan."
    ],
    ingredients: [
      { id: "pates", qte: 0.10, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" }
    ]
  },
  {
    id: "bruschetta_repas",
    nom: "Bruschetta tomate-mozzarella",
    complexite: 1,
    creneaux: ["midi"],
    temps: 15,
    etapes: [
      "Griller les tranches de pain au four.",
      "Frotter d'ail et arroser d'un filet d'huile.",
      "Garnir de dés de tomate, de mozzarella et de basilic.",
      "Assaisonner et servir aussitôt."
    ],
    ingredients: [
      { id: "pain", qte: 0.12, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "mozzarella", qte: 0.06, unite: "kg" },
      { id: "basilic", qte: 0.3, unite: "piece" }
    ]
  },
  {
    id: "riz_saute_tofu",
    nom: "Riz sauté au tofu",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 25,
    etapes: [
      "Faire dorer le tofu en dés dans l'huile.",
      "Ajouter carottes, petits pois et ail.",
      "Incorporer le riz cuit et la sauce soja.",
      "Faire sauter à feu vif et servir."
    ],
    ingredients: [
      { id: "riz", qte: 0.09, unite: "kg" },
      { id: "tofu", qte: 0.12, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "petitspois", qte: 0.06, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" }
    ]
  },
  {
    id: "riz_sauce_soja_oeuf",
    nom: "Riz sauté à l'œuf et sauce soja",
    complexite: 1,
    creneaux: ["midi"],
    temps: 20,
    etapes: [
      "Faire cuire le riz et le laisser refroidir.",
      "Brouiller les œufs dans l'huile chaude.",
      "Ajouter le riz, les petits pois et la sauce soja.",
      "Faire sauter à feu vif et servir."
    ],
    ingredients: [
      { id: "riz", qte: 0.10, unite: "kg" },
      { id: "oeufs", qte: 2, unite: "piece" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "petitspois", qte: 0.06, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" }
    ]
  },
  {
    id: "quesadillas_fromage",
    nom: "Quesadillas au fromage et poivron",
    complexite: 1,
    creneaux: ["midi"],
    temps: 20,
    etapes: [
      "Faire revenir les poivrons émincés à la poêle.",
      "Garnir une tortilla de fromage râpé et de poivrons.",
      "Couvrir d'une seconde tortilla et dorer chaque face.",
      "Couper en parts et servir."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "poivron", qte: 0.10, unite: "kg" },
      { id: "fromagerape", qte: 0.06, unite: "kg" }
    ]
  },
  {
    id: "bowl_mexicain",
    nom: "Bowl mexicain au riz et haricots",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 25,
    etapes: [
      "Cuire le riz nature.",
      "Réchauffer les haricots rouges et le maïs avec cumin et paprika.",
      "Dresser le riz, les haricots, le maïs et l'avocat en tranches.",
      "Arroser d'un filet de citron et servir."
    ],
    ingredients: [
      { id: "riz", qte: 0.09, unite: "kg" },
      { id: "haricotrouge", qte: 0.10, unite: "kg" },
      { id: "mais", qte: 0.06, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "citron", qte: 0.3, unite: "piece" }
    ]
  },
  {
    id: "salade_quinoa_feta",
    nom: "Salade de quinoa à la feta",
    complexite: 1,
    creneaux: ["midi"],
    temps: 25,
    etapes: [
      "Cuire le quinoa et le laisser refroidir.",
      "Couper concombre, tomate et poivron en dés.",
      "Mélanger avec la feta émiettée et les olives.",
      "Assaisonner d'huile, citron et servir frais."
    ],
    ingredients: [
      { id: "quinoa", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.4, unite: "piece" },
      { id: "tomate", qte: 0.10, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "feta", qte: 0.06, unite: "kg" },
      { id: "olives", qte: 0.03, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "citron", qte: 0.3, unite: "piece" }
    ]
  },
  {
    id: "salade_grecque",
    nom: "Salade grecque",
    complexite: 1,
    creneaux: ["midi"],
    temps: 15,
    etapes: [
      "Couper tomates, concombre et poivron en morceaux.",
      "Émincer l'oignon finement.",
      "Ajouter feta en dés et olives.",
      "Assaisonner d'huile, vinaigre et servir."
    ],
    ingredients: [
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "concombre", qte: 0.5, unite: "piece" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "feta", qte: 0.06, unite: "kg" },
      { id: "olives", qte: 0.03, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinaigre", qte: 0.005, unite: "l" }
    ]
  },
  {
    id: "omelette_epinards_feta",
    nom: "Omelette aux épinards et feta",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 15,
    etapes: [
      "Faire tomber les épinards dans le beurre.",
      "Battre les œufs et les verser sur les épinards.",
      "Émietter la feta par-dessus.",
      "Plier l'omelette et servir."
    ],
    ingredients: [
      { id: "oeufs", qte: 3, unite: "piece" },
      { id: "epinard", qte: 0.08, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "feta", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "salade_poulet_avocat",
    nom: "Salade de poulet et avocat",
    complexite: 1,
    creneaux: ["midi"],
    temps: 25,
    etapes: [
      "Faire cuire le poulet émincé à la poêle.",
      "Disposer la salade avec tomates et avocat en tranches.",
      "Ajouter le poulet tiède.",
      "Assaisonner d'huile, citron et moutarde."
    ],
    ingredients: [
      { id: "salade", qte: 0.5, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "tomate", qte: 0.10, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "citron", qte: 0.3, unite: "piece" },
      { id: "moutarde", qte: 0.005, unite: "kg" }
    ]
  },
  {
    id: "salade_pates_pesto",
    nom: "Salade de pâtes au pesto",
    complexite: 1,
    creneaux: ["midi"],
    temps: 25,
    etapes: [
      "Cuire les pâtes et les rafraîchir à l'eau froide.",
      "Couper tomates et mozzarella en dés.",
      "Mélanger avec le pesto.",
      "Ajouter olives et basilic, servir frais."
    ],
    ingredients: [
      { id: "pates", qte: 0.10, unite: "kg" },
      { id: "tomate", qte: 0.10, unite: "kg" },
      { id: "mozzarella", qte: 0.06, unite: "kg" },
      { id: "pesto", qte: 0.03, unite: "kg" },
      { id: "olives", qte: 0.03, unite: "kg" },
      { id: "basilic", qte: 0.2, unite: "piece" }
    ]
  },
  {
    id: "salade_boulgour_menthe",
    nom: "Taboulé de boulgour",
    complexite: 1,
    creneaux: ["midi"],
    temps: 25,
    etapes: [
      "Cuire le boulgour et le laisser refroidir.",
      "Couper tomate et concombre en petits dés.",
      "Mélanger avec oignon émincé.",
      "Assaisonner d'huile, citron et servir frais."
    ],
    ingredients: [
      { id: "boulgour", qte: 0.08, unite: "kg" },
      { id: "tomate", qte: 0.12, unite: "kg" },
      { id: "concombre", qte: 0.4, unite: "piece" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "citron", qte: 0.5, unite: "piece" }
    ]
  },
  {
    id: "poelee_chorizo_pdt",
    nom: "Poêlée de pommes de terre au chorizo",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Couper les pommes de terre en dés et les précuire.",
      "Faire dorer le chorizo en rondelles.",
      "Ajouter les pommes de terre et l'oignon, faire sauter.",
      "Parsemer de paprika et servir."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.25, unite: "kg" },
      { id: "chorizo", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" }
    ]
  },
  {
    id: "croque_monsieur",
    nom: "Croque-monsieur",
    complexite: 1,
    creneaux: ["midi"],
    temps: 20,
    etapes: [
      "Beurrer les tranches de pain.",
      "Garnir de jambon et de fromage râpé.",
      "Assembler et dorer à la poêle ou au four.",
      "Servir chaud avec une salade."
    ],
    ingredients: [
      { id: "pain", qte: 0.12, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "fromagerape", qte: 0.05, unite: "kg" },
      { id: "salade", qte: 0.25, unite: "piece" }
    ]
  },
  {
    id: "oeufs_cocotte",
    nom: "Œufs cocotte à la crème",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 20,
    etapes: [
      "Beurrer des ramequins et y déposer un peu d'épinards.",
      "Casser les œufs par-dessus.",
      "Napper de crème et de fromage râpé.",
      "Cuire 12 min au four à 180°C, servir avec du pain."
    ],
    ingredients: [
      { id: "oeufs", qte: 2, unite: "piece" },
      { id: "epinard", qte: 0.06, unite: "kg" },
      { id: "beurre", qte: 0.01, unite: "kg" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "fromagerape", qte: 0.03, unite: "kg" },
      { id: "pain", qte: 0.06, unite: "kg" }
    ]
  },
  {
    id: "wrap_poulet_avocat",
    nom: "Wrap poulet-avocat",
    complexite: 1,
    creneaux: ["midi"],
    temps: 20,
    etapes: [
      "Faire cuire le poulet émincé à la poêle.",
      "Écraser l'avocat avec un peu de citron.",
      "Garnir les tortillas de poulet, avocat et salade.",
      "Rouler et servir."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "citron", qte: 0.3, unite: "piece" },
      { id: "salade", qte: 0.25, unite: "piece" }
    ]
  },
  {
    id: "soupe_poireaux_pdt",
    nom: "Soupe poireaux-pommes de terre",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Émincer les poireaux et couper les pommes de terre en dés.",
      "Faire suer les poireaux dans le beurre.",
      "Ajouter les pommes de terre et le bouillon, cuire 20 min.",
      "Mixer et ajouter un peu de crème."
    ],
    ingredients: [
      { id: "poireau", qte: 0.15, unite: "kg" },
      { id: "pommesdeterre", qte: 0.15, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.03, unite: "l" }
    ]
  },
  {
    id: "soupe_tomate",
    nom: "Soupe de tomate au basilic",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 25,
    etapes: [
      "Faire revenir oignon et ail dans l'huile.",
      "Ajouter les tomates concassées et le bouillon.",
      "Cuire 15 min puis mixer.",
      "Ajouter le basilic ciselé et un trait de crème."
    ],
    ingredients: [
      { id: "tomate", qte: 0.25, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "basilic", qte: 0.2, unite: "piece" },
      { id: "creme", qte: 0.03, unite: "l" }
    ]
  },
  {
    id: "soupe_courgette_curry",
    nom: "Velouté de courgette au curry",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 25,
    etapes: [
      "Faire revenir l'oignon dans le beurre.",
      "Ajouter les courgettes en dés et le curry.",
      "Couvrir de bouillon et cuire 15 min.",
      "Mixer avec un peu de crème et servir."
    ],
    ingredients: [
      { id: "courgette", qte: 0.25, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "curry", qte: 0.004, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.03, unite: "l" }
    ]
  },
  {
    id: "soupe_potiron",
    nom: "Velouté de patate douce",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Faire revenir l'oignon dans le beurre.",
      "Ajouter la patate douce et la carotte en dés, couvrir de bouillon.",
      "Cuire 20 min puis mixer finement.",
      "Ajouter une touche de crème et servir."
    ],
    ingredients: [
      { id: "patatedouce", qte: 0.20, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.03, unite: "l" }
    ]
  },
  {
    id: "salade_mozza_tomate",
    nom: "Salade caprese enrichie",
    complexite: 1,
    creneaux: ["midi"],
    temps: 15,
    etapes: [
      "Trancher tomates et mozzarella.",
      "Alterner sur une assiette avec du basilic.",
      "Ajouter quelques olives.",
      "Arroser d'huile et de vinaigre balsamique, servir avec du pain."
    ],
    ingredients: [
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "mozzarella", qte: 0.10, unite: "kg" },
      { id: "basilic", qte: 0.3, unite: "piece" },
      { id: "olives", qte: 0.03, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "vinbalsamique", qte: 0.005, unite: "l" },
      { id: "pain", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "pates_ricotta_epinards",
    nom: "Pâtes à la ricotta et épinards",
    complexite: 1,
    creneaux: ["midi", "soir"],
    temps: 20,
    etapes: [
      "Cuire les pâtes al dente.",
      "Faire fondre les épinards à la poêle avec de l'ail.",
      "Ajouter la ricotta et un peu d'eau de cuisson.",
      "Mélanger aux pâtes, parsemer de parmesan et servir."
    ],
    ingredients: [
      { id: "pates", qte: 0.10, unite: "kg" },
      { id: "ricotta", qte: 0.08, unite: "kg" },
      { id: "epinard", qte: 0.08, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" }
    ]
  },

  // ======= Complexité 2 (moyen) — ~25 =======
  {
    id: "roesti_oeuf",
    nom: "Rösti au fromage et œuf",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Râper les pommes de terre et les presser pour ôter l'eau.",
      "Faire dorer le rösti dans le beurre à la poêle, 10 min de chaque côté.",
      "Parsemer de fromage râpé et laisser fondre.",
      "Servir avec un œuf au plat par personne."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.25, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.05, unite: "kg" },
      { id: "oeufs", qte: 2, unite: "piece" }
    ]
  },
  {
    id: "aelplermagronen",
    nom: "Älplermagronen",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 40,
    etapes: [
      "Cuire les pâtes et les pommes de terre en dés ensemble à l'eau salée.",
      "Faire revenir les oignons émincés dans le beurre jusqu'à coloration.",
      "Égoutter, mélanger avec la crème et le fromage râpé.",
      "Napper de crème, garnir des oignons et servir avec compote."
    ],
    ingredients: [
      { id: "pates", qte: 0.08, unite: "kg" },
      { id: "pommesdeterre", qte: 0.10, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.06, unite: "kg" }
    ]
  },
  {
    id: "papet_vaudois",
    nom: "Papet vaudois aux poireaux",
    complexite: 2,
    creneaux: ["soir"],
    temps: 50,
    etapes: [
      "Émincer les poireaux et couper les pommes de terre en morceaux.",
      "Faire fondre les poireaux dans le beurre, ajouter les pommes de terre.",
      "Mouiller avec le bouillon et la crème, laisser mijoter 30 min.",
      "Pocher la saucisse dans le mélange les 20 dernières minutes.",
      "Servir la saucisse tranchée sur le papet."
    ],
    ingredients: [
      { id: "poireau", qte: 0.20, unite: "kg" },
      { id: "pommesdeterre", qte: 0.20, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "boncube", qte: 0.5, unite: "piece" },
      { id: "saucisse", qte: 0.15, unite: "kg" }
    ]
  },
  {
    id: "roeschti_lardons",
    nom: "Rösti aux lardons et oignons",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Râper et presser les pommes de terre.",
      "Faire revenir lardons et oignons émincés dans la poêle.",
      "Mélanger aux pommes de terre râpées, former une galette.",
      "Dorer 10 min de chaque côté dans le beurre et servir."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.25, unite: "kg" },
      { id: "lardons", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" }
    ]
  },
  {
    id: "pates_aubergine",
    nom: "Pâtes à l'aubergine (alla norma)",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Couper l'aubergine en dés et la faire dorer dans l'huile.",
      "Ajouter la sauce tomate et l'ail, laisser mijoter.",
      "Cuire les pâtes al dente.",
      "Mélanger, parsemer de basilic et de parmesan."
    ],
    ingredients: [
      { id: "pates", qte: 0.10, unite: "kg" },
      { id: "aubergine", qte: 0.15, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "basilic", qte: 0.2, unite: "piece" },
      { id: "parmesan", qte: 0.02, unite: "kg" }
    ]
  },
  {
    id: "risotto_courgette",
    nom: "Risotto aux courgettes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Faire revenir l'oignon dans le beurre, ajouter le riz et nacrer.",
      "Ajouter le bouillon louche par louche en remuant.",
      "Incorporer les courgettes en dés à mi-cuisson.",
      "Terminer avec le parmesan et une noix de beurre."
    ],
    ingredients: [
      { id: "riz", qte: 0.09, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "courgette", qte: 0.12, unite: "kg" },
      { id: "parmesan", qte: 0.03, unite: "kg" }
    ]
  },
  {
    id: "pates_crevettes",
    nom: "Pâtes aux crevettes et ail",
    complexite: 2,
    creneaux: ["soir"],
    temps: 25,
    etapes: [
      "Faire revenir l'ail dans l'huile.",
      "Ajouter les crevettes et les saisir 3 min.",
      "Déglacer avec un peu de crème et de citron.",
      "Mélanger aux pâtes cuites al dente et servir."
    ],
    ingredients: [
      { id: "pates", qte: 0.10, unite: "kg" },
      { id: "crevettes", qte: 0.10, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "citron", qte: 0.3, unite: "piece" }
    ]
  },
  {
    id: "nouilles_sautees_poulet",
    nom: "Nouilles sautées au poulet",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Cuire les nouilles chinoises et les égoutter.",
      "Saisir le poulet émincé au wok avec gingembre et ail.",
      "Ajouter carottes et poivrons en lamelles, faire sauter.",
      "Incorporer les nouilles et la sauce soja, mélanger vivement."
    ],
    ingredients: [
      { id: "nouilleschin", qte: 0.10, unite: "kg" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "poivron", qte: 0.08, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" }
    ]
  },
  {
    id: "curry_boeuf_coco",
    nom: "Curry de bœuf au lait de coco",
    complexite: 2,
    creneaux: ["soir"],
    temps: 35,
    etapes: [
      "Saisir le bœuf haché avec oignon, ail et gingembre.",
      "Ajouter le curry et le paprika, faire revenir.",
      "Verser le lait de coco et laisser mijoter 20 min.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "curry", qte: 0.005, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "laitcoco", qte: 0.12, unite: "l" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "curry_poulet_coco",
    nom: "Curry de poulet au lait de coco",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Saisir le poulet émincé avec oignon et ail.",
      "Ajouter le curry et le gingembre, faire revenir.",
      "Verser le lait de coco et mijoter 20 min.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "curry", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "laitcoco", qte: 0.12, unite: "l" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "burritos_poulet",
    nom: "Burritos au poulet",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Saisir le poulet émincé avec cumin et paprika.",
      "Réchauffer le riz et mélanger avec les haricots rouges.",
      "Garnir les tortillas de poulet, riz, haricots et fromage.",
      "Rouler serré et servir."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "riz", qte: 0.05, unite: "kg" },
      { id: "haricotrouge", qte: 0.08, unite: "kg" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
  {
    id: "fajitas_poulet",
    nom: "Fajitas de poulet aux poivrons",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Émincer le poulet et le faire saisir avec cumin et paprika.",
      "Ajouter oignons et poivrons en lamelles.",
      "Faire sauter jusqu'à tendreté.",
      "Servir dans des tortillas chaudes."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "poivron", qte: 0.12, unite: "kg" },
      { id: "tortillas", qte: 2, unite: "piece" }
    ]
  },
  {
    id: "chili_vege",
    nom: "Chili végétarien",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Faire revenir oignon, ail et poivron.",
      "Ajouter haricots rouges, maïs et sauce tomate.",
      "Assaisonner de cumin et paprika, mijoter 20 min.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "poivron", qte: 0.10, unite: "kg" },
      { id: "haricotrouge", qte: 0.12, unite: "kg" },
      { id: "mais", qte: 0.06, unite: "kg" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "curry_legumes_coco",
    nom: "Curry de légumes au lait de coco",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Faire revenir oignon, ail et gingembre.",
      "Ajouter chou-fleur, carottes et patate douce en dés.",
      "Verser le lait de coco et le curry, mijoter 25 min.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "choufleur", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "patatedouce", qte: 0.10, unite: "kg" },
      { id: "laitcoco", qte: 0.12, unite: "l" },
      { id: "curry", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "couscous_legumes",
    nom: "Couscous aux légumes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Faire mijoter carottes, courgettes, poivron et pois chiches dans un bouillon épicé.",
      "Préparer la semoule et l'arroser d'eau bouillante.",
      "Égrainer la semoule à la fourchette avec un peu d'huile.",
      "Servir les légumes sur la semoule."
    ],
    ingredients: [
      { id: "couscous", qte: 0.08, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "courgette", qte: 0.08, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "poischiches", qte: 0.08, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" }
    ]
  },
  {
    id: "tofu_saute_legumes",
    nom: "Tofu sauté aux légumes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Faire dorer le tofu en dés dans l'huile.",
      "Ajouter brocoli, carottes et poivrons.",
      "Assaisonner de sauce soja, ail et gingembre.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "tofu", qte: 0.13, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "brocoli", qte: 0.10, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "gratin_choufleur",
    nom: "Gratin de chou-fleur",
    complexite: 2,
    creneaux: ["soir"],
    temps: 45,
    etapes: [
      "Cuire les bouquets de chou-fleur à l'eau salée.",
      "Préparer une béchamel avec beurre, farine et lait.",
      "Disposer le chou-fleur dans un plat et napper de béchamel.",
      "Couvrir de fromage râpé et gratiner 25 min à 190°C."
    ],
    ingredients: [
      { id: "choufleur", qte: 0.25, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "lait", qte: 0.15, unite: "l" },
      { id: "fromagerape", qte: 0.06, unite: "kg" }
    ]
  },
  {
    id: "gratin_courgettes",
    nom: "Gratin de courgettes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 45,
    etapes: [
      "Émincer les courgettes et les faire suer à la poêle.",
      "Disposer dans un plat avec crème et œufs battus.",
      "Couvrir de fromage râpé.",
      "Cuire 30 min au four à 190°C."
    ],
    ingredients: [
      { id: "courgette", qte: 0.25, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "gratin_poireaux_jambon",
    nom: "Gratin de poireaux au jambon",
    complexite: 2,
    creneaux: ["soir"],
    temps: 45,
    etapes: [
      "Cuire les poireaux à la vapeur.",
      "Les enrouler dans les tranches de jambon.",
      "Préparer une béchamel et napper les poireaux.",
      "Couvrir de fromage râpé et gratiner 25 min à 190°C."
    ],
    ingredients: [
      { id: "poireau", qte: 0.25, unite: "kg" },
      { id: "jambon", qte: 0.08, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "lait", qte: 0.15, unite: "l" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "poelee_poulet_champignons",
    nom: "Poêlée de poulet aux champignons",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Saisir le poulet émincé à la poêle.",
      "Ajouter les champignons et l'oignon.",
      "Déglacer à la crème et laisser réduire.",
      "Servir avec du riz ou des pâtes."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "champignon", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "cabillaud_curry_coco",
    nom: "Cabillaud au curry et lait de coco",
    complexite: 2,
    creneaux: ["soir"],
    temps: 30,
    etapes: [
      "Faire revenir oignon, ail et gingembre.",
      "Ajouter le curry puis le lait de coco.",
      "Pocher les morceaux de cabillaud 10 min dans la sauce.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "cabillaud", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "curry", qte: 0.005, unite: "kg" },
      { id: "laitcoco", qte: 0.12, unite: "l" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "wok_poulet_brocoli",
    nom: "Wok de poulet au brocoli",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Saisir le poulet émincé au wok.",
      "Ajouter brocoli, carottes, ail et gingembre.",
      "Assaisonner de sauce soja et de miel.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "brocoli", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.01, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "miel", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "shakshuka",
    nom: "Shakshuka (œufs à la tomate)",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 30,
    etapes: [
      "Faire revenir oignon, ail et poivron.",
      "Ajouter la sauce tomate, le cumin et le paprika.",
      "Creuser des puits et y casser les œufs.",
      "Couvrir et cuire jusqu'à ce que les blancs prennent, servir avec du pain."
    ],
    ingredients: [
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "poivron", qte: 0.10, unite: "kg" },
      { id: "saucetomate", qte: 0.15, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "oeufs", qte: 2, unite: "piece" },
      { id: "pain", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "tortilla_espagnole",
    nom: "Tortilla espagnole (omelette pommes de terre)",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 35,
    etapes: [
      "Couper les pommes de terre en fines tranches et les cuire doucement dans l'huile.",
      "Ajouter l'oignon émincé.",
      "Battre les œufs et les verser sur les pommes de terre.",
      "Cuire à couvert, retourner et dorer l'autre face."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.20, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "huile", qte: 0.02, unite: "l" },
      { id: "oeufs", qte: 3, unite: "piece" }
    ]
  },
  {
    id: "couscous_poulet",
    nom: "Couscous au poulet",
    complexite: 2,
    creneaux: ["midi", "soir"],
    temps: 40,
    etapes: [
      "Saisir le poulet avec oignon, ail et cumin.",
      "Ajouter carottes, courgettes, pois chiches et bouillon.",
      "Mijoter 25 min.",
      "Servir les légumes et le poulet sur la semoule."
    ],
    ingredients: [
      { id: "couscous", qte: 0.08, unite: "kg" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "courgette", qte: 0.08, unite: "kg" },
      { id: "poischiches", qte: 0.06, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },

  // ======= Complexité 3 (élaboré) — ~13 =======
  {
    id: "lasagnes_boeuf",
    nom: "Lasagnes à la bolognaise",
    complexite: 3,
    creneaux: ["soir"],
    temps: 60,
    etapes: [
      "Faire revenir le bœuf haché avec oignon et ail, ajouter la sauce tomate.",
      "Préparer une béchamel avec beurre, farine et lait.",
      "Alterner couches de pâtes, sauce bolognaise et béchamel dans un plat.",
      "Couvrir de fromage râpé.",
      "Cuire 35 min au four à 190°C."
    ],
    ingredients: [
      { id: "pates", qte: 0.09, unite: "kg" },
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "lait", qte: 0.12, unite: "l" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "cannelloni_ricotta",
    nom: "Gratin de pâtes ricotta-épinards",
    complexite: 3,
    creneaux: ["soir"],
    temps: 50,
    etapes: [
      "Mélanger la ricotta avec les épinards cuits et hachés.",
      "Cuire les pâtes al dente et les disposer dans un plat.",
      "Ajouter le mélange ricotta et napper de sauce tomate.",
      "Couvrir de parmesan.",
      "Gratiner 25 min à 190°C."
    ],
    ingredients: [
      { id: "pates", qte: 0.09, unite: "kg" },
      { id: "ricotta", qte: 0.10, unite: "kg" },
      { id: "epinard", qte: 0.10, unite: "kg" },
      { id: "saucetomate", qte: 0.10, unite: "kg" },
      { id: "parmesan", qte: 0.03, unite: "kg" }
    ]
  },
  {
    id: "enchiladas_boeuf",
    nom: "Enchiladas au bœuf",
    complexite: 3,
    creneaux: ["soir"],
    temps: 45,
    etapes: [
      "Faire revenir le bœuf haché avec oignon, cumin et paprika.",
      "Garnir les tortillas de viande et de haricots, les rouler.",
      "Disposer dans un plat et napper de sauce tomate.",
      "Couvrir de fromage râpé.",
      "Gratiner 25 min à 190°C."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "haricotrouge", qte: 0.06, unite: "kg" },
      { id: "saucetomate", qte: 0.10, unite: "kg" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "aubergines_parmesan",
    nom: "Aubergines au parmesan",
    complexite: 3,
    creneaux: ["soir"],
    temps: 55,
    etapes: [
      "Trancher les aubergines et les faire dorer à la poêle.",
      "Disposer en couches avec sauce tomate et mozzarella.",
      "Répéter les couches et terminer par le parmesan.",
      "Gratiner 30 min au four à 190°C.",
      "Parsemer de basilic avant de servir."
    ],
    ingredients: [
      { id: "aubergine", qte: 0.25, unite: "kg" },
      { id: "huile", qte: 0.02, unite: "l" },
      { id: "saucetomate", qte: 0.12, unite: "kg" },
      { id: "mozzarella", qte: 0.06, unite: "kg" },
      { id: "parmesan", qte: 0.03, unite: "kg" },
      { id: "basilic", qte: 0.2, unite: "piece" }
    ]
  },
  {
    id: "gratin_patatedouce",
    nom: "Gratin de patate douce",
    complexite: 3,
    creneaux: ["soir"],
    temps: 55,
    etapes: [
      "Éplucher et trancher finement les patates douces.",
      "Disposer en couches dans un plat avec ail.",
      "Napper de crème et de lait, saler.",
      "Couvrir de gruyère.",
      "Cuire 40 min à 190°C."
    ],
    ingredients: [
      { id: "patatedouce", qte: 0.30, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "creme", qte: 0.08, unite: "l" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "gruyere", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "gratin_pommesdeterre_saumon",
    nom: "Gratin de pommes de terre au saumon",
    complexite: 3,
    creneaux: ["soir"],
    temps: 55,
    etapes: [
      "Trancher finement les pommes de terre et précuire à l'eau.",
      "Disposer en couches avec des morceaux de saumon.",
      "Napper de crème et d'un filet de citron.",
      "Couvrir de fromage râpé.",
      "Cuire 35 min au four à 190°C."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.25, unite: "kg" },
      { id: "saumon", qte: 0.12, unite: "kg" },
      { id: "creme", qte: 0.08, unite: "l" },
      { id: "citron", qte: 0.3, unite: "piece" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "tarte_oignon",
    nom: "Tarte à l'oignon",
    complexite: 3,
    creneaux: ["midi", "soir"],
    temps: 55,
    etapes: [
      "Faire fondre lentement les oignons émincés dans le beurre.",
      "Étaler la pâte feuilletée dans un moule.",
      "Répartir les oignons et les lardons.",
      "Battre œufs et crème, verser sur le tout.",
      "Cuire 30 min à 190°C."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 0.25, unite: "piece" },
      { id: "oignon", qte: 0.15, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "lardons", qte: 0.05, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.05, unite: "l" }
    ]
  },
  {
    id: "quiche_poireaux",
    nom: "Quiche aux poireaux",
    complexite: 3,
    creneaux: ["midi", "soir"],
    temps: 55,
    etapes: [
      "Faire fondre les poireaux émincés dans le beurre.",
      "Étaler la pâte feuilletée dans un moule.",
      "Répartir les poireaux et les lardons.",
      "Verser un appareil œufs-crème.",
      "Cuire 30 min à 190°C."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 0.25, unite: "piece" },
      { id: "poireau", qte: 0.15, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "lardons", qte: 0.05, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.06, unite: "l" }
    ]
  },
  {
    id: "poulet_citron_olives",
    nom: "Poulet aux citrons et olives",
    complexite: 3,
    creneaux: ["soir"],
    temps: 50,
    etapes: [
      "Saisir les filets de poulet avec oignon et ail.",
      "Ajouter cumin, citron et olives.",
      "Mouiller au bouillon et mijoter 25 min.",
      "Préparer la semoule à part.",
      "Servir le poulet et sa sauce sur la semoule."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.14, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "olives", qte: 0.03, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" },
      { id: "couscous", qte: 0.08, unite: "kg" }
    ]
  },
  {
    id: "boeuf_mijote_carottes",
    nom: "Bœuf mijoté aux carottes",
    complexite: 3,
    creneaux: ["soir"],
    temps: 60,
    etapes: [
      "Saisir le bœuf haché en boulettes avec oignon et ail.",
      "Ajouter carottes et champignons.",
      "Mouiller au bouillon et à la sauce tomate, mijoter 40 min.",
      "Cuire les pommes de terre vapeur à part.",
      "Servir le bœuf avec les pommes de terre."
    ],
    ingredients: [
      { id: "boeufhache", qte: 0.13, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "carotte", qte: 0.12, unite: "kg" },
      { id: "champignon", qte: 0.08, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "saucetomate", qte: 0.08, unite: "kg" },
      { id: "pommesdeterre", qte: 0.20, unite: "kg" }
    ]
  },
  {
    id: "poivrons_farcis_riz",
    nom: "Poivrons farcis au riz et feta",
    complexite: 3,
    creneaux: ["soir"],
    temps: 50,
    etapes: [
      "Couper les poivrons en deux et les évider.",
      "Mélanger riz cuit, tomate, oignon et feta.",
      "Farcir les poivrons du mélange.",
      "Arroser d'un filet d'huile.",
      "Cuire 30 min au four à 190°C."
    ],
    ingredients: [
      { id: "poivron", qte: 0.20, unite: "kg" },
      { id: "riz", qte: 0.07, unite: "kg" },
      { id: "tomate", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "feta", qte: 0.05, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" }
    ]
  },
  {
    id: "tarte_legumes",
    nom: "Tarte aux légumes",
    complexite: 3,
    creneaux: ["midi", "soir"],
    temps: 50,
    etapes: [
      "Étaler la pâte feuilletée dans un moule.",
      "Répartir courgettes, tomates et oignons émincés.",
      "Battre œufs et crème, verser sur les légumes.",
      "Parsemer de fromage râpé.",
      "Cuire 30 min à 190°C."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 0.25, unite: "piece" },
      { id: "courgette", qte: 0.10, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.05, unite: "kg" }
    ]
  },
  {
    id: "spaetzli_poulet_creme",
    nom: "Spätzli au poulet et champignons",
    complexite: 3,
    creneaux: ["soir"],
    temps: 45,
    etapes: [
      "Cuire les spätzli et les égoutter.",
      "Saisir le poulet avec les champignons et l'oignon.",
      "Déglacer à la crème et laisser réduire.",
      "Mélanger aux spätzli.",
      "Parsemer de fromage râpé et gratiner 10 min."
    ],
    ingredients: [
      { id: "spaetzli", qte: 0.16, unite: "kg" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "champignon", qte: 0.10, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  }
  ];

  window.BATHCOOKING_DATA = {
    ENSEIGNES,
    RAYONS,
    CATALOGUE,
    RECETTES,
    prixMaj: "Prix réels Migros + Coop — relevés le 03.07.2026",
  };
})();
