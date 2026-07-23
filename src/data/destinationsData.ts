// Temporary fallback while you source the real destination photos above.
// Once downloaded, swap these imports for the real files with matching names.
import fallbackImage from "../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";

export type DestinationPlace = {
  name: string;
  image: string;
  tag?: string;
  description?: string;
};

export type QuickFact = {
  label: string;
  value: string;
};


export type Destination = {
  slug: string;
  name: string;
  image: string;

  distanceFromVizag: string;
  distanceKm: number;        // was optional — now required
  driveTime?: string;
  sources?: string[];

  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  tagline?: string;
  costPerDay?: number;
  importantNotes?: string[];
  places?: DestinationPlace[];

  category:                  // was optional — now required
    | "Hill Station"
    | "Nature & Caves"
    | "Beach"
    | "Temple"
    | "Transit"
    | "Heritage & Buddhist Site";

  history?: string;
  highlights?: string[];
  quickFacts?: QuickFact[];
  bestTimeToVisit?: string;
  howToReach?: string;
  funFact?: string;
};

export const destinations: Destination[] = [
  {
    slug: "araku-valley",
    name: "Araku Valley",
    image: fallbackImage, // replace with "../assets/destinations/araku-valley.jpg"
    distanceFromVizag: "120 KM from Vizag",
    distanceKm: 120,
    driveTime: "3 hrs",
    sources: ["AP Tourism", "Wikipedia"],
    category: "Hill Station",
    description:
      "A scenic hill station famous for its coffee plantations, valleys and waterfalls.",
    seoTitle: "Vizag to Araku Valley Taxi | One Day Trip Package | BSH Taxi Services",
    seoDescription:
      "Book Vizag to Araku Valley taxi with BSH Taxi Services. Affordable one-way, round-trip & one-day tour packages covering Borra Caves. AC cabs, 24/7 booking.",
    keywords: [
      "vizag to araku valley taxi",
      "vizag to araku one day trip taxi",
      "araku valley taxi fare from vizag",
      "araku valley cab booking online",
      "visakhapatnam to araku taxi package price",
      "araku valley outstation taxi service",
      "araku coffee plantation tour taxi",
      "vizag araku borra caves combo taxi",
      "araku valley round trip taxi vizag",
      "best taxi service araku valley vizag",
      "innova crysta taxi vizag to araku",
      "araku valley sightseeing cab package",
    ],
    tagline: "Escape to Nature, Enjoy the Journey!",
    costPerDay: 5500,
    history:
      "Tucked into the Eastern Ghats near the Odisha border, Araku Valley has been home to indigenous Adivasi communities for centuries, long before it appeared on any tourist map. Surrounded by the Ananthagiri and Sunkarimetta reserve forests and ringed by the Raktakonda, Chitamogondi, Galikonda and Sunkarimetta hills, the valley sits at an average elevation of roughly 900–1,300 metres. Galikonda is the tallest hill in Andhra Pradesh, giving the valley some of its most dramatic viewpoints.\n\nModern tourism took off in the early 1960s when the South Central Railway carved out the Kirandul–Araku line, an engineering feat of dozens of tunnels and bridges through the Eastern Ghats that turned the journey itself into an attraction. Coffee arrived a little earlier: the Andhra Pradesh Forest Department introduced Arabica cultivation in the 1950s to give tribal farmers a sustainable livelihood, growing the beans in the shade of silver oak trees exactly as it's still done today. In 2007, tribal growers launched Araku Emerald, India's first organic coffee brand from indigenous farmers, which has since earned a GI tag and international recognition.\n\nBeyond coffee, Araku's culture is built around its tribal roots — the Dhimsa folk dance, weekly tribal shandies (markets) selling bamboo crafts and jewellery, and festivals like Itika Pongal keep that heritage very much alive.",
    highlights: [
      "GI-tagged organic Araku Emerald coffee",
      "Home to Andhra Pradesh's tallest hill, Galikonda",
      "One of India's most scenic train routes (58+ tunnels)",
      "Rich Adivasi tribal culture & Dhimsa dance",
    ],
    quickFacts: [
      { label: "Altitude", value: "900–1,300 m" },
      { label: "Best Time", value: "Oct – Mar" },
      { label: "District", value: "Alluri Sitharama Raju" },
      { label: "Known For", value: "Coffee & Tribal Culture" },
    ],
    bestTimeToVisit:
      "October to March, when the hills stay cool and misty and the coffee plantations are at their most fragrant.",
    howToReach:
      "About a 3-hour scenic drive from Vizag through ghat roads, or take the famous Vizag–Araku passenger train that winds through the Eastern Ghats and past Borra Caves.",
    funFact:
      "Araku's coffee story began with the British in the early 1900s, but it was tribal cooperatives who turned it into a globally recognised, organic, GI-tagged brand.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "During standby and ghat roads, the cabin A/C will be turned off to ensure safe driving power.",
    ],
    places: [
      {
        name: "Borra Caves",
        image: fallbackImage,
        description:
          "Million-year-old limestone caves discovered in 1807, roughly 36 km from Araku — a detour well worth the drive.",
      },
      {
        name: "Katika Waterfalls",
        image: fallbackImage,
        tag: "Only Car Parking",
        description: "A cascading forest waterfall, also known locally as Chaparai Falls.",
      },
      {
        name: "Galikonda Viewpoint",
        image: fallbackImage,
        description: "Perched atop Andhra Pradesh's highest hill, with sweeping valley and sunrise views.",
      },
      {
        name: "Coffee Plantation",
        image: fallbackImage,
        description: "Shade-grown Arabica estates on the Ananthagiri hills where pepper vines wind around silver oaks.",
      },
      {
        name: "Coffee Museum",
        image: fallbackImage,
        description: "Traces the journey of Araku coffee from bean to cup, with tastings and handcrafted chocolate.",
      },
      {
        name: "Tribal Museum",
        image: fallbackImage,
        description: "A window into the art, tools and traditions of the Eastern Ghats' indigenous communities.",
      },
      {
        name: "Padmapuram Gardens",
        image: fallbackImage,
        description: "Terraced botanical gardens with tree-top huts and a toy train ride.",
      },
      {
        name: "Damuku View Point",
        image: fallbackImage,
        description: "A quiet lookout over layered valleys, popular for photography.",
      },
      {
        name: "Coffee House",
        image: fallbackImage,
        description: "A cosy stop for a fresh cup of locally grown filter coffee before heading back.",
      },
    ],
  },
  {
    slug: "lambasingi",
    name: "Lambasingi",
    image: fallbackImage, // replace with "../assets/destinations/lambasingi.jpg"
    distanceFromVizag: "100 KM from Vizag",
    category: "Hill Station",
    description:
      "Known as the \"Kashmir of Andhra Pradesh\" for its misty weather and natural beauty.",
    seoTitle: "Vizag to Lambasingi Taxi | Kashmir of Andhra Pradesh | BSH Taxi Services",
    seoDescription:
      "Reliable taxi service from Visakhapatnam to Lambasingi, the Kashmir of Andhra Pradesh. Affordable weekend trip & sightseeing cab packages, booked online 24/7.",

distanceKm: 100,
driveTime: "3 hrs",
      keywords: [
      "vizag to lambasingi taxi",
      "lambasingi cab service from vizag",
      "kashmir of andhra pradesh taxi booking",
      "visakhapatnam to lambasingi taxi fare",
      "lambasingi weekend trip taxi package",
      "vizag to lambasingi one day trip cab",
      "lambasingi araku combo taxi package",
      "lambasingi sunrise view point taxi",
      "outstation cab vizag to lambasingi",
      "lambasingi tour package taxi price",
    ],
    history:
      "Locally known as \"Korra Bayalu\", Lambasingi is a small hamlet in the Chintapalle mandal of the Alluri Sitharama Raju district, perched at around 1,000 metres in the Eastern Ghats. What makes it famous is something almost unheard of in a tropical state: on winter mornings, temperatures here can fall close to, and occasionally below, freezing point — the only place in South India known to see frost-like conditions and, rarely, snowfall.\n\nFor years Lambasingi stayed a quiet farming village, its slopes given over to coffee, pepper, strawberries, dragon fruit and other orchard crops. Word of its unusual winter chill spread mostly by travellers' accounts, and the village has only recently grown into an organised weekend getaway, still refreshingly free of the crowds and commercial sprawl found at bigger hill stations.",
    highlights: [
      "The only place in South India with near-freezing winters",
      "Coffee, pepper, strawberry & dragon fruit farms",
      "Still largely untouched by mass tourism",
      "Spectacular fog-laced sunrise viewpoints",
    ],
    quickFacts: [
      { label: "Altitude", value: "~1,000 m" },
      { label: "Best Time", value: "Nov – Jan" },
      { label: "Mandal", value: "Chintapalle" },
      { label: "Known For", value: "Freezing Winter Mornings" },
    ],
    bestTimeToVisit:
      "November to January is peak season, when early-morning temperatures can drop near 0°C and thick fog blankets the village.",
    howToReach:
      "Around a 3-hour drive from Visakhapatnam via Narsipatnam, or roughly 70 km on from Araku Valley if you're combining both in one trip.",
    funFact:
      "On the coldest winter nights, anything left out in the open can be covered in frost by morning — a rare sight anywhere in coastal Andhra Pradesh.",
  },

  {
    slug: "rushikonda-beach",
    name: "Rushikonda Beach",
    image: fallbackImage, // replace with "../assets/destinations/rushikonda-beach.jpg"
    distanceFromVizag: "15 KM from Vizag",
    category: "Beach",
    description:
      "A beautiful beach with golden sand, clear water and peaceful vibes.",
    seoTitle: "Rushikonda Beach Taxi in Vizag | Local Cab Service | BSH Taxi Services",
    seoDescription:
      "Book a local taxi to Rushikonda Beach in Visakhapatnam. Quick, comfortable rides to Vizag's most popular Blue Flag beach, available 24/7 at affordable fares.",

distanceKm: 12,
driveTime: "25 mins",
      keywords: [
      "vizag rushikonda beach taxi",
      "local taxi to rushikonda beach",
      "visakhapatnam beach cab service",
      "rushikonda beach one day trip taxi",
      "rushikonda beach taxi fare vizag",
      "vizag city sightseeing taxi package",
      "rushikonda kailasagiri combo taxi",
      "cab booking near rushikonda beach",
      "best taxi service vizag beaches",
      "rushikonda beach resort taxi drop",
    ],
    history:
      "\"Rushikonda\" translates to \"Hill of the Sage\" in Telugu, tied to local legend that holds this stretch of coast was once a site where sages performed penance. For most of its history it was a quiet fishing shoreline; recognition as a tourist spot only began building in the 1980s, and the real transformation came in the early 2000s when the Andhra Pradesh Tourism Development Corporation invested in resorts, water-sports infrastructure and restaurants along the shore.\n\nToday Rushikonda is one of only a handful of Indian beaches to hold the international Blue Flag certification, recognising its clean sands and high environmental and safety standards. It has grown into the region's main hub for water sports and adventure tourism, while still keeping the hillside backdrop and comparatively uncrowded feel that first drew visitors in.",
    highlights: [
      "Blue Flag certified — one of only a few beaches in India",
      "Vizag's main hub for water sports and adventure tourism",
      "Name means \"Hill of the Sage\" in Telugu",
      "Close to Kailasagiri and the ISKCON Temple",
    ],
    quickFacts: [
      { label: "Certification", value: "Blue Flag" },
      { label: "Best Time", value: "Oct – Feb" },
      { label: "Activities", value: "Surfing, Kayaking, Jet-Ski" },
      { label: "Distance", value: "8 km from city centre" },
    ],
    bestTimeToVisit: "October to February, for pleasant weather and calmer seas ideal for water sports.",
    howToReach: "Just a 20–25 minute drive from central Vizag along the coastal road.",
    funFact:
      "Rushikonda is one of the very few beaches in India to hold Blue Flag certification — the same international eco-standard used to rate beaches across Europe.",
  },
  {
    slug: "simhachalam-temple",
    name: "Simhachalam Temple",
    image: fallbackImage, // replace with "../assets/destinations/simhachalam-temple.jpg"
    distanceFromVizag: "16 KM from Vizag",
    category: "Temple",
    description:
      "Famous Lord Varaha Lakshmi Narasimha Swamy Temple with rich history.",
    seoTitle: "Simhachalam Temple Taxi Booking in Vizag | BSH Taxi Services",
    seoDescription:
      "Book a taxi to Simhachalam Temple from anywhere in Visakhapatnam. Comfortable local cabs for temple darshan visits, available all day at affordable rates.",

distanceKm: 12,
driveTime: "25 mins",
      keywords: [
      "vizag to simhachalam temple taxi",
      "simhachalam temple cab booking",
      "visakhapatnam temple taxi service",
      "simhachalam darshan taxi booking",
      "simhachalam temple taxi fare vizag",
      "local taxi near simhachalam temple",
      "vizag temple tour taxi package",
      "simhachalam pilgrimage taxi service",
      "one day temple tour taxi vizag",
      "best cab service simhachalam vizag",
    ],
    history:
      "Simhachalam — literally \"Lion's Hill\" — is one of 32 Narasimha temples in Andhra Pradesh and one of the state's most important Vaishnavite pilgrimage sites. According to temple legend, Lord Vishnu appeared here in a unique combined form, Varaha-Narasimha (part boar, part lion), to protect his devotee Prahlada from his father, the demon king Hiranyakashipu. To this day the deity is kept covered year-round in sandalwood paste, resembling a lingam, and is revealed in its true form only once a year during the Chandanotsavam festival on Akshaya Tritiya.\n\nInscriptions on the temple walls date back to 1098 CE, from the reign of the Chola king Kulottunga I, making its documented history nearly a thousand years old. It was later expanded and patronised by the Eastern Ganga dynasty, the Chalukyas, and the Vijayanagara Empire — Krishnadevaraya himself is said to have donated gold and a victory pillar that still stands on the grounds. Architecturally, the temple resembles a fortress, with three enclosing courtyards, five gateways, and a blend of Kalinga, Chalukya and Chola styles culminating in a five-tiered rajagopuram.",
    highlights: [
      "One of 32 Narasimha temples in Andhra Pradesh",
      "Inscriptions dating back to 1098 CE (Chola era)",
      "Deity kept coated in sandalwood paste year-round",
      "Patronised by Chola, Eastern Ganga & Vijayanagara rulers",
    ],
    quickFacts: [
      { label: "Deity", value: "Varaha Lakshmi Narasimha" },
      { label: "Elevation", value: "~300 m" },
      { label: "Oldest Inscription", value: "1098 CE" },
      { label: "Key Festival", value: "Chandanotsavam" },
    ],
    bestTimeToVisit:
      "Year-round, though the Chandanotsavam festival (Akshaya Tritiya, usually April–May) is the most significant time to visit when the deity's true form is revealed.",
    howToReach: "A short 30–40 minute drive from Vizag city, with the temple sitting partway up Simhachalam Hill.",
    funFact:
      "The main idol is smeared in sandalwood paste 364 days of the year — devotees see the deity's actual form for only a few hours, once annually.",
  },
  {
    slug: "kailasagiri",
    name: "Kailasagiri",
    image: fallbackImage, // replace with "../assets/destinations/kailasagiri.jpg"
    distanceFromVizag: "15 KM from Vizag",
    distanceKm: 15,
    driveTime: "25 mins",
    sources: ["VMRDA", "Incredible India"],
    category: "Hill Station",
    description:
      "A hilltop park overlooking the city and the Bay of Bengal, famous for its giant Shiva-Parvati statues and cable car ride.",
    seoTitle: "Kailasagiri Taxi Service in Vizag | Local Cab Booking | BSH Taxi Services",
    seoDescription:
      "Book a local taxi to Kailasagiri hill park in Visakhapatnam. Comfortable rides to Vizag's most-visited viewpoint and ropeway, available all day, affordable fares.",
    keywords: [
      "vizag kailasagiri taxi",
      "local taxi to kailasagiri",
      "visakhapatnam hill park cab service",
      "kailasagiri sightseeing taxi package",
      "kailasagiri ropeway taxi booking",
      "vizag to kailasagiri taxi fare",
      "kailasagiri rushikonda combo taxi",
      "vizag city tour taxi package",
      "best taxi service kailasagiri vizag",
      "one day sightseeing taxi vizag",
    ],
    history:
      "Developed by the Visakhapatnam Urban Development Authority (now VMRDA) as a public hilltop park, Kailasagiri sits at around 1,300 feet and takes its name from its role as a symbolic abode of Lord Shiva — Mount Kailasa. Sprawled over roughly 380 acres, it has grown from a simple viewpoint into one of the city's most-visited attractions, anchored by 40-foot statues of Shiva and Parvati that are visible from several points across Vizag. Andhra Pradesh's first-ever ropeway was built here to ferry visitors up the hillside, and the park has since added a toy train, a floral clock, a children's play area, and a plastic-free policy to protect the greenery.",
    highlights: [
      "40-foot Shiva-Parvati statues visible across the city",
      "Andhra Pradesh's first cable car / ropeway",
      "Toy train loop and floral clock inside the park",
      "Popular paragliding and photography spot",
    ],
    quickFacts: [
      { label: "Altitude", value: "~1,300 ft" },
      { label: "Area", value: "~380 acres" },
      { label: "Ropeway Length", value: "375 m" },
      { label: "Best Time", value: "Oct – Feb" },
    ],
    bestTimeToVisit: "Early morning or just before sunset, when the light over the bay is softest and the crowds thinner.",
    howToReach:
      "About 20–25 minutes from central Vizag by road; you can drive straight to the hilltop or park at the base and take the ropeway up.",
    funFact:
      "The ropeway was Andhra Pradesh's first cable car system, and the hill is officially declared a plastic-free zone to preserve it.",
  },
  {
    slug: "bheemili-beach",
    name: "Bheemili (Bheemunipatnam) Beach",
    image: fallbackImage, // replace with "../assets/destinations/bheemili-beach.jpg"
    distanceFromVizag: "25 KM from Vizag",
    distanceKm: 25,
    driveTime: "45 mins",
    sources: ["Yovizag", "Go2India"],
    category: "Beach",
    description:
      "A quiet colonial-era beach town at the mouth of the Gosthani river, known for its Dutch cemetery, lighthouse, and calmer shoreline.",
    seoTitle: "Vizag to Bheemili Beach Taxi | Coastal Road Trip | BSH Taxi Services",
    seoDescription:
      "Book a taxi from Visakhapatnam to Bheemili Beach along the scenic coastal road. Comfortable cabs to explore Bheemunipatnam's beach and Dutch heritage sites.",
    keywords: [
      "vizag to bheemili beach taxi",
      "bheemunipatnam cab booking online",
      "visakhapatnam coastal road taxi",
      "bheemili beach day trip taxi",
      "bheemili beach taxi fare from vizag",
      "vizag coastal drive taxi package",
      "bheemili dutch cemetery taxi tour",
      "thotlakonda bheemili combo taxi",
      "best taxi service bheemili vizag",
      "one day trip taxi bheemunipatnam",
    ],
    history:
      "Bheemunipatnam, shortened locally to Bheemili, is one of India's oldest municipalities, formally established in 1861. Its history stretches back to the 17th century, when it was a key Dutch East India Company trading post on the Coromandel Coast — the settlement's name appears in colonial records under dozens of spellings, from Bimlipatam to Bimelepatnam. The town still holds a 17th-century Dutch cemetery with around 52 pyramid-shaped tombs, several inscribed in Dutch, along with the ruins of a Dutch fort and colonial-era churches. A lighthouse built in 1868, when Bheemili's port handled cargo bound for Chennai and Kolkata under British rule, still stands on the shore today.",
    highlights: [
      "One of India's oldest municipalities (est. 1861)",
      "17th-century Dutch cemetery with ~52 tombs",
      "Working 1868 lighthouse and old Dutch fort ruins",
      "Calmer, safer waters than Vizag's city beaches",
    ],
    quickFacts: [
      { label: "Founded", value: "17th century (Dutch)" },
      { label: "Municipality Since", value: "1861" },
      { label: "Lighthouse Built", value: "1868" },
      { label: "River", value: "Gosthani" },
    ],
    bestTimeToVisit:
      "Mornings for the old town and cemetery, late afternoon for the beach and sunset over the river mouth.",
    howToReach:
      "A scenic 40–50 minute drive north from Vizag along the coastal road, passing Rushikonda and Thotlakonda on the way.",
    funFact:
      "Some of the Dutch cemetery's gravestones record the actual cause of death of the settler buried beneath — a detail rarely seen on colonial-era graves in India.",
  },
  {
    slug: "thotlakonda",
    name: "Thotlakonda Buddhist Complex",
    image: fallbackImage, // replace with "../assets/destinations/thotlakonda.jpg"
    distanceFromVizag: "15 KM from Vizag",
    distanceKm: 15,
    driveTime: "30 mins",
    sources: ["AP State Archaeology Dept.", "Wanderlog"],
    category: "Heritage & Buddhist Site",
    description:
      "A 2,000-year-old hilltop Buddhist monastery overlooking the Bay of Bengal, with excavated stupas, viharas and rock-cut water tanks.",
    seoTitle: "Thotlakonda Taxi Service from Vizag | Buddhist Heritage Tour | BSH Taxi",
    seoDescription:
      "Book a taxi to Thotlakonda Buddhist Complex from Visakhapatnam. Comfortable cabs to this ancient hilltop monastery overlooking the Bay of Bengal, 24/7 booking.",
    keywords: [
      "vizag to thotlakonda taxi",
      "thotlakonda buddhist complex cab",
      "visakhapatnam heritage site taxi",
      "thotlakonda bavikonda taxi tour",
      "thotlakonda taxi fare from vizag",
      "vizag heritage sightseeing taxi package",
      "thotlakonda bheemili combo taxi",
      "buddhist circuit taxi vizag",
      "best taxi service thotlakonda vizag",
      "coastal heritage tour taxi vizag",
    ],
    history:
      "Thotlakonda takes its name from the Telugu for \"hill of stone wells,\" a reference to the rock-cut cisterns carved into its bedrock to store water for resident monks. The site was rediscovered by the Indian Navy during an aerial survey in the 1970s while scouting locations for a naval base, and excavated by the Andhra Pradesh State Archaeology Department through the 1980s and early '90s. What emerged was a 120-acre Hinayana Buddhist monastic complex dating to roughly the 3rd century BCE–2nd century CE, thought to have housed upward of 100 monks and served as a rest stop for maritime traders along the Bay of Bengal. Excavations turned up Satavahana-era coins, Roman silver coins, terracotta tiles, carved stupa models and Buddha footprint reliefs, pointing to trade links stretching as far as the Roman Empire.",
    highlights: [
      "2,000+ year old monastic complex atop a coastal hill",
      "Excavated stupas, viharas, and a communal dining hall",
      "Roman and Satavahana-era coins found on site",
      "Sweeping, uncrowded views of the Bay of Bengal",
    ],
    quickFacts: [
      { label: "Era", value: "3rd c. BCE – 2nd c. CE" },
      { label: "Discovered", value: "1970s (Indian Navy survey)" },
      { label: "Area", value: "~120 acres" },
      { label: "Nearby Sites", value: "Bavikonda, Pavuralakonda" },
    ],
    bestTimeToVisit: "Early morning or late afternoon, avoiding the midday sun since there's little shade on the open hilltop.",
    howToReach:
      "About 30 minutes from Vizag along the Bheemili coastal road, roughly 6 km past Rushikonda Beach.",
    funFact:
      "No record of royal patronage has ever been found for Thotlakonda — it appears to have thrived purely on the support of local traders and pilgrims.",
  },
  {
    slug: "annavaram-temple",
    name: "Annavaram (Sri Satyanarayana Swamy Temple)",
    image: fallbackImage, // replace with "../assets/destinations/annavaram-temple.jpg"
    distanceFromVizag: "110 KM from Vizag",
    distanceKm: 110,
    driveTime: "2.5 hrs",
    sources: ["Trawell", "Wikipedia"],
    category: "Temple",
    description:
      "One of Andhra Pradesh's most visited pilgrimage sites after Tirupati, dedicated to Sri Veera Venkata Satyanarayana Swamy atop Ratnagiri hill.",
    seoTitle: "Vizag to Annavaram Temple Taxi | Pilgrimage Cab Booking | BSH Taxi",
    seoDescription:
      "Book an outstation taxi from Visakhapatnam to Annavaram Satyanarayana Swamy Temple. Comfortable one-way and round-trip pilgrimage cabs, 24/7 booking.",
    keywords: [
      "vizag to annavaram taxi",
      "annavaram temple cab booking",
      "visakhapatnam to annavaram taxi fare",
      "annavaram satyanarayana vratham taxi",
      "annavaram temple taxi package price",
      "vizag to annavaram one day trip taxi",
      "annavaram pilgrimage taxi service",
      "outstation cab vizag to annavaram",
      "best taxi service annavaram vizag",
      "annavaram round trip taxi booking",
    ],
    history:
      "Annavaram's temple traces back to 1891, when a modest shed was first built on Ratnagiri hill to house the deity's idol, discovered by a local landholder guided, as legend has it, by a dream. The shrine grew through community support into a full temple, was substantially rebuilt in stone during 1933–34, and renovated again in 2011–12. The name itself reflects the belief the temple embodies — \"Anna\" (what is desired) and \"varam\" (boon) — the idea that Sri Satyanarayana grants devotees whatever they ask for. It has since become the second most-visited pilgrimage site in Andhra Pradesh after Tirupati, especially for the Satyanarayana Swamy Vratham, a ritual performed here for family prosperity.",
    highlights: [
      "Second most-visited pilgrimage site in Andhra Pradesh",
      "Home to the famous Satyanarayana Swamy Vratham ritual",
      "13-ft Trimurthi idol of Brahma, Vishnu and Shiva",
      "Located on the Chennai–Kolkata rail line and NH16",
    ],
    quickFacts: [
      { label: "Deity", value: "Sri Satyanarayana Swamy" },
      { label: "Built", value: "1891, rebuilt 1933–34" },
      { label: "Hill", value: "Ratnagiri" },
      { label: "Rank", value: "2nd busiest shrine in AP" },
    ],
    bestTimeToVisit:
      "October to February for cooler travel weather; the Kalyana Mahotsavam in April/May is the temple's biggest festival.",
    howToReach:
      "Roughly a 2.5-hour drive south from Vizag via NH16, or by train — Annavaram railway station is on the main Chennai–Howrah line, just 3 km from the temple.",
    funFact:
      "The temple's daily Annadanam feeds thousands of pilgrims for free, one of the largest such programs in coastal Andhra Pradesh.",
  },
  {
    slug: "vizag-airport",
    name: "Vizag Airport",
    image: fallbackImage, // replace with "../assets/destinations/vizag-airport.jpg"
    distanceFromVizag: "12 KM from Vizag",
    category: "Transit",
    description: "Regular flights across major cities. We provide 24/7 airport transfers.",
    seoTitle: "Vizag Airport Taxi Service | 24/7 Airport Transfers | BSH Taxi Services",
    seoDescription:
      "Book reliable airport taxi service in Visakhapatnam. Punctual pickup and drop to Vizag Airport (VTZ), available 24/7 with professional drivers, fixed fares.",

distanceKm: 12,
driveTime: "25 mins",
      keywords: [
      "vizag airport taxi",
      "visakhapatnam airport transfer taxi",
      "airport taxi booking vizag",
      "vizag airport pickup drop taxi",
      "24/7 airport cab service visakhapatnam",
      "vtz airport taxi fare",
      "vizag airport taxi online booking",
      "cheap airport cab visakhapatnam",
      "vizag airport to city taxi",
      "prepaid taxi vizag airport",
    ],
    history:
      "Visakhapatnam Airport (IATA: VTZ) operates as a civil enclave inside INS Dega, an Indian Navy air station, reflecting the city's long-standing role as home to the Eastern Naval Command. Civilian flights began modestly in 1981 with a single daily service on a short 1,800-metre runway.\n\nThe real transformation came in the 2000s: a new 10,500-foot runway capable of handling wide-body aircraft was inaugurated in June 2007, night-landing capability followed soon after, and a modern integrated terminal with aerobridges opened in March 2009. These upgrades earned the airport international status, with direct flights launched to Dubai, Singapore and Kuala Lumpur. It has run 24-hour operations since 2014 and even added a 2-megawatt solar power plant in 2016 to lower its carbon footprint — reflecting Visakhapatnam's growth into a major industrial, IT and port city.",
    highlights: [
      "Civil enclave within the Indian Navy's INS Dega airbase",
      "International flights to Dubai, Singapore & Kuala Lumpur",
      "24-hour operations since 2014",
      "Powered in part by a 2 MW solar plant since 2016",
    ],
    quickFacts: [
      { label: "IATA Code", value: "VTZ" },
      { label: "Civilian Ops Since", value: "1981" },
      { label: "Runway", value: "10,500 ft (since 2007)" },
      { label: "Status", value: "International, 24×7" },
    ],
    howToReach:
      "Around 12 km from the city centre, roughly a 25–30 minute drive depending on traffic — we track your flight status for pickups so you're never left waiting.",
    funFact:
      "Vizag Airport shares its runway with the Indian Navy's INS Dega — one of only a handful of airports in India where civilian and naval aviation operate side by side.",
  },
];