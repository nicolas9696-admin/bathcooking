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

    /* --- Ingredients lots A+B (auto) --- */
    menthe: { nom: "Menthe fraîche",          unite: "piece", rayon: "legumes",   prix: { migros: 2.21, coop: 2.4 } },
    coriandre: { nom: "Coriandre fraîche",       unite: "piece", rayon: "legumes",   prix: { migros: 2.21, coop: 2.4 } },
    persil: { nom: "Persil plat",             unite: "piece", rayon: "legumes",   prix: { migros: 1.25, coop: 0.42 } },
    radis: { nom: "Radis",                   unite: "kg",    rayon: "legumes",   prix: { migros: 4.2, coop: 4.6 } },
    edamame: { nom: "Edamame surgelés",        unite: "kg",    rayon: "surgele",   prix: { migros: 9.2, coop: 9.9 } },
    algues_nori: { nom: "Feuilles de nori",        unite: "piece", rayon: "epicerie",  prix: { migros: 0.6, coop: 0.7 } },
    sesame: { nom: "Graines de sésame",       unite: "kg",    rayon: "epicerie",  prix: { migros: 5.5, coop: 11.8 } },
    saucehuitre: { nom: "Sauce huître",            unite: "l",     rayon: "epicerie",  prix: { migros: 19.14, coop: 20.8 } },
    currypate: { nom: "Pâte de curry rouge",     unite: "kg",    rayon: "epicerie",  prix: { migros: 15.18, coop: 16.5 } },
    citronvert: { nom: "Citron vert (lime)",      unite: "piece", rayon: "legumes",   prix: { migros: 2.1, coop: 1.8 } },
    cacahuete: { nom: "Cacahuètes",              unite: "kg",    rayon: "epicerie",  prix: { migros: 3.6, coop: 3.6 } },
    vermicelle_riz: { nom: "Vermicelles de riz",      unite: "kg",    rayon: "feculents", prix: { migros: 5, coop: 12.4 } },
    galette_riz: { nom: "Galettes de riz (papier)",unite: "piece", rayon: "feculents", prix: { migros: 0.9, coop: 1.0 } },
    boulgour_fin: { nom: "Boulghour fin",           unite: "kg",    rayon: "feculents", prix: { migros: 2.6, coop: 3.7 } },
    harichverts: { nom: "Haricots verts",          unite: "kg",    rayon: "legumes",   prix: { migros: 3.4, coop: 3.4 } },
    betterave: { nom: "Betterave cuite",         unite: "kg",    rayon: "legumes",   prix: { migros: 3, coop: 3.9 } },
    fenouil: { nom: "Fenouil",                 unite: "kg",    rayon: "legumes",   prix: { migros: 3.5, coop: 3.5 } },
    roquette: { nom: "Roquette",                unite: "piece", rayon: "legumes",   prix: { migros: 0.87, coop: 0.95 } },
    pasteque: { nom: "Pastèque",                unite: "kg",    rayon: "legumes",   prix: { migros: 1.6, coop: 1.29 } },
    mangue: { nom: "Mangue",                  unite: "piece", rayon: "legumes",   prix: { migros: 1.5, coop: 1.5 } },
    wasabi: { nom: "Wasabi",                  unite: "kg",    rayon: "epicerie",  prix: { migros: 9, coop: 22.7 } },
    vinaigreriz: { nom: "Vinaigre de riz",         unite: "l",     rayon: "epicerie",  prix: { migros: 9.0, coop: 10.0 } },
    tomatecerise: { nom: "Tomates cerises",         unite: "kg",    rayon: "legumes",   prix: { migros: 9, coop: 6.3 } },
    sardine: { nom: "Sardines à l'huile",      unite: "kg",    rayon: "epicerie",  prix: { migros: 18.3, coop: 19.4 } },
    vinblanc: { nom: "Vin blanc",            unite: "l",     rayon: "boisson",   prix: { migros: 5.5,  coop: 6.0 } },
    vinrouge: { nom: "Vin rouge",            unite: "l",     rayon: "boisson",   prix: { migros: 5.5,  coop: 6.0 } },
    vacherin: { nom: "Vacherin fribourgeois",unite: "kg",    rayon: "frais",     prix: { migros: 21.16, coop: 23 } },
    appenzeller: { nom: "Appenzeller",          unite: "kg",    rayon: "frais",     prix: { migros: 22.7, coop: 14.3 } },
    emmental: { nom: "Emmental",             unite: "kg",    rayon: "frais",     prix: { migros: 16.47, coop: 17.9 } },
    choucroute: { nom: "Choucroute crue",      unite: "kg",    rayon: "legumes",   prix: { migros: 4.6,  coop: 4.9 } },
    chourouge: { nom: "Chou rouge",           unite: "kg",    rayon: "legumes",   prix: { migros: 2.5,  coop: 2 } },
    chouvert: { nom: "Chou vert frisé",      unite: "kg",    rayon: "legumes",   prix: { migros: 2.8,  coop: 3.1 } },
    celeri: { nom: "Céleri-rave",          unite: "kg",    rayon: "legumes",   prix: { migros: 6,  coop: 6 } },
    panais: { nom: "Panais",               unite: "kg",    rayon: "legumes",   prix: { migros: 6.5,  coop: 7.0 } },
    potiron: { nom: "Potiron / courge",     unite: "kg",    rayon: "legumes",   prix: { migros: 3.0,  coop: 3.4 } },
    navet: { nom: "Navet",                unite: "kg",    rayon: "legumes",   prix: { migros: 3.5,  coop: 3.8 } },
    chataigne: { nom: "Marrons / châtaignes", unite: "kg",    rayon: "epicerie",  prix: { migros: 22.1,  coop: 23.8 } },
    veau: { nom: "Émincé de veau",       unite: "kg",    rayon: "viande",    prix: { migros: 42.0, coop: 52.0 } },
    boeufragout: { nom: "Bœuf à mijoter",       unite: "kg",    rayon: "viande",    prix: { migros: 21.0, coop: 23.5 } },
    porcragout: { nom: "Rôti / ragoût de porc",unite: "kg",    rayon: "viande",    prix: { migros: 13, coop: 13 } },
    agneau: { nom: "Épaule d'agneau",      unite: "kg",    rayon: "viande",    prix: { migros: 44, coop: 47.52 } },
    cuissepoulet: { nom: "Cuisse de poulet",     unite: "kg",    rayon: "viande",    prix: { migros: 6.5, coop: 6.5 } },
    saucissonvaudois: { nom: "Saucisson vaudois",    unite: "kg",    rayon: "viande",    prix: { migros: 19.5, coop: 24.5 } },
    cervelas: { nom: "Cervelas",             unite: "piece", rayon: "viande",    prix: { migros: 1.7,  coop: 1.7 } },
    chapelure: { nom: "Chapelure",            unite: "kg",    rayon: "epicerie",  prix: { migros: 2,  coop: 2 } },
    cornichon: { nom: "Cornichons",           unite: "kg",    rayon: "epicerie",  prix: { migros: 4.2,  coop: 12.6 } },
    kirsch: { nom: "Kirsch",               unite: "l",     rayon: "boisson",   prix: { migros: 30.0, coop: 33.0 } },
    fromageblanc: { nom: "Fromage blanc / séré", unite: "kg",    rayon: "frais",     prix: { migros: 3.7,  coop: 3.8 } },
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
      id: "pates_bolo", nom: "Pâtes bolognaise", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 25,
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
      id: "pates_carbo", nom: "Pâtes carbonara", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 20,
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
      id: "pates_pesto", nom: "Pâtes au pesto", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 15,
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
      id: "riz_curry_poulet", nom: "Curry de poulet au riz", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 30,
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
      id: "riz_cantonnais", nom: "Riz cantonais", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 25,
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
      id: "salade_cesar", nom: "Salade César au poulet", complexite: 2, creneaux: ["midi"], saisons: ["printemps", "ete"], temps: 20,
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
      id: "omelette", nom: "Omelette aux légumes", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 15,
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
      id: "soupe_legumes", nom: "Soupe de légumes", complexite: 1, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 30,
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
      id: "burger_maison", nom: "Burger maison & frites", complexite: 2, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 40,
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
      id: "gratin_dauphinois", nom: "Gratin dauphinois", complexite: 2, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 60,
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
      id: "saumon_riz_brocoli", nom: "Saumon, riz & brocoli", complexite: 2, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 30,
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
      id: "chili_con_carne", nom: "Chili con carne", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 40,
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
      id: "dahl_lentilles", nom: "Dahl de lentilles", complexite: 2, creneaux: ["midi", "soir"], saisons: ["automne", "hiver"], temps: 35,
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
      id: "tortilla_poulet", nom: "Wraps de poulet", complexite: 1, creneaux: ["midi"], saisons: ["printemps", "ete"], temps: 20,
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
      id: "quiche_lorraine", nom: "Quiche lorraine", complexite: 2, creneaux: ["midi", "soir"], saisons: ["automne", "hiver"], temps: 45,
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
      id: "risotto_champignons", nom: "Risotto aux champignons", complexite: 3, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 40,
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
      id: "pizza_maison", nom: "Pizza maison", complexite: 3, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 50,
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
      id: "poulet_roti_legumes", nom: "Poulet rôti & légumes", complexite: 2, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 45,
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
      id: "salade_thon", nom: "Salade de thon", complexite: 1, creneaux: ["midi"], saisons: ["printemps", "ete"], temps: 15,
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
      id: "buddha_bowl", nom: "Buddha bowl quinoa", complexite: 2, creneaux: ["midi"], saisons: ["printemps", "ete"], temps: 25,
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
      id: "saucisse_puree", nom: "Saucisses & purée", complexite: 1, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 30,
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
      id: "pates_courgette", nom: "Pâtes courgette-crème", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 20,
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
      id: "gratin_pates", nom: "Gratin de pâtes au jambon", complexite: 2, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 40,
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
      id: "poivron_farci", nom: "Poivrons farcis", complexite: 3, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 55,
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
    {
      id: "tacos_boeuf", nom: "Tacos de bœuf", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 25,
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
      id: "poulet_basquaise", nom: "Poulet basquaise", complexite: 2, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 40,
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
      id: "pates_thon", nom: "Pâtes au thon", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 20,
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
      id: "veloute_brocoli", nom: "Velouté de brocoli", complexite: 1, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 30,
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
      id: "frittata", nom: "Frittata pommes de terre", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 30,
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
      id: "poelee_poulet", nom: "Poêlée poulet-légumes", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 30,
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
      id: "soupe_lentilles", nom: "Soupe de lentilles", complexite: 1, creneaux: ["soir"], saisons: ["automne", "hiver"], temps: 35,
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
      id: "ratatouille_riz", nom: "Ratatouille & riz", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 45,
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
      id: "omelette_champ", nom: "Omelette aux champignons", complexite: 1, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 15,
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
      id: "curry_poischiches", nom: "Curry de pois chiches", complexite: 2, creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 30,
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
      id: "saumon_pates_citron", nom: "Pâtes saumon-citron", complexite: 2, creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"], temps: 25,
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
      id: "wrap_vege", nom: "Wrap végétarien", complexite: 1, creneaux: ["midi"], saisons: ["printemps", "ete"], temps: 15,
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
    {
    id: "spaetzli_beurre",
    nom: "Spätzli au beurre et fromage",
    complexite: 1,
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi"], saisons: ["printemps", "ete"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    {
    id: "roesti_oeuf",
    nom: "Rösti au fromage et œuf",
    complexite: 2,
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    {
    id: "lasagnes_boeuf",
    nom: "Lasagnes à la bolognaise",
    complexite: 3,
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["printemps", "ete", "automne", "hiver"],
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
    creneaux: ["midi", "soir"], saisons: ["automne", "hiver"],
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
    creneaux: ["soir"], saisons: ["automne", "hiver"],
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
  },
    {
    id: "a_poke_saumon",
    nom: "Poke bowl saumon avocat",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire le riz et le laisser tiédir, l'assaisonner d'un filet de vinaigre de riz.",
      "Couper le saumon cru en dés, le mariner 10 min dans la sauce soja et un peu de gingembre.",
      "Émincer l'avocat, le concombre et les radis.",
      "Dresser le riz dans un bol, disposer le saumon et les légumes, parsemer de sésame et d'edamame."
    ],
    ingredients: [
      { id: "riz", qte: 0.08, unite: "kg" },
      { id: "saumon", qte: 0.12, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "radis", qte: 0.05, unite: "kg" },
      { id: "edamame", qte: 0.05, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "sesame", qte: 0.005, unite: "kg" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_poke_thon",
    nom: "Poke bowl thon mangue",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire le riz et le laisser refroidir avec un filet de vinaigre de riz.",
      "Égoutter le thon et le mélanger à la sauce soja et au sésame.",
      "Couper la mangue et l'avocat en dés, émincer l'oignon.",
      "Assembler le bol avec riz, thon, mangue, avocat et edamame."
    ],
    ingredients: [
      { id: "riz", qte: 0.08, unite: "kg" },
      { id: "thonboite", qte: 0.1, unite: "kg" },
      { id: "mangue", qte: 0.5, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "edamame", qte: 0.05, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "sesame", qte: 0.005, unite: "kg" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_gaspacho",
    nom: "Gaspacho andalou",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 15,
    etapes: [
      "Mixer les tomates, le concombre, le poivron, l'ail et l'oignon.",
      "Ajouter l'huile d'olive, le vinaigre et un peu d'eau froide, mixer à nouveau.",
      "Assaisonner et réserver au frais au moins 1h.",
      "Servir bien frais avec des dés de concombre et un filet d'huile."
    ],
    ingredients: [
      { id: "tomate", qte: 0.3, unite: "kg" },
      { id: "concombre", qte: 0.5, unite: "piece" },
      { id: "poivron", qte: 0.1, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "huile", qte: 0.02, unite: "l" },
      { id: "vinaigre", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_taboule_libanais",
    nom: "Taboulé libanais persil-menthe",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Réhydrater le boulghour fin dans un peu d'eau tiède citronnée.",
      "Hacher finement le persil, la menthe, la tomate et l'oignon.",
      "Mélanger le tout avec l'huile d'olive et le jus de citron.",
      "Assaisonner et laisser reposer au frais avant de servir."
    ],
    ingredients: [
      { id: "boulgour_fin", qte: 0.04, unite: "kg" },
      { id: "persil", qte: 1, unite: "piece" },
      { id: "menthe", qte: 0.3, unite: "piece" },
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "huile", qte: 0.02, unite: "l" }
    ]
  },
    {
    id: "a_rouleaux_printemps",
    nom: "Rouleaux de printemps crevettes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Cuire les vermicelles de riz et les crevettes, les laisser refroidir.",
      "Émincer la carotte, le concombre et la salade, ciseler la menthe et la coriandre.",
      "Réhydrater une galette de riz, garnir de vermicelles, crevettes, légumes et herbes.",
      "Rouler serré et servir avec une sauce soja au gingembre."
    ],
    ingredients: [
      { id: "galette_riz", qte: 3, unite: "piece" },
      { id: "vermicelle_riz", qte: 0.04, unite: "kg" },
      { id: "crevettes", qte: 0.08, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "salade", qte: 0.25, unite: "piece" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "a_salade_grecque_pasteque",
    nom: "Salade pastèque feta menthe",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 15,
    etapes: [
      "Couper la pastèque en cubes et émietter la feta.",
      "Ciseler la menthe et émincer finement l'oignon rouge.",
      "Mélanger délicatement avec olives et huile d'olive.",
      "Arroser d'un filet de vinaigre balsamique et servir frais."
    ],
    ingredients: [
      { id: "pasteque", qte: 0.3, unite: "kg" },
      { id: "feta", qte: 0.05, unite: "kg" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "olives", qte: 0.02, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinbalsamique", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_bo_bun",
    nom: "Bo bun bœuf vietnamien",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Cuire les vermicelles de riz et les rafraîchir à l'eau froide.",
      "Saisir le bœuf haché avec ail et sauce soja.",
      "Émincer concombre, carotte et salade, ciseler menthe et coriandre.",
      "Dresser vermicelles, légumes et bœuf, parsemer de cacahuètes concassées."
    ],
    ingredients: [
      { id: "vermicelle_riz", qte: 0.07, unite: "kg" },
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "salade", qte: 0.25, unite: "piece" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "cacahuete", qte: 0.02, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" }
    ]
  },
    {
    id: "a_ceviche",
    nom: "Ceviche de cabillaud citron vert",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Couper le cabillaud très frais en petits dés.",
      "Faire mariner 15 min dans le jus de citron vert avec l'oignon rouge émincé.",
      "Ajouter la coriandre ciselée, l'avocat et un peu de poivron.",
      "Assaisonner et servir bien frais."
    ],
    ingredients: [
      { id: "cabillaud", qte: 0.12, unite: "kg" },
      { id: "citronvert", qte: 2, unite: "piece" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "poivron", qte: 0.05, unite: "kg" }
    ]
  },
    {
    id: "a_salade_lentilles_feta",
    nom: "Salade de lentilles feta betterave",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 25,
    etapes: [
      "Cuire les lentilles al dente puis les rafraîchir.",
      "Couper la betterave cuite en dés et émietter la feta.",
      "Mélanger avec oignon rouge, persil et vinaigrette moutarde-huile.",
      "Rectifier l'assaisonnement et servir tiède ou froid."
    ],
    ingredients: [
      { id: "lentilles", qte: 0.08, unite: "kg" },
      { id: "betterave", qte: 0.1, unite: "kg" },
      { id: "feta", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "persil", qte: 0.3, unite: "piece" },
      { id: "moutarde", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinaigre", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_wrap_poulet_thai",
    nom: "Wrap froid poulet thaï",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire le poulet, l'effilocher et le laisser refroidir.",
      "Préparer une sauce cacahuète avec sauce soja et un peu de lait de coco.",
      "Garnir les tortillas de salade, carotte râpée, concombre et poulet.",
      "Napper de sauce, ciseler la coriandre, rouler et couper."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "salade", qte: 0.2, unite: "piece" },
      { id: "cacahuete", qte: 0.02, unite: "kg" },
      { id: "laitcoco", qte: 0.03, unite: "l" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "coriandre", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_salade_thai_boeuf",
    nom: "Salade thaï de bœuf (yam nua)",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Saisir rapidement le bœuf, le laisser tiédir et l'émincer.",
      "Préparer une sauce citron vert, sauce soja et gingembre.",
      "Mélanger salade, concombre, tomates cerises et oignon rouge.",
      "Ajouter le bœuf, la coriandre et la menthe, arroser de sauce."
    ],
    ingredients: [
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "salade", qte: 0.25, unite: "piece" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "tomatecerise", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "a_buddha_pois_chiches",
    nom: "Buddha bowl pois chiches rôtis",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne"],
    temps: 30,
    etapes: [
      "Rôtir les pois chiches au four avec paprika et cumin.",
      "Cuire le quinoa et le laisser tiédir.",
      "Préparer une sauce yaourt-citron.",
      "Dresser quinoa, avocat, carotte, épinard et pois chiches, napper de sauce."
    ],
    ingredients: [
      { id: "poischiches", qte: 0.08, unite: "kg" },
      { id: "quinoa", qte: 0.07, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "epinard", qte: 0.05, unite: "kg" },
      { id: "yaourtnature", qte: 0.05, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" }
    ]
  },
    {
    id: "a_salade_riz_thon",
    nom: "Salade de riz estivale au thon",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Cuire le riz et le laisser refroidir.",
      "Égoutter le thon et le maïs, couper les tomates cerises.",
      "Mélanger avec poivron, oignon et olives.",
      "Assaisonner d'huile, vinaigre et persil ciselé."
    ],
    ingredients: [
      { id: "riz", qte: 0.08, unite: "kg" },
      { id: "thonboite", qte: 0.08, unite: "kg" },
      { id: "mais", qte: 0.05, unite: "kg" },
      { id: "tomatecerise", qte: 0.1, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "olives", qte: 0.02, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinaigre", qte: 0.01, unite: "l" },
      { id: "persil", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_gado_gado",
    nom: "Gado gado indonésien",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Cuire les pommes de terre, les haricots verts et les œufs.",
      "Préparer une sauce cacahuète avec lait de coco et sauce soja.",
      "Blanchir le brocoli et émincer le concombre.",
      "Dresser tous les légumes, ajouter les œufs coupés et napper de sauce."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.12, unite: "kg" },
      { id: "harichverts", qte: 0.08, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "brocoli", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "cacahuete", qte: 0.025, unite: "kg" },
      { id: "laitcoco", qte: 0.04, unite: "l" },
      { id: "saucesoja", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_tartare_avocat_tomate",
    nom: "Tartare avocat-tomate au citron vert",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 15,
    etapes: [
      "Couper l'avocat et les tomates en petits dés.",
      "Émincer finement l'oignon rouge et ciseler la coriandre.",
      "Assaisonner de jus de citron vert et d'huile d'olive.",
      "Mouler en cercle et servir aussitôt."
    ],
    ingredients: [
      { id: "avocat", qte: 1, unite: "piece" },
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "huile", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_curry_vert_crevettes",
    nom: "Curry vert de crevettes léger",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 25,
    etapes: [
      "Faire revenir la pâte de curry rouge avec un peu de gingembre.",
      "Ajouter le lait de coco et porter à frémissement.",
      "Ajouter les crevettes, le poivron et les petits pois.",
      "Cuire 8 min, finir au citron vert et coriandre, servir avec du riz."
    ],
    ingredients: [
      { id: "crevettes", qte: 0.12, unite: "kg" },
      { id: "currypate", qte: 0.015, unite: "kg" },
      { id: "laitcoco", qte: 0.1, unite: "l" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "petitspois", qte: 0.05, unite: "kg" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "citronvert", qte: 0.5, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "riz", qte: 0.07, unite: "kg" }
    ]
  },
    {
    id: "a_salade_fenouil_orange",
    nom: "Salade de fenouil croquante",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 15,
    etapes: [
      "Émincer très finement le fenouil à la mandoline.",
      "Ajouter la roquette et de fines lamelles de radis.",
      "Assaisonner d'huile d'olive, jus de citron et un peu de miel.",
      "Parsemer de parmesan en copeaux et servir frais."
    ],
    ingredients: [
      { id: "fenouil", qte: 0.15, unite: "kg" },
      { id: "roquette", qte: 0.5, unite: "piece" },
      { id: "radis", qte: 0.04, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "miel", qte: 0.005, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "a_bruschetta",
    nom: "Bruschetta tomate basilic",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 15,
    etapes: [
      "Griller les tranches de pain et les frotter d'ail.",
      "Concasser les tomates, ciseler le basilic.",
      "Mélanger avec huile d'olive, sel et poivre.",
      "Garnir le pain de la préparation et servir aussitôt."
    ],
    ingredients: [
      { id: "pain", qte: 0.1, unite: "kg" },
      { id: "tomate", qte: 0.15, unite: "kg" },
      { id: "basilic", qte: 0.3, unite: "piece" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_salade_caprese",
    nom: "Caprese tomate mozzarella",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 10,
    etapes: [
      "Trancher les tomates et la mozzarella.",
      "Alterner les tranches sur l'assiette.",
      "Parsemer de basilic frais.",
      "Arroser d'huile d'olive et de vinaigre balsamique."
    ],
    ingredients: [
      { id: "tomate", qte: 0.2, unite: "kg" },
      { id: "mozzarella", qte: 0.1, unite: "kg" },
      { id: "basilic", qte: 0.3, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinbalsamique", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_wrap_saumon_fume",
    nom: "Wrap froid saumon avocat",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 15,
    etapes: [
      "Écraser l'avocat avec un peu de jus de citron.",
      "Tartiner les tortillas d'avocat.",
      "Ajouter le saumon, la salade et le concombre émincé.",
      "Rouler serré et couper en deux."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "saumon", qte: 0.08, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "salade", qte: 0.2, unite: "piece" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "citron", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "a_salade_quinoa_menthe",
    nom: "Taboulé de quinoa concombre menthe",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire le quinoa et le laisser refroidir.",
      "Couper le concombre, les tomates cerises et l'oignon en petits dés.",
      "Ciseler menthe et persil.",
      "Mélanger avec citron et huile d'olive, servir frais."
    ],
    ingredients: [
      { id: "quinoa", qte: 0.07, unite: "kg" },
      { id: "concombre", qte: 0.4, unite: "piece" },
      { id: "tomatecerise", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "menthe", qte: 0.3, unite: "piece" },
      { id: "persil", qte: 0.3, unite: "piece" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_gambas_grillees",
    nom: "Gambas grillées ail-citron",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Faire mariner les crevettes avec ail, huile et persil.",
      "Griller à la poêle 2-3 min de chaque côté.",
      "Déglacer au jus de citron.",
      "Servir avec une salade verte."
    ],
    ingredients: [
      { id: "crevettes", qte: 0.14, unite: "kg" },
      { id: "ail", qte: 0.008, unite: "kg" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "persil", qte: 0.3, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "salade", qte: 0.3, unite: "piece" }
    ]
  },
    {
    id: "a_legumes_grilles_feta",
    nom: "Légumes grillés méditerranéens à la feta",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Trancher courgette, aubergine et poivron.",
      "Badigeonner d'huile et griller au four ou à la plancha.",
      "Disposer sur un plat, émietter la feta.",
      "Arroser de balsamique et parsemer de basilic."
    ],
    ingredients: [
      { id: "courgette", qte: 0.15, unite: "kg" },
      { id: "aubergine", qte: 0.15, unite: "kg" },
      { id: "poivron", qte: 0.1, unite: "kg" },
      { id: "feta", qte: 0.05, unite: "kg" },
      { id: "huile", qte: 0.02, unite: "l" },
      { id: "vinbalsamique", qte: 0.01, unite: "l" },
      { id: "basilic", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_salade_pates_pesto",
    nom: "Salade de pâtes froides pesto tomate",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Cuire les pâtes al dente et les rafraîchir.",
      "Couper les tomates cerises et la mozzarella.",
      "Mélanger avec le pesto et la roquette.",
      "Assaisonner et servir frais."
    ],
    ingredients: [
      { id: "pates", qte: 0.09, unite: "kg" },
      { id: "tomatecerise", qte: 0.1, unite: "kg" },
      { id: "mozzarella", qte: 0.06, unite: "kg" },
      { id: "pesto", qte: 0.03, unite: "kg" },
      { id: "roquette", qte: 0.4, unite: "piece" }
    ]
  },
    {
    id: "a_tataki_thon",
    nom: "Tataki de thon au sésame",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Enrober le thon frais de graines de sésame.",
      "Saisir 30 sec par face à feu vif, cœur cru.",
      "Trancher finement.",
      "Servir avec sauce soja, gingembre et un peu de wasabi."
    ],
    ingredients: [
      { id: "thonboite", qte: 0.12, unite: "kg" },
      { id: "sesame", qte: 0.01, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "wasabi", qte: 0.003, unite: "kg" },
      { id: "salade", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_pad_thai_leger",
    nom: "Pad thaï léger au poulet",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 30,
    etapes: [
      "Réhydrater les vermicelles de riz.",
      "Sauter le poulet avec ail, puis ajouter l'œuf battu.",
      "Incorporer les vermicelles, sauce soja et sauce huître.",
      "Finir au citron vert, cacahuètes et coriandre."
    ],
    ingredients: [
      { id: "vermicelle_riz", qte: 0.07, unite: "kg" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "saucehuitre", qte: 0.01, unite: "l" },
      { id: "citronvert", qte: 0.5, unite: "piece" },
      { id: "cacahuete", qte: 0.02, unite: "kg" },
      { id: "coriandre", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_salade_concombre_asiat",
    nom: "Salade de concombre sésame (coréenne)",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 15,
    etapes: [
      "Émincer finement le concombre et le dégorger au sel.",
      "Préparer une sauce soja, vinaigre de riz et un peu d'ail.",
      "Mélanger le concombre avec la sauce.",
      "Parsemer de graines de sésame et servir frais."
    ],
    ingredients: [
      { id: "concombre", qte: 1, unite: "piece" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" },
      { id: "ail", qte: 0.003, unite: "kg" },
      { id: "sesame", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "a_salade_poulet_avocat",
    nom: "Salade poulet grillé avocat",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 25,
    etapes: [
      "Griller le filet de poulet et le trancher.",
      "Dresser la salade, l'avocat et les tomates cerises.",
      "Ajouter le maïs et le poulet tiède.",
      "Assaisonner d'une vinaigrette moutarde-citron."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "salade", qte: 0.3, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "tomatecerise", qte: 0.1, unite: "kg" },
      { id: "mais", qte: 0.04, unite: "kg" },
      { id: "moutarde", qte: 0.005, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_maki_bowl",
    nom: "Sushi bowl saumon (chirashi)",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 25,
    etapes: [
      "Cuire le riz et l'assaisonner de vinaigre de riz.",
      "Couper le saumon cru en dés.",
      "Émincer concombre, avocat et radis.",
      "Dresser le riz, garnir des ingrédients, ajouter nori émincé et sésame."
    ],
    ingredients: [
      { id: "riz", qte: 0.09, unite: "kg" },
      { id: "saumon", qte: 0.1, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "radis", qte: 0.04, unite: "kg" },
      { id: "algues_nori", qte: 1, unite: "piece" },
      { id: "sesame", qte: 0.005, unite: "kg" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" },
      { id: "wasabi", qte: 0.002, unite: "kg" }
    ]
  },
    {
    id: "a_salade_mexicaine",
    nom: "Salade mexicaine haricots-maïs",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 15,
    etapes: [
      "Égoutter et rincer les haricots rouges et le maïs.",
      "Couper l'avocat, la tomate et le poivron en dés.",
      "Ciseler la coriandre, émincer l'oignon rouge.",
      "Assaisonner de jus de citron vert, cumin et huile."
    ],
    ingredients: [
      { id: "haricotrouge", qte: 0.08, unite: "kg" },
      { id: "mais", qte: 0.05, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "cumin", qte: 0.003, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_salade_pdt_hareng",
    nom: "Salade de pommes de terre aux sardines",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire les pommes de terre à l'eau, les couper tièdes.",
      "Émincer l'oignon rouge et ciseler le persil.",
      "Ajouter les sardines égouttées.",
      "Assaisonner de moutarde, vinaigre et huile."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "sardine", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "persil", qte: 0.3, unite: "piece" },
      { id: "moutarde", qte: 0.005, unite: "kg" },
      { id: "vinaigre", qte: 0.01, unite: "l" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_salade_haricots_verts",
    nom: "Salade de haricots verts et œuf",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire les haricots verts croquants et les rafraîchir.",
      "Cuire les œufs durs et les couper en quartiers.",
      "Dresser avec tomates cerises et oignon rouge.",
      "Assaisonner d'une vinaigrette moutarde-échalote."
    ],
    ingredients: [
      { id: "harichverts", qte: 0.15, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "tomatecerise", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "moutarde", qte: 0.005, unite: "kg" },
      { id: "vinaigre", qte: 0.01, unite: "l" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_tartare_saumon",
    nom: "Tartare de saumon à l'aneth",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Couper le saumon très frais en petits dés.",
      "Mélanger avec oignon rouge, câpres et jus de citron.",
      "Ajouter un filet d'huile et du persil ciselé.",
      "Mouler en cercle et servir bien frais."
    ],
    ingredients: [
      { id: "saumon", qte: 0.13, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "persil", qte: 0.2, unite: "piece" },
      { id: "huile", qte: 0.01, unite: "l" },
      { id: "moutarde", qte: 0.003, unite: "kg" }
    ]
  },
    {
    id: "a_wrap_falafel",
    nom: "Wrap froid falafel de pois chiches",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 30,
    etapes: [
      "Mixer les pois chiches avec ail, cumin et persil, former des boulettes.",
      "Poêler les falafels à l'huile.",
      "Préparer une sauce yaourt-citron-menthe.",
      "Garnir les tortillas de salade, tomate, falafels et sauce, rouler."
    ],
    ingredients: [
      { id: "poischiches", qte: 0.1, unite: "kg" },
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "salade", qte: 0.2, unite: "piece" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "yaourtnature", qte: 0.05, unite: "kg" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "cumin", qte: 0.004, unite: "kg" },
      { id: "persil", qte: 0.2, unite: "piece" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.02, unite: "l" }
    ]
  },
    {
    id: "a_salade_boulgour_grenade",
    nom: "Salade de boulghour aux herbes",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Cuire le boulghour et le laisser tiédir.",
      "Couper concombre, tomate et poivron en petits dés.",
      "Ciseler menthe et persil.",
      "Assaisonner de citron, huile et cumin, servir frais."
    ],
    ingredients: [
      { id: "boulgour", qte: 0.07, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "persil", qte: 0.3, unite: "piece" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "cumin", qte: 0.003, unite: "kg" }
    ]
  },
    {
    id: "a_poisson_papillote",
    nom: "Papillote de cabillaud aux légumes",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Disposer le cabillaud sur du papier cuisson.",
      "Ajouter courgette, tomates cerises et rondelles de citron.",
      "Arroser d'huile, d'ail et de persil.",
      "Fermer la papillote et cuire 20 min au four à 200°C."
    ],
    ingredients: [
      { id: "cabillaud", qte: 0.15, unite: "kg" },
      { id: "courgette", qte: 0.1, unite: "kg" },
      { id: "tomatecerise", qte: 0.08, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "ail", qte: 0.004, unite: "kg" },
      { id: "persil", qte: 0.2, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_salade_pasteque_concombre",
    nom: "Salade rafraîchissante pastèque-concombre",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 15,
    etapes: [
      "Couper la pastèque et le concombre en cubes.",
      "Ciseler la menthe.",
      "Émietter un peu de feta.",
      "Arroser de jus de citron vert et servir très frais."
    ],
    ingredients: [
      { id: "pasteque", qte: 0.3, unite: "kg" },
      { id: "concombre", qte: 0.5, unite: "piece" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "feta", qte: 0.04, unite: "kg" },
      { id: "citronvert", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "a_larb_poulet",
    nom: "Larb de poulet thaïlandais",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Émincer et saisir le poulet haché.",
      "Assaisonner de sauce soja, citron vert et gingembre.",
      "Ajouter oignon rouge, menthe et coriandre.",
      "Servir tiède dans des feuilles de salade."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.13, unite: "kg" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "salade", qte: 0.25, unite: "piece" }
    ]
  },
    {
    id: "a_salade_betterave_chevre",
    nom: "Salade betterave roquette feta",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne"],
    temps: 15,
    etapes: [
      "Couper la betterave cuite en dés.",
      "Dresser sur un lit de roquette.",
      "Émietter la feta par-dessus.",
      "Arroser de vinaigrette miel-balsamique."
    ],
    ingredients: [
      { id: "betterave", qte: 0.12, unite: "kg" },
      { id: "roquette", qte: 0.5, unite: "piece" },
      { id: "feta", qte: 0.05, unite: "kg" },
      { id: "miel", qte: 0.005, unite: "kg" },
      { id: "vinbalsamique", qte: 0.01, unite: "l" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_riz_saute_edamame",
    nom: "Salade de riz japonaise edamame",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Cuire le riz et le laisser refroidir.",
      "Cuire les edamame et les écosser.",
      "Émincer carotte, radis et concombre.",
      "Assaisonner de sauce soja, vinaigre de riz et sésame."
    ],
    ingredients: [
      { id: "riz", qte: 0.08, unite: "kg" },
      { id: "edamame", qte: 0.06, unite: "kg" },
      { id: "carotte", qte: 0.05, unite: "kg" },
      { id: "radis", qte: 0.04, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" },
      { id: "sesame", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "a_brochettes_poulet_citron",
    nom: "Brochettes de poulet mariné au citron",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Couper le poulet en cubes et le mariner citron, ail, huile, paprika.",
      "Monter les brochettes en alternant avec du poivron.",
      "Griller à la plancha ou au four.",
      "Servir avec une salade et du yaourt à la menthe."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.14, unite: "kg" },
      { id: "poivron", qte: 0.08, unite: "kg" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "yaourtnature", qte: 0.04, unite: "kg" },
      { id: "menthe", qte: 0.15, unite: "piece" }
    ]
  },
    {
    id: "a_salade_thon_haricots",
    nom: "Salade thon et haricots rouges",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 15,
    etapes: [
      "Rincer les haricots rouges et le maïs.",
      "Ajouter le thon égoutté et les tomates cerises.",
      "Émincer oignon rouge et poivron.",
      "Assaisonner d'huile, vinaigre et persil."
    ],
    ingredients: [
      { id: "thonboite", qte: 0.08, unite: "kg" },
      { id: "haricotrouge", qte: 0.08, unite: "kg" },
      { id: "mais", qte: 0.04, unite: "kg" },
      { id: "tomatecerise", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.02, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinaigre", qte: 0.01, unite: "l" },
      { id: "persil", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_nouilles_froides_sesame",
    nom: "Nouilles froides au sésame (asiatique)",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Cuire les nouilles chinoises et les rafraîchir.",
      "Préparer une sauce sésame, soja, vinaigre de riz et gingembre.",
      "Émincer concombre et carotte en julienne.",
      "Mélanger le tout et parsemer de graines de sésame."
    ],
    ingredients: [
      { id: "nouilleschin", qte: 0.09, unite: "kg" },
      { id: "concombre", qte: 0.4, unite: "piece" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "saucesoja", qte: 0.015, unite: "l" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "sesame", qte: 0.008, unite: "kg" }
    ]
  },
    {
    id: "a_salade_courgette_crue",
    nom: "Carpaccio de courgette au parmesan",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 15,
    etapes: [
      "Émincer la courgette crue en fines lamelles à la mandoline.",
      "Disposer en rosace sur l'assiette.",
      "Arroser d'huile d'olive et de jus de citron.",
      "Parsemer de copeaux de parmesan et de basilic."
    ],
    ingredients: [
      { id: "courgette", qte: 0.15, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "basilic", qte: 0.2, unite: "piece" }
    ]
  },
    {
    id: "a_tacos_poisson",
    nom: "Tacos de poisson à la mangue",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Assaisonner le cabillaud de paprika et cumin, le poêler et l'émietter.",
      "Préparer une salsa mangue-coriandre-citron vert.",
      "Réchauffer les tortillas.",
      "Garnir de salade, poisson, salsa et avocat."
    ],
    ingredients: [
      { id: "cabillaud", qte: 0.12, unite: "kg" },
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "mangue", qte: 0.5, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "salade", qte: 0.15, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "paprika", qte: 0.003, unite: "kg" },
      { id: "cumin", qte: 0.003, unite: "kg" }
    ]
  },
    {
    id: "a_soupe_froide_concombre",
    nom: "Soupe froide concombre yaourt menthe",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 15,
    etapes: [
      "Mixer le concombre avec le yaourt et l'ail.",
      "Ajouter la menthe et un filet d'huile d'olive.",
      "Assaisonner et allonger d'un peu d'eau froide si besoin.",
      "Réserver au frais et servir glacé."
    ],
    ingredients: [
      { id: "concombre", qte: 1, unite: "piece" },
      { id: "yaourtnature", qte: 0.1, unite: "kg" },
      { id: "ail", qte: 0.003, unite: "kg" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "huile", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_salade_tofu_sesame",
    nom: "Salade de tofu grillé sésame-soja",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Presser le tofu, le couper en cubes et le mariner sauce soja-gingembre.",
      "Le poêler jusqu'à doré.",
      "Dresser sur un lit de salade avec carotte et edamame.",
      "Napper de sauce soja-vinaigre de riz et parsemer de sésame."
    ],
    ingredients: [
      { id: "tofu", qte: 0.12, unite: "kg" },
      { id: "salade", qte: 0.25, unite: "piece" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "edamame", qte: 0.05, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "vinaigreriz", qte: 0.01, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "sesame", qte: 0.006, unite: "kg" }
    ]
  },
    {
    id: "a_salade_roquette_parme",
    nom: "Salade roquette jambon melon",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["ete"],
    temps: 10,
    etapes: [
      "Dresser la roquette sur les assiettes.",
      "Ajouter des cubes de pastèque et le jambon.",
      "Parsemer de copeaux de parmesan.",
      "Arroser d'huile d'olive et de balsamique."
    ],
    ingredients: [
      { id: "roquette", qte: 0.5, unite: "piece" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "pasteque", qte: 0.2, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "vinbalsamique", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "a_curry_leger_legumes",
    nom: "Curry léger de légumes d'été au coco",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 30,
    etapes: [
      "Faire revenir oignon, ail et gingembre.",
      "Ajouter la pâte de curry rouge puis le lait de coco.",
      "Incorporer courgette, poivron et petits pois, laisser mijoter 12 min.",
      "Finir au citron vert et coriandre, servir avec du riz."
    ],
    ingredients: [
      { id: "courgette", qte: 0.12, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "petitspois", qte: 0.05, unite: "kg" },
      { id: "currypate", qte: 0.012, unite: "kg" },
      { id: "laitcoco", qte: 0.1, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "citronvert", qte: 0.5, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "riz", qte: 0.07, unite: "kg" }
    ]
  },
    {
    id: "a_salade_fattoush",
    nom: "Fattoush libanais au pain grillé",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 20,
    etapes: [
      "Griller le pain coupé en morceaux jusqu'à croustillant.",
      "Couper tomate, concombre, radis et poivron.",
      "Ajouter salade, menthe et persil.",
      "Assaisonner de citron, huile et sumac, ajouter le pain au dernier moment."
    ],
    ingredients: [
      { id: "pain", qte: 0.06, unite: "kg" },
      { id: "tomate", qte: 0.12, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "radis", qte: 0.04, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "salade", qte: 0.2, unite: "piece" },
      { id: "menthe", qte: 0.2, unite: "piece" },
      { id: "persil", qte: 0.2, unite: "piece" },
      { id: "citron", qte: 1, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_salade_crevettes_mangue",
    nom: "Salade crevettes-mangue-avocat",
    complexite: 2,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Poêler rapidement les crevettes.",
      "Couper mangue et avocat en dés.",
      "Dresser sur un lit de salade avec concombre.",
      "Arroser d'une sauce citron vert, huile et coriandre."
    ],
    ingredients: [
      { id: "crevettes", qte: 0.1, unite: "kg" },
      { id: "mangue", qte: 0.5, unite: "piece" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "salade", qte: 0.25, unite: "piece" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "citronvert", qte: 1, unite: "piece" },
      { id: "coriandre", qte: 0.2, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" }
    ]
  },
    {
    id: "a_wrap_thon_crudites",
    nom: "Wrap froid thon-crudités",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete", "automne", "hiver"],
    temps: 15,
    etapes: [
      "Mélanger le thon égoutté avec un peu de yaourt et moutarde.",
      "Tartiner les tortillas.",
      "Ajouter salade, carotte râpée, tomate et concombre.",
      "Rouler serré et couper en deux."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "thonboite", qte: 0.08, unite: "kg" },
      { id: "yaourtnature", qte: 0.03, unite: "kg" },
      { id: "moutarde", qte: 0.004, unite: "kg" },
      { id: "salade", qte: 0.2, unite: "piece" },
      { id: "carotte", qte: 0.05, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" }
    ]
  },
    {
    id: "a_salade_quinoa_avocat_edamame",
    nom: "Bowl quinoa avocat edamame",
    complexite: 1,
    creneaux: ["midi", "soir"],
    saisons: ["printemps", "ete"],
    temps: 25,
    etapes: [
      "Cuire le quinoa et le laisser refroidir.",
      "Cuire et écosser les edamame.",
      "Ajouter avocat, tomates cerises et concombre.",
      "Assaisonner de citron, huile et sésame."
    ],
    ingredients: [
      { id: "quinoa", qte: 0.07, unite: "kg" },
      { id: "edamame", qte: 0.06, unite: "kg" },
      { id: "avocat", qte: 0.5, unite: "piece" },
      { id: "tomatecerise", qte: 0.08, unite: "kg" },
      { id: "concombre", qte: 0.3, unite: "piece" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "huile", qte: 0.015, unite: "l" },
      { id: "sesame", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "b_fondue_moitie_moitie",
    nom: "Fondue moitié-moitié",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 35,
    etapes: [
      "Frotter le caquelon d'ail, verser le vin blanc et chauffer doucement.",
      "Ajouter le gruyère et le vacherin râpés en remuant sans arrêt.",
      "Lier avec un peu de kirsch délayé, poivrer généreusement.",
      "Servir avec du pain coupé en dés pour tremper."
    ],
    ingredients: [
      { id: "gruyere", qte: 0.1, unite: "kg" },
      { id: "vacherin", qte: 0.1, unite: "kg" },
      { id: "vinblanc", qte: 0.08, unite: "l" },
      { id: "kirsch", qte: 0.01, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pain", qte: 0.15, unite: "kg" }
    ]
  },
    {
    id: "b_fondue_tomate",
    nom: "Fondue à la tomate",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 35,
    etapes: [
      "Faire réduire une purée de tomate avec l'ail dans le caquelon.",
      "Mouiller au vin blanc et incorporer le gruyère râpé peu à peu.",
      "Remuer jusqu'à obtenir une fondue lisse et onctueuse.",
      "Poivrer et servir avec du pain en dés."
    ],
    ingredients: [
      { id: "gruyere", qte: 0.18, unite: "kg" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "vinblanc", qte: 0.06, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pain", qte: 0.15, unite: "kg" }
    ]
  },
    {
    id: "b_raclette_charcuterie",
    nom: "Raclette à la charcuterie et cornichons",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 30,
    etapes: [
      "Cuire les pommes de terre en robe des champs.",
      "Faire fondre les tranches de raclette dans les coupelles.",
      "Disposer jambon, cornichons et oignons en accompagnement.",
      "Napper les pommes de terre de fromage fondu et poivrer."
    ],
    ingredients: [
      { id: "raclette", qte: 0.2, unite: "kg" },
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "jambon", qte: 0.08, unite: "kg" },
      { id: "cornichon", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_emince_zurichois",
    nom: "Émincé de veau à la zurichoise",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Saisir vivement l'émincé de veau dans le beurre, réserver.",
      "Faire suer oignon et champignons dans la même poêle.",
      "Déglacer au vin blanc, ajouter la crème et réduire.",
      "Remettre la viande, réchauffer sans bouillir et servir avec des rösti."
    ],
    ingredients: [
      { id: "veau", qte: 0.14, unite: "kg" },
      { id: "champignon", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.08, unite: "l" },
      { id: "vinblanc", qte: 0.04, unite: "l" },
      { id: "beurre", qte: 0.015, unite: "kg" }
    ]
  },
    {
    id: "b_cordon_bleu",
    nom: "Cordon bleu jambon-fromage",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Ouvrir les escalopes de poulet en portefeuille, garnir de jambon et de gruyère.",
      "Refermer, fariner, passer dans l'œuf battu puis la chapelure.",
      "Cuire à la poêle dans le beurre jusqu'à dorure des deux côtés.",
      "Servir avec un quartier de citron et des frites ou une salade."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.15, unite: "kg" },
      { id: "jambon", qte: 0.03, unite: "kg" },
      { id: "gruyere", qte: 0.03, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "chapelure", qte: 0.04, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "b_choucroute_garnie",
    nom: "Choucroute garnie",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 90,
    etapes: [
      "Rincer la choucroute et la faire suer avec l'oignon et les lardons.",
      "Mouiller au vin blanc, ajouter le bouillon et laisser mijoter à couvert.",
      "Enfouir saucisses, saucisson et lard, poursuivre la cuisson doucement.",
      "Servir avec des pommes de terre vapeur et de la moutarde."
    ],
    ingredients: [
      { id: "choucroute", qte: 0.25, unite: "kg" },
      { id: "saucisse", qte: 0.1, unite: "kg" },
      { id: "saucissonvaudois", qte: 0.06, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "vinblanc", qte: 0.05, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_boeuf_bourguignon",
    nom: "Bœuf bourguignon",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 150,
    etapes: [
      "Saisir les cubes de bœuf farinés, réserver.",
      "Faire revenir lardons, oignon, carottes et champignons.",
      "Déglacer au vin rouge, remettre la viande et le bouillon.",
      "Mijoter à couvert 2 h jusqu'à ce que la viande soit fondante.",
      "Servir avec des pommes de terre ou des pâtes."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.15, unite: "kg" },
      { id: "vinrouge", qte: 0.1, unite: "l" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "carotte", qte: 0.1, unite: "kg" },
      { id: "champignon", qte: 0.07, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_pot_au_feu",
    nom: "Pot-au-feu de bœuf aux légumes",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 150,
    etapes: [
      "Mettre le bœuf dans une grande marmite d'eau froide avec le bouillon.",
      "Écumer, ajouter oignon, carottes, poireau, céleri et navet.",
      "Laisser frémir 2 h à petit feu.",
      "Servir la viande et les légumes avec de la moutarde et des cornichons."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.16, unite: "kg" },
      { id: "carotte", qte: 0.1, unite: "kg" },
      { id: "poireau", qte: 0.08, unite: "kg" },
      { id: "celeri", qte: 0.08, unite: "kg" },
      { id: "navet", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" },
      { id: "moutarde", qte: 0.01, unite: "kg" }
    ]
  },
    {
    id: "b_hachis_parmentier",
    nom: "Hachis Parmentier gratiné",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 55,
    etapes: [
      "Cuire et écraser les pommes de terre en purée avec lait et beurre.",
      "Faire revenir le bœuf haché avec oignon, ail et tomate.",
      "Dresser la viande au fond d'un plat, couvrir de purée.",
      "Parsemer de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "boeufhache", qte: 0.13, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "tomate", qte: 0.06, unite: "kg" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "fromagerape", qte: 0.03, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "b_rosti_montagnard",
    nom: "Rösti montagnard fromage et lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 40,
    etapes: [
      "Râper les pommes de terre et faire dorer les lardons.",
      "Cuire la galette de rösti dans le beurre jusqu'à croûte dorée.",
      "Parsemer d'appenzeller râpé, couvrir pour le faire fondre.",
      "Retourner, servir bien chaud."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "appenzeller", qte: 0.04, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "b_alplermagronen_lard",
    nom: "Älplermagronen crème et lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Cuire ensemble pâtes et pommes de terre en dés.",
      "Faire dorer oignon et lardons, réserver.",
      "Mélanger pâtes, pommes de terre, crème et fromage râpé.",
      "Gratiner, garnir d'oignons frits et servir avec une compote de pommes."
    ],
    ingredients: [
      { id: "pates", qte: 0.08, unite: "kg" },
      { id: "pommesdeterre", qte: 0.15, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" }
    ]
  },
    {
    id: "b_tartiflette",
    nom: "Tartiflette au reblochon",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 60,
    etapes: [
      "Précuire les pommes de terre puis les couper en rondelles.",
      "Faire revenir oignon et lardons, déglacer au vin blanc.",
      "Alterner pommes de terre et mélange dans un plat, ajouter la crème.",
      "Couvrir de raclette et enfourner jusqu'à dorure."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "raclette", qte: 0.08, unite: "kg" },
      { id: "lardons", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "vinblanc", qte: 0.03, unite: "l" }
    ]
  },
    {
    id: "b_saucisse_choux",
    nom: "Saucisse à rôtir et choux braisés",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Émincer le chou vert et le faire braiser avec oignon et lardons.",
      "Mouiller d'un peu de bouillon et laisser fondre à couvert.",
      "Rôtir les saucisses à la poêle jusqu'à belle coloration.",
      "Servir sur le lit de chou avec des pommes de terre vapeur."
    ],
    ingredients: [
      { id: "saucisse", qte: 0.12, unite: "kg" },
      { id: "chouvert", qte: 0.2, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_celeri_jambon",
    nom: "Gratin de céleri-rave au jambon",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Éplucher et couper le céleri en fines tranches, précuire à l'eau.",
      "Alterner céleri et lamelles de jambon dans un plat.",
      "Napper de crème assaisonnée, couvrir de fromage râpé.",
      "Gratiner au four jusqu'à ce que le dessus soit doré."
    ],
    ingredients: [
      { id: "celeri", qte: 0.25, unite: "kg" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "creme", qte: 0.08, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_potee_lentilles_saucisse",
    nom: "Potée de lentilles à la saucisse",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 60,
    etapes: [
      "Faire revenir oignon, carottes et lardons.",
      "Ajouter les lentilles, le bouillon et laisser mijoter.",
      "Pocher les saucisses dans la potée en fin de cuisson.",
      "Rectifier l'assaisonnement et servir bien chaud."
    ],
    ingredients: [
      { id: "lentilles", qte: 0.09, unite: "kg" },
      { id: "saucisse", qte: 0.1, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_blanquette_veau",
    nom: "Blanquette de veau à l'ancienne",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 120,
    etapes: [
      "Blanchir le veau, puis le cuire doucement avec carottes et oignon.",
      "Faire suer les champignons à part.",
      "Préparer un roux avec beurre et farine, mouiller avec le bouillon de cuisson.",
      "Lier à la crème et à l'œuf, ajouter viande et champignons.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "veau", qte: 0.15, unite: "kg" },
      { id: "champignon", qte: 0.07, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "oeufs", qte: 0.5, unite: "piece" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_ragout_porc_biere",
    nom: "Ragoût de porc aux oignons",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 100,
    etapes: [
      "Saisir les morceaux de porc farinés.",
      "Faire fondre une grande quantité d'oignons.",
      "Déglacer au vin blanc, ajouter le bouillon et la moutarde.",
      "Mijoter à couvert jusqu'à ce que la viande soit tendre, servir avec spätzli."
    ],
    ingredients: [
      { id: "porcragout", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.1, unite: "kg" },
      { id: "vinblanc", qte: 0.05, unite: "l" },
      { id: "moutarde", qte: 0.01, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "spaetzli", qte: 0.12, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_tourte_poireaux_lard",
    nom: "Tourte salée poireaux et lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 60,
    etapes: [
      "Faire fondre les poireaux émincés avec les lardons.",
      "Mélanger avec œufs, crème et fromage râpé.",
      "Garnir une pâte feuilletée, refermer avec une seconde abaisse.",
      "Dorer à l'œuf et cuire au four jusqu'à ce que la tourte soit dorée."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 1, unite: "piece" },
      { id: "poireau", qte: 0.15, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_courge_gorgonzola",
    nom: "Gratin de courge et fromage",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Couper la courge en cubes et la précuire à la vapeur.",
      "Disposer dans un plat, assaisonner et napper de crème.",
      "Couvrir de fromage râpé et de quelques noisettes de beurre.",
      "Gratiner au four jusqu'à ce que le dessus soit fondant et doré."
    ],
    ingredients: [
      { id: "potiron", qte: 0.3, unite: "kg" },
      { id: "creme", qte: 0.07, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "beurre", qte: 0.01, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_courge_chataigne",
    nom: "Velouté de courge aux marrons",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Faire suer oignon et courge en cubes.",
      "Ajouter les marrons, mouiller de bouillon et cuire jusqu'à tendreté.",
      "Mixer finement, lier avec la crème.",
      "Servir avec quelques éclats de marrons et un tour de poivre."
    ],
    ingredients: [
      { id: "potiron", qte: 0.3, unite: "kg" },
      { id: "chataigne", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_soupe_orge_grisons",
    nom: "Soupe d'orge des Grisons",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 75,
    etapes: [
      "Faire revenir oignon, carottes, céleri et lardons.",
      "Ajouter l'orge (boulgour) et le bouillon.",
      "Laisser mijoter longuement jusqu'à ce que tout soit fondant.",
      "Lier d'un filet de crème et servir bien chaud."
    ],
    ingredients: [
      { id: "boulgour", qte: 0.06, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "celeri", qte: 0.06, unite: "kg" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.03, unite: "l" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_curry_agneau",
    nom: "Curry d'agneau riche au lait de coco",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 90,
    etapes: [
      "Saisir les morceaux d'agneau, réserver.",
      "Faire revenir oignon, ail, gingembre et curry.",
      "Ajouter tomate, lait de coco et remettre la viande.",
      "Mijoter jusqu'à ce que l'agneau soit fondant, servir avec du riz."
    ],
    ingredients: [
      { id: "agneau", qte: 0.15, unite: "kg" },
      { id: "laitcoco", qte: 0.1, unite: "l" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "tomate", qte: 0.06, unite: "kg" },
      { id: "curry", qte: 0.008, unite: "kg" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_navarin_agneau",
    nom: "Navarin d'agneau aux légumes d'hiver",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 110,
    etapes: [
      "Saisir l'agneau fariné, réserver.",
      "Faire revenir oignon, carottes, navets et panais.",
      "Déglacer, ajouter tomate et bouillon, remettre la viande.",
      "Mijoter à couvert jusqu'à tendreté, servir avec des pommes de terre."
    ],
    ingredients: [
      { id: "agneau", qte: 0.15, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "navet", qte: 0.08, unite: "kg" },
      { id: "panais", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "tomate", qte: 0.05, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_poulet_champignons_creme",
    nom: "Cuisses de poulet à la crème et champignons",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 55,
    etapes: [
      "Dorer les cuisses de poulet de tous côtés, réserver.",
      "Faire suer oignon et champignons.",
      "Déglacer au vin blanc, ajouter la crème et remettre le poulet.",
      "Mijoter à couvert jusqu'à cuisson complète, servir avec du riz."
    ],
    ingredients: [
      { id: "cuissepoulet", qte: 0.2, unite: "kg" },
      { id: "champignon", qte: 0.08, unite: "kg" },
      { id: "creme", qte: 0.07, unite: "l" },
      { id: "vinblanc", qte: 0.04, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_coq_au_vin",
    nom: "Coq au vin",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 100,
    etapes: [
      "Dorer les cuisses de poulet, réserver.",
      "Faire revenir lardons, oignon, carottes et champignons.",
      "Déglacer au vin rouge, ajouter bouillon et remettre le poulet.",
      "Mijoter longuement, lier la sauce et servir avec des pommes de terre."
    ],
    ingredients: [
      { id: "cuissepoulet", qte: 0.2, unite: "kg" },
      { id: "vinrouge", qte: 0.1, unite: "l" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "champignon", qte: 0.06, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "farine", qte: 0.01, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_choufleur_bechamel",
    nom: "Gratin de chou-fleur à la béchamel",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 50,
    etapes: [
      "Cuire les bouquets de chou-fleur à l'eau, égoutter.",
      "Préparer une béchamel avec beurre, farine, lait et muscade.",
      "Disposer le chou-fleur dans un plat, napper de béchamel.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "choufleur", qte: 0.3, unite: "kg" },
      { id: "lait", qte: 0.12, unite: "l" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_chou_farci",
    nom: "Chou farci à la viande",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 90,
    etapes: [
      "Blanchir les feuilles de chou vert.",
      "Mélanger bœuf haché, oignon, riz et œuf pour la farce.",
      "Rouler la farce dans les feuilles, disposer dans un plat.",
      "Napper de coulis de tomate et cuire au four à couvert."
    ],
    ingredients: [
      { id: "chouvert", qte: 0.2, unite: "kg" },
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "riz", qte: 0.03, unite: "kg" },
      { id: "oeufs", qte: 0.5, unite: "piece" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_chou_rouge_pommes",
    nom: "Chou rouge braisé aux pommes et saucisse",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 70,
    etapes: [
      "Émincer le chou rouge et le faire suer avec l'oignon.",
      "Ajouter la pomme, un filet de vinaigre et un peu de miel.",
      "Braiser à couvert jusqu'à tendreté.",
      "Rôtir les saucisses et servir sur le chou avec des pommes de terre."
    ],
    ingredients: [
      { id: "chourouge", qte: 0.25, unite: "kg" },
      { id: "saucisse", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "vinaigre", qte: 0.01, unite: "l" },
      { id: "miel", qte: 0.01, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_crozets_saucisse",
    nom: "Gratin de pâtes au diots (spätzli-saucisse)",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Cuire les spätzli à l'eau bouillante salée.",
      "Faire revenir oignon et rondelles de saucisse.",
      "Mélanger avec crème et fromage râpé dans un plat.",
      "Gratiner au four jusqu'à ce que le dessus soit doré."
    ],
    ingredients: [
      { id: "spaetzli", qte: 0.12, unite: "kg" },
      { id: "saucisse", qte: 0.08, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_papet_saucisson",
    nom: "Poireaux et pommes de terre au saucisson vaudois",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 75,
    etapes: [
      "Faire suer les poireaux émincés dans le beurre.",
      "Ajouter les pommes de terre en dés et un peu de vin blanc.",
      "Poser le saucisson dessus et cuire à couvert à petit feu.",
      "Écraser grossièrement les légumes et servir avec le saucisson tranché."
    ],
    ingredients: [
      { id: "poireau", qte: 0.2, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "saucissonvaudois", qte: 0.1, unite: "kg" },
      { id: "vinblanc", qte: 0.03, unite: "l" },
      { id: "beurre", qte: 0.015, unite: "kg" }
    ]
  },
    {
    id: "b_cervelas_gratine",
    nom: "Gratin de cervelas au fromage",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 40,
    etapes: [
      "Fendre les cervelas et les disposer dans un plat.",
      "Étaler oignon émincé et moutarde entre les entailles.",
      "Couvrir de fromage râpé et arroser d'un filet de crème.",
      "Gratiner au four et servir avec des pommes de terre."
    ],
    ingredients: [
      { id: "cervelas", qte: 2, unite: "piece" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "moutarde", qte: 0.01, unite: "kg" },
      { id: "creme", qte: 0.03, unite: "l" },
      { id: "pommesdeterre", qte: 0.25, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_panais_lard",
    nom: "Gratin de panais et pommes de terre au lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 60,
    etapes: [
      "Trancher finement panais et pommes de terre.",
      "Faire dorer les lardons avec l'oignon.",
      "Disposer les légumes en couches, napper de crème et de lait.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "panais", qte: 0.15, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "lait", qte: 0.04, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_goulash",
    nom: "Goulash de bœuf au paprika",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 120,
    etapes: [
      "Saisir les cubes de bœuf, réserver.",
      "Faire fondre beaucoup d'oignons et ajouter le paprika.",
      "Ajouter poivron, tomate, bouillon et remettre la viande.",
      "Mijoter longuement, servir avec des pommes de terre ou des pâtes."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.1, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "paprika", qte: 0.008, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_boeuf_carottes_biere",
    nom: "Carbonnade de bœuf mijotée",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 130,
    etapes: [
      "Saisir les morceaux de bœuf farinés, réserver.",
      "Faire caraméliser une belle quantité d'oignons.",
      "Déglacer, ajouter bouillon, moutarde et pain tartiné de moutarde.",
      "Mijoter longuement jusqu'à obtenir une viande fondante."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.15, unite: "kg" },
      { id: "oignon", qte: 0.1, unite: "kg" },
      { id: "moutarde", qte: 0.015, unite: "kg" },
      { id: "pain", qte: 0.03, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_rosti_appenzeller",
    nom: "Rösti à l'appenzeller et œuf au plat",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Râper les pommes de terre et cuire la galette dans le beurre.",
      "Parsemer d'appenzeller et couvrir pour le faire fondre.",
      "Faire cuire un œuf au plat.",
      "Servir le rösti garni de l'œuf."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "appenzeller", qte: 0.04, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "beurre", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_betterave_chevre",
    nom: "Gratin de betterave et pommes de terre",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Trancher betteraves et pommes de terre précuites.",
      "Alterner en couches dans un plat, assaisonner.",
      "Napper de crème et parsemer de feta émiettée.",
      "Gratiner au four jusqu'à ce que le dessus soit doré."
    ],
    ingredients: [
      { id: "betterave", qte: 0.2, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "feta", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_saumon_gratine_epinards",
    nom: "Saumon gratiné aux épinards à la crème",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Faire tomber les épinards avec ail et un peu de crème.",
      "Déposer les épinards au fond d'un plat, poser le saumon dessus.",
      "Napper de crème, couvrir de fromage râpé.",
      "Gratiner au four et servir avec du riz."
    ],
    ingredients: [
      { id: "saumon", qte: 0.14, unite: "kg" },
      { id: "epinard", qte: 0.15, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "fromagerape", qte: 0.03, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_cabillaud_gratine_poireaux",
    nom: "Cabillaud gratiné à la fondue de poireaux",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 50,
    etapes: [
      "Faire fondre les poireaux dans le beurre avec un peu de crème.",
      "Étaler la fondue au fond d'un plat, poser le cabillaud.",
      "Napper de crème et parsemer de chapelure et de fromage.",
      "Gratiner au four jusqu'à cuisson du poisson."
    ],
    ingredients: [
      { id: "cabillaud", qte: 0.14, unite: "kg" },
      { id: "poireau", qte: 0.15, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "chapelure", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.03, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" }
    ]
  },
    {
    id: "b_polenta_gratinee_gorgonzola",
    nom: "Polenta gratinée au fromage",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Cuire la polenta (semoule de maïs) dans le lait et le bouillon.",
      "Verser dans un plat, laisser prendre puis couper en parts.",
      "Disposer, napper de crème et couvrir de fromage râpé.",
      "Gratiner au four jusqu'à belle croûte dorée."
    ],
    ingredients: [
      { id: "mais", qte: 0.08, unite: "kg" },
      { id: "lait", qte: 0.15, unite: "l" },
      { id: "fromagerape", qte: 0.05, unite: "kg" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_puree_gratinee_saucisse",
    nom: "Purée gratinée à la saucisse et oignons",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Préparer une purée de pommes de terre avec lait et beurre.",
      "Faire dorer oignon et rondelles de saucisse.",
      "Étaler la moitié de la purée, ajouter la garniture, couvrir du reste.",
      "Parsemer de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "saucisse", qte: 0.09, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "fromagerape", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_chili_con_carne",
    nom: "Chili con carne mijoté",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 60,
    etapes: [
      "Faire revenir le bœuf haché avec oignon, ail et poivron.",
      "Ajouter cumin, paprika, tomate et haricots rouges.",
      "Mouiller de bouillon et laisser mijoter longuement.",
      "Servir avec du riz ou du pain."
    ],
    ingredients: [
      { id: "boeufhache", qte: 0.12, unite: "kg" },
      { id: "haricotrouge", qte: 0.08, unite: "kg" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "cumin", qte: 0.004, unite: "kg" },
      { id: "paprika", qte: 0.004, unite: "kg" },
      { id: "riz", qte: 0.07, unite: "kg" }
    ]
  },
    {
    id: "b_dahl_lentilles_epices",
    nom: "Dahl de lentilles corail au lait de coco",
    complexite: 1,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Faire revenir oignon, ail, gingembre et curry.",
      "Ajouter les lentilles, la tomate et le lait de coco.",
      "Mouiller de bouillon et mijoter jusqu'à ce que les lentilles fondent.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "lentilles", qte: 0.09, unite: "kg" },
      { id: "laitcoco", qte: 0.08, unite: "l" },
      { id: "tomate", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "curry", qte: 0.006, unite: "kg" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.07, unite: "kg" }
    ]
  },
    {
    id: "b_pois_chiches_epinards",
    nom: "Mijoté de pois chiches aux épinards",
    complexite: 1,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Faire revenir oignon, ail et cumin.",
      "Ajouter pois chiches, tomate et un peu de bouillon.",
      "Incorporer les épinards et laisser réduire.",
      "Servir avec du pain ou du boulgour."
    ],
    ingredients: [
      { id: "poischiches", qte: 0.1, unite: "kg" },
      { id: "epinard", qte: 0.12, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "cumin", qte: 0.004, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "boulgour", qte: 0.07, unite: "kg" }
    ]
  },
    {
    id: "b_tourte_poulet_champignons",
    nom: "Tourte au poulet et champignons",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 70,
    etapes: [
      "Faire revenir le poulet en dés avec oignon et champignons.",
      "Lier avec un peu de farine, de crème et de bouillon.",
      "Garnir une pâte feuilletée, refermer avec une seconde abaisse.",
      "Dorer à l'œuf et cuire au four jusqu'à ce que la tourte soit dorée."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 1, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "champignon", qte: 0.07, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "farine", qte: 0.01, unite: "kg" },
      { id: "oeufs", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_croute_fromage",
    nom: "Croûte au fromage vaudoise",
    complexite: 1,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 30,
    etapes: [
      "Frotter les tranches de pain d'ail et les imbiber de vin blanc.",
      "Déposer dans un plat, couvrir généreusement de gruyère râpé.",
      "Gratiner au four jusqu'à ce que le fromage soit doré et coulant.",
      "Servir bien chaud, éventuellement avec un œuf au plat."
    ],
    ingredients: [
      { id: "pain", qte: 0.12, unite: "kg" },
      { id: "gruyere", qte: 0.08, unite: "kg" },
      { id: "vinblanc", qte: 0.04, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" }
    ]
  },
    {
    id: "b_malakoff_beignets",
    nom: "Malakoffs (beignets au fromage vaudois)",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Mélanger gruyère râpé, œuf, farine, ail et un peu de vin blanc.",
      "Former des palets et les poser sur des tranches de pain.",
      "Frire ou dorer à la poêle jusqu'à croûte croustillante.",
      "Servir chaud avec une salade verte."
    ],
    ingredients: [
      { id: "gruyere", qte: 0.09, unite: "kg" },
      { id: "pain", qte: 0.08, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "vinblanc", qte: 0.02, unite: "l" },
      { id: "ail", qte: 0.004, unite: "kg" },
      { id: "salade", qte: 0.3, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_epinards_oeufs",
    nom: "Gratin d'épinards aux œufs et béchamel",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Faire tomber les épinards avec ail et oignon.",
      "Préparer une béchamel au lait, beurre et farine.",
      "Disposer épinards et œufs durs, napper de béchamel.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "epinard", qte: 0.2, unite: "kg" },
      { id: "oeufs", qte: 2, unite: "piece" },
      { id: "lait", qte: 0.12, unite: "l" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_choucroute",
    nom: "Soupe de choucroute et lardons",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Faire suer oignon et lardons.",
      "Ajouter la choucroute rincée, les pommes de terre en dés.",
      "Mouiller de bouillon et laisser mijoter.",
      "Lier d'un filet de crème et servir bien chaud."
    ],
    ingredients: [
      { id: "choucroute", qte: 0.15, unite: "kg" },
      { id: "pommesdeterre", qte: 0.12, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.03, unite: "l" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_gnocchi_gorgonzola",
    nom: "Gnocchi gratinés à la crème et fromage",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 35,
    etapes: [
      "Précuire les gnocchi à l'eau bouillante, égoutter.",
      "Faire revenir oignon puis ajouter crème et fromage râpé.",
      "Mélanger les gnocchi à la sauce dans un plat.",
      "Couvrir de fromage et gratiner au four."
    ],
    ingredients: [
      { id: "gnocchi", qte: 0.2, unite: "kg" },
      { id: "creme", qte: 0.07, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_ragout_veau_marrons",
    nom: "Ragoût de veau aux marrons",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 100,
    etapes: [
      "Saisir l'émincé de veau fariné, réserver.",
      "Faire revenir oignon et carottes.",
      "Déglacer au vin blanc, ajouter bouillon, crème et marrons.",
      "Mijoter à couvert jusqu'à tendreté, servir avec des spätzli."
    ],
    ingredients: [
      { id: "veau", qte: 0.15, unite: "kg" },
      { id: "chataigne", qte: 0.05, unite: "kg" },
      { id: "carotte", qte: 0.07, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "vinblanc", qte: 0.04, unite: "l" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "farine", qte: 0.015, unite: "kg" },
      { id: "spaetzli", qte: 0.12, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_ravioles_courge",
    nom: "Gratin de gnocchi à la courge",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Rôtir la courge en cubes puis l'écraser grossièrement.",
      "Précuire les gnocchi et les mélanger à la courge et à la crème.",
      "Verser dans un plat, assaisonner de muscade.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "gnocchi", qte: 0.18, unite: "kg" },
      { id: "potiron", qte: 0.15, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_poule_riz_curry_leger",
    nom: "Émincé de poulet au curry et riz",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Saisir l'émincé de poulet, réserver.",
      "Faire revenir oignon, ail et curry.",
      "Ajouter lait de coco et crème, remettre le poulet.",
      "Laisser mijoter et servir avec du riz."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.14, unite: "kg" },
      { id: "laitcoco", qte: 0.06, unite: "l" },
      { id: "creme", qte: 0.03, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "curry", qte: 0.006, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_macaronis_jambon",
    nom: "Gratin de macaronis au jambon",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Cuire les pâtes al dente.",
      "Préparer une béchamel au lait, beurre et farine.",
      "Mélanger pâtes, jambon en dés et béchamel dans un plat.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "pates", qte: 0.09, unite: "kg" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "lait", qte: 0.12, unite: "l" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_saute_dinde_marrons_choux",
    nom: "Sauté de poulet aux choux de Bruxelles et lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Saisir le poulet en morceaux, réserver.",
      "Faire dorer lardons, oignon et choux de Bruxelles.",
      "Déglacer au bouillon, remettre le poulet et un peu de crème.",
      "Mijoter jusqu'à tendreté et servir avec des pommes de terre."
    ],
    ingredients: [
      { id: "pouletfilet", qte: 0.14, unite: "kg" },
      { id: "brocoli", qte: 0.12, unite: "kg" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_gateau_pdt_appenzeller",
    nom: "Galette de pommes de terre à l'appenzeller",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Râper les pommes de terre et les mélanger à l'œuf et un peu de farine.",
      "Incorporer l'appenzeller râpé et l'oignon.",
      "Cuire en galette dorée dans le beurre des deux côtés.",
      "Servir avec une salade et du fromage blanc aux herbes."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.28, unite: "kg" },
      { id: "appenzeller", qte: 0.04, unite: "kg" },
      { id: "oeufs", qte: 1, unite: "piece" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "fromageblanc", qte: 0.05, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_pois_lard",
    nom: "Soupe de pois cassés au lard",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 75,
    etapes: [
      "Faire suer oignon, carottes et lardons.",
      "Ajouter les petits pois, les pommes de terre et le bouillon.",
      "Mijoter longuement jusqu'à ce que tout soit fondant.",
      "Mixer partiellement et servir bien chaud."
    ],
    ingredients: [
      { id: "petitspois", qte: 0.12, unite: "kg" },
      { id: "pommesdeterre", qte: 0.1, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_emince_dinde_champignons",
    nom: "Émincé de veau aux morilles crémées",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Saisir l'émincé de veau, réserver.",
      "Faire suer champignons et oignon dans le beurre.",
      "Déglacer au vin blanc, ajouter une crème généreuse et réduire.",
      "Remettre la viande, réchauffer et servir avec du riz ou des nouilles."
    ],
    ingredients: [
      { id: "veau", qte: 0.14, unite: "kg" },
      { id: "champignon", qte: 0.09, unite: "kg" },
      { id: "creme", qte: 0.08, unite: "l" },
      { id: "vinblanc", qte: 0.04, unite: "l" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "nouilleschin", qte: 0.09, unite: "kg" }
    ]
  },
    {
    id: "b_pot_lentilles_cervelas",
    nom: "Potée de lentilles au cervelas",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Faire revenir oignon, carottes et poireau.",
      "Ajouter les lentilles et le bouillon, mijoter.",
      "Fendre les cervelas et les réchauffer dans la potée.",
      "Servir avec de la moutarde."
    ],
    ingredients: [
      { id: "lentilles", qte: 0.09, unite: "kg" },
      { id: "cervelas", qte: 1, unite: "piece" },
      { id: "carotte", qte: 0.07, unite: "kg" },
      { id: "poireau", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" },
      { id: "moutarde", qte: 0.008, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_poireaux_emmental",
    nom: "Gratin de poireaux à l'emmental",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 50,
    etapes: [
      "Faire fondre les poireaux émincés au beurre.",
      "Préparer une béchamel légère et y mélanger les poireaux.",
      "Verser dans un plat, couvrir d'emmental râpé.",
      "Gratiner au four jusqu'à belle croûte dorée."
    ],
    ingredients: [
      { id: "poireau", qte: 0.25, unite: "kg" },
      { id: "emmental", qte: 0.05, unite: "kg" },
      { id: "lait", qte: 0.1, unite: "l" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.015, unite: "kg" }
    ]
  },
    {
    id: "b_ragout_saucisse_haricots",
    nom: "Ragoût de saucisse aux haricots blancs à la tomate",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Faire revenir oignon, ail et rondelles de saucisse.",
      "Ajouter les haricots, la tomate et un peu de bouillon.",
      "Mijoter jusqu'à ce que la sauce épaississe.",
      "Servir avec du pain grillé."
    ],
    ingredients: [
      { id: "saucisse", qte: 0.1, unite: "kg" },
      { id: "haricotrouge", qte: 0.1, unite: "kg" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pain", qte: 0.05, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_courgettes_ricotta_hiver",
    nom: "Gratin de tortillas au poulet et fromage",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Faire revenir le poulet en dés avec oignon, poivron et paprika.",
      "Garnir les tortillas de ce mélange et les rouler.",
      "Disposer dans un plat, napper de crème et de coulis de tomate.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "tortillas", qte: 2, unite: "piece" },
      { id: "pouletfilet", qte: 0.12, unite: "kg" },
      { id: "poivron", qte: 0.05, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "creme", qte: 0.03, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "paprika", qte: 0.004, unite: "kg" }
    ]
  },
    {
    id: "b_raclette_four_legumes",
    nom: "Raclette au four aux légumes d'hiver",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Précuire pommes de terre, carottes et courge en cubes.",
      "Disposer les légumes dans un plat, assaisonner.",
      "Couvrir de tranches de raclette.",
      "Enfourner jusqu'à ce que le fromage soit fondu et doré."
    ],
    ingredients: [
      { id: "raclette", qte: 0.1, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "potiron", qte: 0.1, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_celeri_pomme",
    nom: "Velouté de céleri-rave à la pomme",
    complexite: 1,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 40,
    etapes: [
      "Faire suer oignon et céleri en cubes.",
      "Ajouter la pomme, mouiller de bouillon et cuire jusqu'à tendreté.",
      "Mixer finement et lier à la crème.",
      "Servir avec quelques croûtons."
    ],
    ingredients: [
      { id: "celeri", qte: 0.25, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.04, unite: "l" },
      { id: "pain", qte: 0.03, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_boeuf_stroganoff",
    nom: "Bœuf Stroganoff à la crème",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Saisir vivement les lanières de bœuf, réserver.",
      "Faire suer oignon et champignons.",
      "Déglacer, ajouter moutarde, paprika et crème.",
      "Remettre la viande, réchauffer et servir avec des pâtes ou du riz."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.14, unite: "kg" },
      { id: "champignon", qte: 0.08, unite: "kg" },
      { id: "creme", qte: 0.07, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "moutarde", qte: 0.008, unite: "kg" },
      { id: "paprika", qte: 0.004, unite: "kg" },
      { id: "pates", qte: 0.09, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_pdt_chorizo",
    nom: "Gratin de pommes de terre au chorizo",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 60,
    etapes: [
      "Trancher finement les pommes de terre.",
      "Faire revenir oignon et rondelles de chorizo.",
      "Disposer en couches, napper de crème et de lait.",
      "Couvrir de fromage râpé et gratiner longuement au four."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.3, unite: "kg" },
      { id: "chorizo", qte: 0.05, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_haricots_toscane",
    nom: "Soupe toscane aux haricots et chou",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Faire revenir oignon, carottes, ail et lardons.",
      "Ajouter chou vert, haricots, tomate et bouillon.",
      "Mijoter jusqu'à ce que les légumes soient fondants.",
      "Servir avec du pain grillé frotté d'ail."
    ],
    ingredients: [
      { id: "haricotrouge", qte: 0.08, unite: "kg" },
      { id: "chouvert", qte: 0.1, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "tomate", qte: 0.08, unite: "kg" },
      { id: "lardons", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pain", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_rosti_saumon_creme",
    nom: "Rösti au saumon et crème citronnée",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 45,
    etapes: [
      "Cuire une galette de rösti dorée dans le beurre.",
      "Émietter le saumon poêlé ou cuit.",
      "Préparer une crème citronnée avec un filet de citron.",
      "Dresser le rösti garni de saumon et nappé de crème."
    ],
    ingredients: [
      { id: "pommesdeterre", qte: 0.28, unite: "kg" },
      { id: "saumon", qte: 0.12, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "citron", qte: 0.5, unite: "piece" },
      { id: "beurre", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "b_curry_legumes_hiver_coco",
    nom: "Curry de légumes d'hiver au lait de coco",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Faire revenir oignon, ail, gingembre et curry.",
      "Ajouter courge, carottes et chou-fleur en morceaux.",
      "Verser le lait de coco et un peu de bouillon, mijoter.",
      "Servir avec du riz."
    ],
    ingredients: [
      { id: "potiron", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "choufleur", qte: 0.1, unite: "kg" },
      { id: "laitcoco", qte: 0.08, unite: "l" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "curry", qte: 0.006, unite: "kg" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "riz", qte: 0.08, unite: "kg" }
    ]
  },
    {
    id: "b_choufleur_gratine_curry",
    nom: "Chou-fleur rôti gratiné au curry",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 50,
    etapes: [
      "Rôtir les bouquets de chou-fleur à l'huile et au curry.",
      "Disposer dans un plat, napper de crème parfumée.",
      "Couvrir de fromage râpé.",
      "Gratiner au four jusqu'à belle coloration."
    ],
    ingredients: [
      { id: "choufleur", qte: 0.3, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "curry", qte: 0.006, unite: "kg" },
      { id: "huile", qte: 0.01, unite: "l" }
    ]
  },
    {
    id: "b_boulettes_sauce_tomate",
    nom: "Boulettes de bœuf à la sauce tomate",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 50,
    etapes: [
      "Mélanger bœuf haché, œuf, chapelure et oignon, former des boulettes.",
      "Les dorer à la poêle, réserver.",
      "Préparer une sauce tomate à l'ail, y pocher les boulettes.",
      "Servir avec des pâtes et du parmesan."
    ],
    ingredients: [
      { id: "boeufhache", qte: 0.13, unite: "kg" },
      { id: "tomate", qte: 0.12, unite: "kg" },
      { id: "oeufs", qte: 0.5, unite: "piece" },
      { id: "chapelure", qte: 0.02, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pates", qte: 0.09, unite: "kg" },
      { id: "parmesan", qte: 0.02, unite: "kg" }
    ]
  },
    {
    id: "b_saucisses_puree_celeri",
    nom: "Saucisses et purée de céleri à la moutarde",
    complexite: 1,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Cuire céleri et pommes de terre puis les écraser en purée avec lait et beurre.",
      "Incorporer une pointe de moutarde à la purée.",
      "Rôtir les saucisses à la poêle.",
      "Servir les saucisses sur la purée avec un peu de jus."
    ],
    ingredients: [
      { id: "saucisse", qte: 0.12, unite: "kg" },
      { id: "celeri", qte: 0.15, unite: "kg" },
      { id: "pommesdeterre", qte: 0.15, unite: "kg" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "beurre", qte: 0.015, unite: "kg" },
      { id: "moutarde", qte: 0.008, unite: "kg" }
    ]
  },
    {
    id: "b_lasagnes_courge_epinards",
    nom: "Lasagnes à la courge et aux épinards",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 75,
    etapes: [
      "Rôtir la courge et l'écraser, faire tomber les épinards.",
      "Préparer une béchamel au lait, beurre et farine.",
      "Alterner pâtes, courge, épinards et béchamel dans un plat.",
      "Couvrir de fromage râpé et cuire au four jusqu'à gratiner."
    ],
    ingredients: [
      { id: "pates", qte: 0.08, unite: "kg" },
      { id: "potiron", qte: 0.15, unite: "kg" },
      { id: "epinard", qte: 0.1, unite: "kg" },
      { id: "lait", qte: 0.1, unite: "l" },
      { id: "beurre", qte: 0.02, unite: "kg" },
      { id: "farine", qte: 0.02, unite: "kg" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_panais_curry",
    nom: "Velouté de panais au curry",
    complexite: 1,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 40,
    etapes: [
      "Faire suer oignon et panais en morceaux.",
      "Saupoudrer de curry, mouiller de bouillon et cuire jusqu'à tendreté.",
      "Mixer finement et lier au lait de coco.",
      "Servir bien chaud avec un tour de poivre."
    ],
    ingredients: [
      { id: "panais", qte: 0.25, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "laitcoco", qte: 0.05, unite: "l" },
      { id: "curry", qte: 0.005, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_navets_jambon",
    nom: "Gratin de navets au jambon",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Trancher et précuire les navets et pommes de terre.",
      "Disposer en couches avec le jambon en dés.",
      "Napper de crème assaisonnée à la muscade.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "navet", qte: 0.18, unite: "kg" },
      { id: "pommesdeterre", qte: 0.15, unite: "kg" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "creme", qte: 0.07, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_polenta_saucisse_tomate",
    nom: "Polenta crémeuse et saucisse à la tomate",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 50,
    etapes: [
      "Cuire la polenta (semoule de maïs) dans lait et bouillon jusqu'à crémeux.",
      "Incorporer un peu de fromage râpé.",
      "Faire mijoter les rondelles de saucisse dans une sauce tomate à l'oignon.",
      "Servir la polenta nappée de la saucisse à la tomate."
    ],
    ingredients: [
      { id: "mais", qte: 0.08, unite: "kg" },
      { id: "saucisse", qte: 0.09, unite: "kg" },
      { id: "tomate", qte: 0.1, unite: "kg" },
      { id: "lait", qte: 0.1, unite: "l" },
      { id: "fromagerape", qte: 0.03, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_quinoa_legumes",
    nom: "Gratin de quinoa aux légumes d'automne",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 55,
    etapes: [
      "Cuire le quinoa dans le bouillon.",
      "Rôtir courge, carottes et oignon en dés.",
      "Mélanger quinoa, légumes et crème dans un plat.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "quinoa", qte: 0.08, unite: "kg" },
      { id: "potiron", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_poulet_paprika_hongrois",
    nom: "Poulet au paprika à la crème (paprikash)",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 55,
    etapes: [
      "Dorer les cuisses de poulet, réserver.",
      "Faire fondre oignon et poivron, ajouter le paprika.",
      "Ajouter tomate et bouillon, remettre le poulet et mijoter.",
      "Lier à la crème et servir avec des spätzli."
    ],
    ingredients: [
      { id: "cuissepoulet", qte: 0.2, unite: "kg" },
      { id: "poivron", qte: 0.06, unite: "kg" },
      { id: "tomate", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" },
      { id: "paprika", qte: 0.008, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "spaetzli", qte: 0.12, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_chou_vert_lard",
    nom: "Gratin de chou vert au lard et pommes de terre",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 60,
    etapes: [
      "Blanchir le chou vert émincé.",
      "Faire dorer lardons et oignon.",
      "Alterner chou, pommes de terre précuites et garniture dans un plat.",
      "Napper de crème, couvrir de fromage et gratiner au four."
    ],
    ingredients: [
      { id: "chouvert", qte: 0.2, unite: "kg" },
      { id: "pommesdeterre", qte: 0.15, unite: "kg" },
      { id: "lardons", qte: 0.04, unite: "kg" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" }
    ]
  },
    {
    id: "b_ragout_porc_pruneaux",
    nom: "Ragoût de porc aux pruneaux et légumes racines",
    complexite: 3,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 110,
    etapes: [
      "Saisir les morceaux de porc, réserver.",
      "Faire revenir oignon, carottes et panais.",
      "Déglacer au vin rouge, ajouter bouillon et miel, remettre la viande.",
      "Mijoter longuement et servir avec des pommes de terre."
    ],
    ingredients: [
      { id: "porcragout", qte: 0.15, unite: "kg" },
      { id: "carotte", qte: 0.08, unite: "kg" },
      { id: "panais", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.04, unite: "kg" },
      { id: "vinrouge", qte: 0.06, unite: "l" },
      { id: "miel", qte: 0.008, unite: "kg" },
      { id: "pommesdeterre", qte: 0.2, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_gratin_riz_jambon_champignons",
    nom: "Gratin de riz au jambon et champignons",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 55,
    etapes: [
      "Cuire le riz dans le bouillon.",
      "Faire suer champignons, oignon et jambon en dés.",
      "Mélanger riz, garniture et crème dans un plat.",
      "Couvrir de fromage râpé et gratiner au four."
    ],
    ingredients: [
      { id: "riz", qte: 0.08, unite: "kg" },
      { id: "jambon", qte: 0.06, unite: "kg" },
      { id: "champignon", qte: 0.06, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "fromagerape", qte: 0.04, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "boncube", qte: 0.5, unite: "piece" }
    ]
  },
    {
    id: "b_fondue_appenzeller",
    nom: "Fondue à l'appenzeller et gruyère",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 35,
    etapes: [
      "Frotter le caquelon d'ail, verser le vin blanc et chauffer.",
      "Ajouter gruyère et appenzeller râpés en remuant.",
      "Lier au kirsch délayé, poivrer et muscader.",
      "Servir avec du pain en dés."
    ],
    ingredients: [
      { id: "gruyere", qte: 0.1, unite: "kg" },
      { id: "appenzeller", qte: 0.1, unite: "kg" },
      { id: "vinblanc", qte: 0.08, unite: "l" },
      { id: "kirsch", qte: 0.01, unite: "l" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "pain", qte: 0.15, unite: "kg" }
    ]
  },
    {
    id: "b_soupe_chalet_fromage",
    nom: "Soupe du chalet aux légumes et fromage",
    complexite: 2,
    creneaux: ["soir", "midi"],
    saisons: ["automne", "hiver"],
    temps: 55,
    etapes: [
      "Faire suer poireau, carottes, pommes de terre et oignon.",
      "Mouiller de bouillon et de lait, mijoter jusqu'à tendreté.",
      "Mixer partiellement pour un velouté rustique.",
      "Ajouter le gruyère râpé hors du feu et servir."
    ],
    ingredients: [
      { id: "poireau", qte: 0.1, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "pommesdeterre", qte: 0.12, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "lait", qte: 0.05, unite: "l" },
      { id: "gruyere", qte: 0.04, unite: "kg" },
      { id: "boncube", qte: 1, unite: "piece" }
    ]
  },
    {
    id: "b_flammkuchen",
    nom: "Tarte flambée (Flammkuchen) crème et lard",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 40,
    etapes: [
      "Étaler la pâte finement sur une plaque.",
      "Napper de crème assaisonnée.",
      "Parsemer d'oignon émincé et de lardons.",
      "Cuire au four très chaud jusqu'à ce que les bords soient croustillants."
    ],
    ingredients: [
      { id: "pate_feuille", qte: 1, unite: "piece" },
      { id: "creme", qte: 0.06, unite: "l" },
      { id: "lardons", qte: 0.05, unite: "kg" },
      { id: "oignon", qte: 0.05, unite: "kg" }
    ]
  },
    {
    id: "b_gratin_spaetzli_appenzeller",
    nom: "Spätzli gratinés à l'appenzeller et oignons frits",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver"],
    temps: 45,
    etapes: [
      "Cuire les spätzli à l'eau bouillante salée.",
      "Faire frire l'oignon émincé jusqu'à ce qu'il soit croustillant.",
      "Mélanger spätzli, crème et appenzeller râpé dans un plat.",
      "Gratiner au four et garnir d'oignons frits."
    ],
    ingredients: [
      { id: "spaetzli", qte: 0.14, unite: "kg" },
      { id: "appenzeller", qte: 0.05, unite: "kg" },
      { id: "creme", qte: 0.05, unite: "l" },
      { id: "oignon", qte: 0.06, unite: "kg" }
    ]
  },
    {
    id: "b_saute_boeuf_choux",
    nom: "Sauté de bœuf aux choux et sauce soja",
    complexite: 2,
    creneaux: ["soir"],
    saisons: ["automne", "hiver", "printemps"],
    temps: 35,
    etapes: [
      "Saisir vivement les lanières de bœuf, réserver.",
      "Faire sauter chou vert, carottes et oignon au wok.",
      "Ajouter ail, gingembre et sauce soja.",
      "Remettre le bœuf, réchauffer et servir avec des nouilles chinoises."
    ],
    ingredients: [
      { id: "boeufragout", qte: 0.13, unite: "kg" },
      { id: "chouvert", qte: 0.12, unite: "kg" },
      { id: "carotte", qte: 0.06, unite: "kg" },
      { id: "oignon", qte: 0.03, unite: "kg" },
      { id: "saucesoja", qte: 0.02, unite: "l" },
      { id: "gingembre", qte: 0.005, unite: "kg" },
      { id: "ail", qte: 0.005, unite: "kg" },
      { id: "nouilleschin", qte: 0.09, unite: "kg" }
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
