const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://vutrltrytsdbzvivyqth.supabase.co',
  'sb_publishable_6ngR6XKxH9GWY2PO_A1Xmw_r21ODGqo'
)

const sites = [
  // FRANCE - MÉDITERRANÉE
  { name: "Épave du Rubis", type: "Épave", lat: 43.4167, lng: 6.9333, depth_max: 42, description: "Sous-marin français de la WWII", status: "validated" },
  { name: "Calanque de Sormiou", type: "Récif", lat: 43.2100, lng: 5.4200, depth_max: 20, description: "Magnifique calanque marseillaise", status: "validated" },
  { name: "Île du Frioul", type: "Récif", lat: 43.2750, lng: 5.3000, depth_max: 25, description: "Archipel au large de Marseille", status: "validated" },
  { name: "Cap Roux", type: "Récif", lat: 43.4333, lng: 6.9000, depth_max: 35, description: "Tombant spectaculaire", status: "validated" },
  { name: "Épave Donator", type: "Épave", lat: 43.5167, lng: 7.0500, depth_max: 38, description: "Cargo grec coulé en 1945", status: "validated" },
  { name: "Grotte à Corail", type: "Grotte", lat: 43.1800, lng: 5.5000, depth_max: 18, description: "Grotte riche en corail rouge", status: "validated" },
  { name: "Île de Porquerolles", type: "Récif", lat: 42.9833, lng: 6.2167, depth_max: 30, description: "Eaux cristallines préservées", status: "validated" },
  { name: "Cap Sicié", type: "Récif", lat: 43.0500, lng: 5.8667, depth_max: 40, description: "Faune méditerranéenne abondante", status: "validated" },
  { name: "Épave Américaine", type: "Épave", lat: 43.6000, lng: 7.1000, depth_max: 45, description: "Landing craft américain WWII", status: "validated" },
  { name: "Cassidaigne", type: "Récif", lat: 43.1500, lng: 5.5500, depth_max: 50, description: "Canyon sous-marin exceptionnel", status: "validated" },

  // FRANCE - ATLANTIQUE
  { name: "Île de Groix", type: "Récif", lat: 47.6333, lng: -3.4667, depth_max: 25, description: "Faune bretonne remarquable", status: "validated" },
  { name: "Belle-Île-en-Mer", type: "Récif", lat: 47.3167, lng: -3.1833, depth_max: 30, description: "Côtes sauvages atlantiques", status: "validated" },
  { name: "Épave Pierre Colomb", type: "Épave", lat: 47.2833, lng: -2.5167, depth_max: 22, description: "Cargo du XXème siècle", status: "validated" },
  { name: "Presqu'île de Crozon", type: "Récif", lat: 48.2333, lng: -4.5000, depth_max: 28, description: "Site exceptionnel du Finistère", status: "validated" },
  { name: "Épave Pays de Galles", type: "Épave", lat: 48.3667, lng: -4.6000, depth_max: 35, description: "Destroyer britannique", status: "validated" },

  // MER ROUGE
  { name: "Blue Hole Dahab", type: "Gouffre", lat: 28.5720, lng: 34.5310, depth_max: 130, description: "Site légendaire d'Egypte", status: "validated" },
  { name: "Ras Mohammed", type: "Récif", lat: 27.7333, lng: 34.2500, depth_max: 40, description: "Parc national égyptien", status: "validated" },
  { name: "Épave Thistlegorm", type: "Épave", lat: 27.8167, lng: 33.9167, depth_max: 32, description: "Épave emblématique WWII", status: "validated" },
  { name: "Shark Reef Ras Mohammed", type: "Récif", lat: 27.7167, lng: 34.2333, depth_max: 50, description: "Tombant spectaculaire", status: "validated" },
  { name: "Brothers Islands", type: "Récif", lat: 26.2333, lng: 34.8500, depth_max: 60, description: "Requins océaniques fréquents", status: "validated" },
  { name: "Daedalus Reef", type: "Récif", lat: 24.9333, lng: 37.8667, depth_max: 40, description: "Rencontres avec les marteaux", status: "validated" },
  { name: "Rocky Island", type: "Récif", lat: 23.9833, lng: 37.6167, depth_max: 45, description: "Site préservé de mer Rouge", status: "validated" },
  { name: "Zabargad Island", type: "Récif", lat: 23.6167, lng: 36.2000, depth_max: 35, description: "Île isolée aux eaux vierges", status: "validated" },
  { name: "Fury Shoal", type: "Récif", lat: 23.5500, lng: 36.6000, depth_max: 25, description: "Récif corallien intact", status: "validated" },
  { name: "Marsa Alam", type: "Récif", lat: 25.0667, lng: 34.8833, depth_max: 30, description: "Dugongs et tortues marines", status: "validated" },

  // MALDIVES
  { name: "Manta Point Maldives", type: "Récif", lat: 3.9528, lng: 73.3288, depth_max: 25, description: "Station de nettoyage des mantas", status: "validated" },
  { name: "Fish Head Maldives", type: "Récif", lat: 4.1833, lng: 72.9667, depth_max: 30, description: "Requins gris en abondance", status: "validated" },
  { name: "Maaya Thila", type: "Récif", lat: 3.9667, lng: 72.7833, depth_max: 35, description: "Un des meilleurs sites mondiaux", status: "validated" },
  { name: "Hammerhead Point Maldives", type: "Récif", lat: 1.9167, lng: 73.4333, depth_max: 40, description: "Requins marteaux garantis", status: "validated" },
  { name: "Kandooma Thila", type: "Récif", lat: 3.7167, lng: 72.9667, depth_max: 30, description: "Récif coloré exceptionnel", status: "validated" },

  // AUSTRALIE
  { name: "Great Barrier Reef Cairns", type: "Récif", lat: -16.9186, lng: 145.7781, depth_max: 30, description: "Plus grand récif du monde", status: "validated" },
  { name: "Cod Hole Great Barrier", type: "Récif", lat: -14.6833, lng: 145.4667, depth_max: 18, description: "Mérous géants apprivoisés", status: "validated" },
  { name: "SS Yongala Wreck", type: "Épave", lat: -19.3000, lng: 147.6167, depth_max: 29, description: "Meilleure épave d'Australie", status: "validated" },
  { name: "Osprey Reef", type: "Récif", lat: -13.8833, lng: 146.5667, depth_max: 50, description: "Requins gris en bancs", status: "validated" },
  { name: "Navy Pier Exmouth", type: "Récif", lat: -21.9333, lng: 114.1667, depth_max: 12, description: "Shore dive légendaire", status: "validated" },

  // INDONÉSIE
  { name: "Komodo National Park", type: "Récif", lat: -8.5500, lng: 119.5000, depth_max: 40, description: "Manta et requins de récif", status: "validated" },
  { name: "Raja Ampat", type: "Récif", lat: -0.5000, lng: 130.5000, depth_max: 35, description: "Biodiversité record mondiale", status: "validated" },
  { name: "Tulamben USAT Liberty", type: "Épave", lat: -8.2833, lng: 115.6000, depth_max: 29, description: "Épave envahie de coraux", status: "validated" },
  { name: "Bunaken Marine Park", type: "Récif", lat: 1.6167, lng: 124.7500, depth_max: 40, description: "Tombants vertigineux", status: "validated" },
  { name: "Lembeh Strait", type: "Sable", lat: 1.4667, lng: 125.2333, depth_max: 25, description: "Paradis du macro", status: "validated" },
  { name: "Banda Sea", type: "Récif", lat: -4.5000, lng: 129.9000, depth_max: 50, description: "Site vierge exceptionnel", status: "validated" },
  { name: "Wakatobi", type: "Récif", lat: -5.3333, lng: 123.5833, depth_max: 35, description: "Coraux intact préservés", status: "validated" },

  // PHILIPPINES
  { name: "Tubbataha Reef", type: "Récif", lat: 8.9167, lng: 119.8333, depth_max: 40, description: "Patrimoine mondial UNESCO", status: "validated" },
  { name: "Apo Island Philippines", type: "Récif", lat: 9.0667, lng: 123.2667, depth_max: 30, description: "Tortues en abondance", status: "validated" },
  { name: "Malapascua Island", type: "Récif", lat: 11.3167, lng: 124.1333, depth_max: 35, description: "Requins renards à l'aube", status: "validated" },
  { name: "Puerto Galera", type: "Récif", lat: 13.5000, lng: 120.9500, depth_max: 30, description: "Diversité exceptionnelle", status: "validated" },
  { name: "Coron Wrecks", type: "Épave", lat: 12.0000, lng: 120.2000, depth_max: 40, description: "Cimetière de navires japonais", status: "validated" },

  // CARAÏBES
  { name: "Blue Hole Belize", type: "Gouffre", lat: 17.3167, lng: -87.5333, depth_max: 125, description: "Gouffre bleu légendaire", status: "validated" },
  { name: "Jardines de la Reina Cuba", type: "Récif", lat: 20.8500, lng: -78.9500, depth_max: 30, description: "Requins citrons en bancs", status: "validated" },
  { name: "Bloody Bay Wall Cayman", type: "Récif", lat: 19.7500, lng: -80.0833, depth_max: 50, description: "Tombant spectaculaire", status: "validated" },
  { name: "Stingray City Grand Cayman", type: "Sable", lat: 19.3833, lng: -81.3833, depth_max: 5, description: "Raies pastenagues apprivoisées", status: "validated" },
  { name: "Bonaire National Marine Park", type: "Récif", lat: 12.2000, lng: -68.2667, depth_max: 30, description: "Meilleure île plongée Caraïbes", status: "validated" },
  { name: "Saba Marine Park", type: "Récif", lat: 17.6333, lng: -63.2333, depth_max: 40, description: "Île volcanique préservée", status: "validated" },

  // HAWAII
  { name: "Molokini Crater Hawaii", type: "Récif", lat: 20.6333, lng: -156.4967, depth_max: 30, description: "Cratère volcanique sous-marin", status: "validated" },
  { name: "Kona Manta Night Dive", type: "Récif", lat: 19.6333, lng: -156.0333, depth_max: 15, description: "Plongée nocturne aux mantas", status: "validated" },
  { name: "Lanai Cathedrals", type: "Grotte", lat: 20.8333, lng: -156.9167, depth_max: 20, description: "Formations rocheuses mystiques", status: "validated" },

  // GALAPAGOS
  { name: "Darwin Island Galapagos", type: "Récif", lat: 1.6667, lng: -92.0000, depth_max: 40, description: "Requins baleines garantis", status: "validated" },
  { name: "Wolf Island Galapagos", type: "Récif", lat: 1.3833, lng: -91.8167, depth_max: 40, description: "Requin baleine et marteaux", status: "validated" },
  { name: "Gordon Rocks Galapagos", type: "Récif", lat: -0.6333, lng: -90.3833, depth_max: 30, description: "Requins marteaux en bancs", status: "validated" },

  // COSTA RICA
  { name: "Cocos Island Costa Rica", type: "Récif", lat: 5.5333, lng: -87.0667, depth_max: 40, description: "Requins marteaux par centaines", status: "validated" },
  { name: "Bat Islands Costa Rica", type: "Récif", lat: 10.9833, lng: -85.9000, depth_max: 35, description: "Raies aigles et requins taureaux", status: "validated" },

  // ISLANDE
  { name: "Silfra Fissure Iceland", type: "Fissure", lat: 64.2559, lng: -21.1211, depth_max: 63, description: "Entre deux plaques tectoniques", status: "validated" },
  { name: "Davíðsgjá Fissure", type: "Fissure", lat: 64.2500, lng: -21.1333, depth_max: 20, description: "Visibilité infinie", status: "validated" },

  // ÉCOSSE
  { name: "Scapa Flow Orkney", type: "Épave", lat: 58.8667, lng: -3.0000, depth_max: 45, description: "Flotte allemande WWI coulée", status: "validated" },
  { name: "SS Breda Orkney", type: "Épave", lat: 58.9167, lng: -3.1833, depth_max: 30, description: "Cargo historique", status: "validated" },

  // PORTUGAL - AÇORES
  { name: "Azores Blue Shark", type: "Pleine eau", lat: 37.7412, lng: -25.6756, depth_max: 35, description: "Requins bleus et mantas", status: "validated" },
  { name: "Princess Alice Bank Azores", type: "Récif", lat: 37.0000, lng: -35.0000, depth_max: 40, description: "Requins renards géants", status: "validated" },

  // ESPAGNE - CANARIES
  { name: "El Hierro Marine Reserve", type: "Récif", lat: 27.6667, lng: -18.0000, depth_max: 40, description: "Réserve préservée exceptionnelle", status: "validated" },
  { name: "Lanzarote Museo Atlantico", type: "Récif", lat: 28.9167, lng: -13.7667, depth_max: 14, description: "Musée sous-marin unique", status: "validated" },

  // ITALIE
  { name: "Île de Ponza", type: "Récif", lat: 40.9000, lng: 12.9667, depth_max: 30, description: "Eaux cristallines italiennes", status: "validated" },
  { name: "Punta Campanella", type: "Récif", lat: 40.5667, lng: 14.3333, depth_max: 35, description: "Aire marine protégée", status: "validated" },
  { name: "Île d'Ustica", type: "Récif", lat: 38.7167, lng: 13.1833, depth_max: 40, description: "Première réserve marine italienne", status: "validated" },

  // GRÈCE
  { name: "Épave Peristera", type: "Épave", lat: 39.1833, lng: 23.6167, depth_max: 29, description: "Cargo antique grec", status: "validated" },
  { name: "Kavos Reef Corfou", type: "Récif", lat: 39.3667, lng: 20.1833, depth_max: 25, description: "Fauna méditerranéenne", status: "validated" },

  // MALTE
  { name: "Blue Hole Malta", type: "Gouffre", lat: 36.0500, lng: 14.1833, depth_max: 60, description: "Site iconique de Méditerranée", status: "validated" },
  { name: "Épave Rozi Malta", type: "Épave", lat: 35.9500, lng: 14.3333, depth_max: 36, description: "Remorqueur coulé artificiellement", status: "validated" },
  { name: "Épave Um El Faroud", type: "Épave", lat: 35.8167, lng: 14.4333, depth_max: 36, description: "Pétrolier libyen", status: "validated" },

  // CROATIE
  { name: "Kornati Islands", type: "Récif", lat: 43.7667, lng: 15.3333, depth_max: 30, description: "Archipel croate préservé", status: "validated" },
  { name: "Vis Island Croatia", type: "Récif", lat: 43.0500, lng: 16.1667, depth_max: 35, description: "Eaux adriatiques limpides", status: "validated" },

  // AFRIQUE DU SUD
  { name: "Aliwal Shoal South Africa", type: "Récif", lat: -30.2667, lng: 30.8667, depth_max: 30, description: "Requins tigres et zambèzes", status: "validated" },
  { name: "Protea Banks", type: "Récif", lat: -30.6333, lng: 30.4000, depth_max: 35, description: "Requins marteaux en bancs", status: "validated" },
  { name: "Sardine Run South Africa", type: "Pleine eau", lat: -31.0000, lng: 30.2000, depth_max: 20, description: "Migration de sardines spectaculaire", status: "validated" },

  // MOZAMBIQUE
  { name: "Tofo Beach Mozambique", type: "Récif", lat: -23.8667, lng: 35.5333, depth_max: 30, description: "Requins baleines et mantas", status: "validated" },

  // TANZANIE
  { name: "Mafia Island Tanzania", type: "Récif", lat: -7.9167, lng: 39.8333, depth_max: 30, description: "Requins baleines saisonniers", status: "validated" },
  { name: "Zanzibar Mnemba Atoll", type: "Récif", lat: -5.8333, lng: 39.3667, depth_max: 25, description: "Récif corallien préservé", status: "validated" },

  // KENYA
  { name: "Watamu Marine Park Kenya", type: "Récif", lat: -3.3667, lng: 40.0167, depth_max: 20, description: "Parc marin kenyan", status: "validated" },

  // SEYCHELLES
  { name: "Aldabra Atoll Seychelles", type: "Récif", lat: -9.4167, lng: 46.3333, depth_max: 35, description: "Patrimoine mondial UNESCO", status: "validated" },

  // THAÏLANDE
  { name: "Richelieu Rock Thailand", type: "Récif", lat: 9.3500, lng: 97.7833, depth_max: 35, description: "Requins baleines fréquents", status: "validated" },
  { name: "Hin Daeng Thailand", type: "Récif", lat: 7.2667, lng: 99.0833, depth_max: 40, depth_max: 39, description: "Meilleur site de Thaïlande", status: "validated" },
  { name: "Similan Islands", type: "Récif", lat: 8.6500, lng: 97.6333, depth_max: 30, description: "Archipel thaïlandais légendaire", status: "validated" },
  { name: "Koh Tao Thailand", type: "Récif", lat: 10.0833, lng: 99.8333, depth_max: 25, description: "Capitale mondiale de la formation", status: "validated" },

  // MALAISIE
  { name: "Sipadan Island Malaysia", type: "Récif", lat: 4.1167, lng: 118.6333, depth_max: 40, description: "Top 3 mondial des sites", status: "validated" },
  { name: "Mabul Island Malaysia", type: "Sable", lat: 4.2500, lng: 118.6333, depth_max: 25, description: "Paradis du macro", status: "validated" },

  // PAPOUASIE
  { name: "Milne Bay Papua New Guinea", type: "Récif", lat: -10.3000, lng: 150.4667, depth_max: 35, description: "Biodiversité record", status: "validated" },
  { name: "Kimbe Bay PNG", type: "Récif", lat: -5.5500, lng: 150.1500, depth_max: 40, description: "Site vierge exceptionnel", status: "validated" },

  // MEXIQUE
  { name: "Cenote Dos Ojos Mexico", type: "Grotte", lat: 20.3833, lng: -87.3667, depth_max: 30, description: "Réseau de cavernes légendaire", status: "validated" },
  { name: "Cenote Angelita Mexico", type: "Gouffre", lat: 20.2500, lng: -87.4167, depth_max: 60, description: "Rivière de nuages unique", status: "validated" },
  { name: "Isla Mujeres Mexico", type: "Récif", lat: 21.2333, lng: -86.7333, depth_max: 30, description: "Requins baleines saisonniers", status: "validated" },
  { name: "Socorro Islands Mexico", type: "Récif", lat: 18.7833, lng: -110.9667, depth_max: 40, description: "Mantas géantes et orques", status: "validated" },

  // BAHAMAS
  { name: "Tiger Beach Bahamas", type: "Sable", lat: 26.8333, lng: -78.4167, depth_max: 15, description: "Requins tigres garantis", status: "validated" },
  { name: "Dean's Blue Hole Bahamas", type: "Gouffre", lat: 23.1167, lng: -75.0833, depth_max: 202, description: "Plus profond gouffre marin connu", status: "validated" },
  { name: "Andros Barrier Reef", type: "Récif", lat: 24.7000, lng: -77.7833, depth_max: 35, description: "3ème plus grand récif du monde", status: "validated" },

  // NOUVELLE-ZÉLANDE
  { name: "Poor Knights Islands NZ", type: "Récif", lat: -35.4833, lng: 174.7333, depth_max: 40, description: "Meilleur site de NZ", status: "validated" },

  // JAPON
  { name: "Yonaguni Monument Japan", type: "Récif", lat: 24.4500, lng: 122.9333, depth_max: 27, description: "Structure sous-marine mystérieuse", status: "validated" },
  { name: "Okinawa Blue Cave", type: "Grotte", lat: 26.4333, lng: 127.7667, depth_max: 15, description: "Grotte bleue spectaculaire", status: "validated" },

  // RUSSIE
  { name: "Lake Baikal Russia", type: "Lac", lat: 53.5000, lng: 108.1667, depth_max: 40, description: "Plus profond lac du monde", status: "validated" },

  // NORVÈGE
  { name: "Saltstraumen Norway", type: "Courant", lat: 67.2500, lng: 14.6333, depth_max: 30, description: "Plus fort tourbillon du monde", status: "validated" },

  // POLYNÉSIE FRANÇAISE
  { name: "Rangiroa Tiputa Pass", type: "Récif", lat: -14.9667, lng: -147.6500, depth_max: 40, description: "Passage aux dauphins", status: "validated" },
  { name: "Fakarava South Pass", type: "Récif", lat: -16.3667, lng: -145.6500, depth_max: 40, description: "Mur de requins gris", status: "validated" },
  { name: "Moorea French Polynesia", type: "Récif", lat: -17.5333, lng: -149.8333, depth_max: 30, description: "Raies léopard et requins", status: "validated" },

  // NOUVELLE-CALÉDONIE
  { name: "New Caledonia Lagoon", type: "Récif", lat: -22.2758, lng: 166.4580, depth_max: 30, description: "Plus grand lagon du monde", status: "validated" },

  // MOZAMBIQUE - ZANZIBAR
  { name: "Bazaruto Archipelago", type: "Récif", lat: -21.7000, lng: 35.4667, depth_max: 25, description: "Dugongs et tortues", status: "validated" },
]

async function importSites() {
  console.log(`Import de ${sites.length} sites dans Supabase...`)
  let imported = 0
  let errors = 0

  for (const site of sites) {
    const { error } = await supabase
      .from('dive_sites')
      .insert(site)

    if (error) {
      console.log(`Erreur: ${site.name} - ${error.message}`)
      errors++
    } else {
      imported++
      if (imported % 20 === 0) {
        console.log(`${imported} sites importés...`)
      }
    }
  }

  console.log(`✅ Terminé ! ${imported} sites importés, ${errors} erreurs`)
}

importSites()