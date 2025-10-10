import {
  ConversationData,
  Step,
  StepId,
  Topic,
  Initiative,
  InterestArea,
  DeineReflection,
  ContactInfo,
} from "./types";

import HouseIcon from "@mui/icons-material/House";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ParkIcon from "@mui/icons-material/Park";
import EditNoteIcon from "@mui/icons-material/EditNote";

import YardIcon from "@mui/icons-material/Yard";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";

export const STEPS: Step[] = [
  { id: StepId.Welcome, title: "Welcome" },
  { id: StepId.Core, title: "Core Details" },
  { id: StepId.District, title: "Select District" },
  { id: StepId.Topics, title: "Besprochen..." },
  { id: StepId.Initiatives, title: "Initiatives" },
  { id: StepId.Consent, title: "Data Consent" },
  { id: StepId.Reflection, title: "Observer Reflection" },
  { id: StepId.Metrics, title: "Observer Reflection Metrics" },
  { id: StepId.Summary, title: "Summary" },
];

export const INITIAL_CONVERSATION_DATA: ConversationData = {
  mainInterest: "",
  livableCity: "",
  notes: "",
  topicDetails: {},
  districts: [],
  selectedInitiatives: [],
  interestAreas: [],
  interestDistricts: [],
  shareContact: false,
  contactInfo: "",
  isAnonymous: true,
  observerReflection: "",
  surprise: "",
  numPeople: 2,
  duration: 30,
};

// export const INITIAL_CONVERSATION_DATA: ConversationData = {
//     mainInterest: '',
//     livableCity: '',
//     notes: '',
//     topicDetails: {},
//     districts: [],
//     selectedInitiatives: [],
//     interestAreas: [],
//     interestDistricts: [],
//     shareContact: false,
//     isAnonymous: true,
//     saveDialog: true,
//     sendCopy: false,
//     saveMinimal: false,
// };

export const CONTACT_INFO: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
};

export const DEINE_REFLECTION: DeineReflection = {
  observerReflection: "",
  surprise: "",
  numPeople: 2,
  duration: 30,
};

export const BERLIN_DISTRICTS: string[] = [
  "Mitte",
  "Friedrichshain-Kreuzberg",
  "Pankow",
  "Charlottenburg-Wilmersdorf",
  "Spandau",
  "Steglitz-Zehlendorf",
  "Tempelhof-Schöneberg",
  "Neukölln",
  "Treptow-Köpenick",
  "Marzahn-Hellersdorf",
  "Lichtenberg",
  "Reinickendorf",
];

export const TOPIC_DEFINITIONS: Topic[] = [
  {
    id: "wohnen_bauwende",
    name: "Wohnen/Bauwende",
    icon: HouseIcon,
    subGroups: [
      {
        id: "transport",
        name: "Transport",
        options: [
          { id: "costs", name: "Costs" },
          { id: "electric_car", name: "Electric Car" },
          { id: "bicycle", name: "Bicycle" },
          { id: "parking", name: "Parking" },
          { id: "public_transport", name: "Public Transport (ÖPNV)" },
          { id: "health", name: "Health (Accidents, Air Quality)" },
        ],
      },
      {
        id: "building_transition",
        name: "Building Transition",
        options: [
          { id: "concrete", name: "Concrete" },
          { id: "waste", name: "Waste" },
          { id: "costs", name: "Costs" },
          { id: "rent", name: "Rent" },
          { id: "existing_stock", name: "Existing Stock" },
          { id: "community", name: "Community" },
          { id: "quality_of_life", name: "Quality of Life" },
          { id: "displacement", name: "Displacement" },
          { id: "wood", name: "Wood" },
        ],
      },
      {
        id: "heating_transition",
        name: "Heating Transition",
        options: [
          { id: "tech_openness", name: "Openness to Technology" },
          { id: "uneconomical", name: "Economically Unviable" },
          { id: "rent_increase", name: "Rent Increase" },
          { id: "costs", name: "Costs" },
          { id: "monument_protection", name: "Monument Protection" },
          { id: "district_heating", name: "District Heating" },
          { id: "old_building", name: "Old Building" },
          { id: "homeownership", name: "Homeownership" },
        ],
      },
      {
        id: "climate_adaptation",
        name: "Climate Adaptation",
        options: [
          { id: "heat", name: "Heat" },
          { id: "heavy_rain", name: "Heavy Rain" },
          { id: "trees", name: "Trees" },
        ],
      },
    ],
  },
  {
    id: "wohnen_warmewende",
    name: "Wohnen/Wärmewende",
    icon: ThermostatIcon,
    subGroups: [
      {
        id: "heating_systems",
        name: "Heating Systems",
        options: [
          { id: "heat_pump", name: "Heat Pump" },
          { id: "district_heating", name: "District Heating" },
          { id: "solar_thermal", name: "Solar Thermal" },
          { id: "biomass", name: "Biomass" },
          { id: "geothermal", name: "Geothermal" },
        ],
      },
      {
        id: "insulation",
        name: "Insulation & Efficiency",
        options: [
          { id: "wall_insulation", name: "Wall Insulation" },
          { id: "roof_insulation", name: "Roof Insulation" },
          { id: "windows", name: "Energy Efficient Windows" },
          { id: "smart_heating", name: "Smart Heating Controls" },
        ],
      },
    ],
  },
  {
    id: "mobilitat",
    name: "Mobilität",
    icon: DirectionsCarIcon,
    subGroups: [
      {
        id: "public_transport",
        name: "Public Transport",
        options: [
          { id: "bus", name: "Bus" },
          { id: "tram", name: "Tram" },
          { id: "ubahn", name: "U-Bahn" },
          { id: "sbahn", name: "S-Bahn" },
          { id: "accessibility", name: "Accessibility" },
        ],
      },
      {
        id: "cycling",
        name: "Cycling",
        options: [
          { id: "bike_lanes", name: "Bike Lanes" },
          { id: "bike_parking", name: "Bike Parking" },
          { id: "bike_sharing", name: "Bike Sharing" },
          { id: "safety", name: "Cycling Safety" },
        ],
      },
      {
        id: "walking",
        name: "Walking & Pedestrians",
        options: [
          { id: "sidewalks", name: "Sidewalks" },
          { id: "crossings", name: "Safe Crossings" },
          { id: "pedestrian_zones", name: "Pedestrian Zones" },
        ],
      },
    ],
  },
  {
    id: "klimaanpassung",
    name: "Klimaanpassung",
    icon: ParkIcon,
    subGroups: [
      {
        id: "green_spaces",
        name: "Green Spaces",
        options: [
          { id: "parks", name: "Parks" },
          { id: "street_trees", name: "Street Trees" },
          { id: "green_roofs", name: "Green Roofs" },
          { id: "community_gardens", name: "Community Gardens" },
        ],
      },
      {
        id: "water_management",
        name: "Water Management",
        options: [
          { id: "rainwater", name: "Rainwater Collection" },
          { id: "flood_protection", name: "Flood Protection" },
          { id: "water_features", name: "Water Features" },
        ],
      },
      {
        id: "cooling",
        name: "Urban Cooling",
        options: [
          { id: "shade", name: "Shade Structures" },
          { id: "cooling_centers", name: "Cooling Centers" },
          { id: "ventilation", name: "Natural Ventilation" },
        ],
      },
    ],
  },
  {
    id: "sonstiges_notizen",
    name: "Sonstiges/Notizen",
    icon: EditNoteIcon,
    type: "notes",
  },
];

export const INITIATIVES: Initiative[] = [
  {
    id: "garten_projekt",
    name: "Kreuzberg Community Garden",
    description: "A local garden for residents to grow their own food.",
    district: ["Friedrichshain-Kreuzberg"],
    themes: ["Urban Garden", "Food", "Biodiversity"],
    link: "https://prinzessinnengarten-kollektiv.net/",
  },
  {
    id: "repair_cafe_mitte",
    name: "Repair Café Mitte",
    description: "Volunteers help repair broken items to reduce waste.",
    district: ["Mitte"],
    themes: ["Repair Café", "Zero Waste", "Circular Economy"],
    link: "https://kunst-stoffe-berlin.de/",
  },
  {
    id: "neukolln_hilft",
    name: "Neukölln Hilft",
    description: "A mutual aid network for neighbors.",
    district: ["Neukölln"],
    themes: ["Mutual Aid"],
    link: "https://www.neukoelln-hilft.de/",
  },
  {
    id: "pankow_solar",
    name: "Pankow Solar Initiative",
    description: "Promoting solar panel installation on residential buildings.",
    district: ["Pankow"],
    themes: ["Community Energy", "Heating Transition", "Solar Power"],
    link: "https://www.buerger-energie-berlin.de/",
  },
  {
    id: "klima_kiez_charlottenburg",
    name: "Klima Kiez Charlottenburg",
    description: "Local group advocating for climate policies.",
    district: ["Charlottenburg-Wilmersdorf"],
    themes: ["Local Politics", "Climate Adaptation"],
    link: "https://klausenerplatz.de/",
  },
  // Added using Gemini:
  {
    id: "changing_cities",
    name: "Changing Cities e.V.",
    description:
      "An influential NGO that initiated Germany's first mobility law through the 'Volksentscheid Fahrrad' (Bicycle Referendum) and continues to advocate for sustainable, human-centric urban transport.",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Sustainable Mobility", "Cycling", "Local Politics", "Activism"],
    link: "https://changing-cities.org/",
  },
  {
    id: "berliner_tafel",
    name: "Berliner Tafel e.V.",
    description:
      "Collects surplus food from retailers and producers to distribute it to those in need, simultaneously fighting food waste and poverty.",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Food", "Food Waste", "Social Justice"],
    link: "https://www.berliner-tafel.de/",
  },
  {
    id: "berliner_tafel",
    name: "Berliner Tafel e.V.",
    description:
      "Collects surplus food from retailers and producers to distribute it to those in need, simultaneously fighting food waste and poverty.",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Food", "Food Waste", "Social Justice"],
    link: "https://www.berliner-tafel.de/",
  },
  {
    id: "flussbad_berlin",
    name: "Flussbad Berlin",
    description:
      "A project to transform the Spree Canal in central Berlin into a clean public swimming area using a natural, reed-bed filtration system.",
    district: ["Mitte"],
    themes: [
      "Water Quality",
      "Urban Development",
      "Climate Adaptation",
      "Biodiversity",
    ],
    link: "https://www.flussbad-berlin.de/",
  },
  {
    id: "zero_waste_ev",
    name: "Zero Waste e.V.",
    description:
      "An NGO that promotes the zero-waste lifestyle and principles of a circular economy through educational work, community projects, and political advocacy.",
    district: ["Friedrichshain-Kreuzberg", "Berlin-wide"],
    themes: ["Zero Waste", "Circular Economy", "Education"],
    link: "https://zerowasteverein.de/",
  },
  {
    id: "kohleausstieg_berlin",
    name: "Kohleausstieg Berlin",
    description:
      "An alliance of environmental organizations that successfully campaigned for an earlier coal phase-out in Berlin and now pushes for a comprehensive and socially just heat transition.",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Fossil Fuel Divestment", "Community Energy", "Activism"],
    link: "https://www.kohleausstieg-berlin.de/",
  },
  {
    id: "fridays_for_future_berlin",
    name: "Fridays for Future Berlin",
    description:
      "The Berlin chapter of the global, youth-led climate strike movement demanding urgent and effective action on the climate crisis from policymakers.",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Activism", "Youth Movement", "Climate Policy"],
    link: "https://fridaysforfuture.berlin/",
  },
  {
    id: "repair_cafe_klausenerplatz",
    name: "Repair Café Klausenerplatz-Kiez",
    description:
      "A neighborhood initiative in Charlottenburg where volunteers help repair broken items, promoting sustainability and reducing waste.",
    district: ["Charlottenburg-Wilmersdorf"],
    themes: ["Repair Café", "Community", "Circular Economy"],
    link: "http://www.remap-berlin.de/projekte/825",
  },
  {
    id: "repair_cafe_lichterfelde_west",
    name: "RepairCafé Lichterfelde-West",
    description:
      "Volunteers help repair broken items to reduce waste, with a focus on empowering seniors and the local community.",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Zero Waste", "Seniors"],
    link: "https://www.seniorenmitpower.com/repair-cafe/",
  },
  {
    id: "repair_cafe_mekki",
    name: "Repair Café MEKKI",
    description:
      "A community meeting point in Steglitz that hosts a Repair Café to encourage sustainable consumption and community help.",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "https://www.mekki-steglitz.de/repair-cafe/",
  },
  {
    id: "repair_cafe_zehlendorf",
    name: "Repair-Café Zehlendorf",
    description:
      "A service provided by the local seniors' network to fix household items and share knowledge about repairs.",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Community", "Seniors"],
    link: "https://seniorennetz.berlin/de/item/service/repair-cafe-zehlendorf",
  },
  {
    id: "repair_cafe_kliq",
    name: "Repair Café kliQ",
    description:
      "A project focused on climate-friendly and qualitative youth work, which includes a repair café for the community.",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Youth", "Education", "Sustainability"],
    link: "https://kliq-berlin.de/repaircafe/",
  },
  {
    id: "repair_cafe_spandau",
    name: "Repair Café (Klimawerkstatt Spandau)",
    description:
      "Run by the Spandau Climate Workshop, these cafés offer repair help as a practical way to protect the climate and conserve resources.",
    district: ["Spandau"],
    themes: ["Repair Café", "Climate Action", "Circular Economy"],
    link: "https://klimawerkstatt-spandau.de",
  },
  {
    id: "bund_repair_cafe_schoeneberg",
    name: "BUND-Repair Café Schöneberg",
    description:
      "An initiative by BUND Berlin (Friends of the Earth Germany) to promote waste reduction and resource conservation through community repairs.",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Environmentalism", "Activism"],
    link: "http://bund-berlin.de/themen/klima-ressourcen/abfall/repair-cafe",
  },
  {
    id: "rcf_repair_cafe_fahrraeder",
    name: "RCF - Repair Café Fahrräder",
    description:
      "A specialized Repair Café focused on helping people repair their own bicycles, promoting sustainable mobility.",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Cycling", "Sustainable Mobility"],
    link: "http://www.repaircafe.berlin/",
  },
  {
    id: "reparatur_cafe_mariendorf",
    name: "Reparatur-Café Mariendorf",
    description:
      "A community repair event hosted in Mariendorf to help residents fix their belongings and foster a culture of repair.",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Community", "Zero Waste"],
    link: "https://steglitz-museum.de/reparatur-cafe-2",
  },
  {
    id: "faradgang_ev",
    name: "Faradgang e.V.",
    description:
      "A volunteer-run, open workshop for bicycle self-help and repair, promoting cycling culture and technical skills.",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Cycling", "DIY", "Sustainable Mobility"],
    link: "https://faradgang.berlin/de/",
  },
  {
    id: "repair_cafe_schoeneweide",
    name: "Das Repair Café Schöneweide",
    description:
      "Hosted at the Industriesalon, this café connects the industrial history of the area with a modern culture of repair and reuse.",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Local History"],
    link: "http://www.industriesalon.de/angebote/repair-cafe",
  },
  {
    id: "repair_cafe_grenzenlos",
    name: "Repair-Café Grenzenlos",
    description:
      "A repair initiative that brings people together to fix things in a friendly, inclusive café atmosphere.",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Social Justice"],
    link: "https://www.cafe-grenzenlos.de/repair-cafe.html",
  },
  {
    id: "repair_cafe_resi",
    name: "Repair Café Resi | Gemeinschaftswerkstatt im KungerKiez",
    description:
      "A community workshop and resource center in the KungerKiez that hosts regular repair events.",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "DIY", "Community Workshop"],
    link: "https://resi-ressourcen.org/veranstaltungen.html",
  },
  {
    id: "kiezklub_alte_schule",
    name: "KIEZKLUB Alte Schule",
    description:
      "A local community club that offers various activities, including a repair café, for residents of Adlershof.",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Seniors"],
    link: "https://www.berlin.de/ba-treptow-koepenick/politik-und-verwaltung/aemter/amt-fuer-soziales/kiezklubs/kiezklub-alte-schule/",
  },
  {
    id: "repair_cafe_friedrichshain",
    name: "Repair Café Friedrichshain",
    description:
      "A neighborhood Repair Café in Friedrichshain helping residents to mend their broken items and reduce landfill waste.",
    district: ["Friedrichshain-Kreuzberg"],
    themes: ["Repair Café", "Zero Waste", "Community"],
    link: "https://repair-cafe-fhain.jimdosite.com",
  },
  {
    id: "reparatur_initiative_jungfernmuehle",
    name: "Reparatur-Initiative Jungfernmühle",
    description:
      "A local repair initiative in Neukölln focused on community self-help and extending the life of everyday objects.",
    district: ["Neukölln"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "http://initiative-jungfernmühle.de",
  },
  {
    id: "repair_cafe_kiezkiosk_open_tiny",
    name: "Repair Café Kiezkiosk Open Tiny",
    description:
      "Part of the Open Tiny project, this Repair Café operates from a small, local kiosk, making repair accessible to the neighborhood.",
    district: ["Neukölln"],
    themes: ["Repair Café", "Community", "Urban Design"],
    link: "https://opentiny.de",
  },
  {
    id: "rueckenwind_fahrraeder",
    name: "Rückenwind - Fahrräder für Flüchtlinge",
    description:
      "A social project that repairs donated bikes with and for refugees, promoting mobility, integration, and sustainability.",
    district: ["Neukölln"],
    themes: ["Repair Café", "Cycling", "Social Justice", "Integration"],
    link: "http://rueckenwind.berlin",
  },
  {
    id: "bike_kitchen_north_east",
    name: "Bike Kitchen North East - Fahrradselbsthilfewerkstatt",
    description:
      "A DIY workshop in Pankow where people can learn to repair their own bikes with shared tools and volunteer guidance.",
    district: ["Pankow"],
    themes: ["Repair Café", "Cycling", "DIY", "Community Workshop"],
    link: "https://bikekitchennortheast.wordpress.com/",
  },
  {
    id: "repair_cafe_stz_pankow",
    name: "Repair-Café im Stadtteilzentrum Pankow",
    description:
      "A regular repair event at the Pankow district center, providing a space for neighbors to help each other fix things.",
    district: ["Pankow"],
    themes: ["Repair Café", "Community", "Zero Waste"],
    link: "http://stz-pankow.de",
  },
  {
    id: "reparatur_cafe_im_mv",
    name: "Reparatur Café im MV",
    description:
      "A Repair Café in the Märkisches Viertel of Reinickendorf, helping residents to extend the lifespan of their products.",
    district: ["Reinickendorf"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "https://wertstatt-reparaturcafe.de/",
  },
  {
    id: "repair_cafe_bbk_linde",
    name: "Repair Café im BBK-Linde",
    description:
      "A cultural and community center in Reinickendorf that hosts a Repair Café to foster integration and sustainable habits.",
    district: ["Reinickendorf"],
    themes: ["Repair Café", "Community", "Integration"],
    link: "https://salamkulturclub.de/repaircafe/",
  },
];

export const INTEREST_AREAS2: InterestArea[] = [
  {
    id: "Urban Garden",
    name: "Urban Garden",
    description: "Community gardens and community sovereignity",
    icon: YardIcon,
  },
  {
    id: "Repair Café",
    name: "Repair Café",
    description: "Fix things together, reduce waste",
    icon: BuildIcon,
  },
  {
    id: "Climate Education",
    name: "Climate Education",
    description: "Learn and teach climate action",
    icon: SchoolIcon,
  },
  {
    id: "Policy Advocacy",
    name: "Policy Advocacy",
    description: "Influence local and national policies",
    icon: GavelIcon,
  },
  {
    id: "Mutual Aid",
    name: "Mutual Aid",
    description: "Community support and solidarity",
    icon: PeopleIcon,
  },
  {
    id: "Digital Inclusion",
    name: "Digital Inclusion",
    description: "Bridge the digital divide",
    icon: DevicesIcon,
  },
];

export const COLORS = {
  heading: "#333333",
  border_black: "#111111",
  black: "#000000",
  primary_background: "#ffffff",
  white2: "#f4f4f4",
  white3: "#f8f8f8",
  white4: "#f9f9f9",
  white5: "#feffff",
  white6: "#fffffe",
  white7: "#fdffff",
  white8: "#fffeff",
  grey1: "#f7f7f7",
  card_background: "#f5f5f5", // light background
  grey2: "#DDDDDD",
  tint1: "#eee6db",
  primary_green: "#0c8f00",
  green2: "#1ca549",
  green3: "#36ae6e",
  green4: "#4bac6b",
  green5: "#4cac6c",
  green6: "#4cac6b", // heading
  green7: "#4cad6c",
  green8: "#4cac6d",
  green9: "#93c47D",
  button_background_yellow: "#FBBF24",
  button_border_yellow: "#F59E0B",
  primary: "#fc2a1d",
  red1: "#e20912",
  red2: "#dd3333",
  red3: "#dd3332",
  red4: "#fb2a1d",
  title_red: "#fc2b1c", // impactful titles
  red5: "#de3333", // thank you heading
  red6: "#dc3433",
  red7: "#dd3433",
  red8: "#fb9993",
  brown1: "#8b1813",
  brown2: "#7d150e", // steps color
  blue1: "#0c328a",
  blue2: "#2e4c94",
  blue3: "#35348c",
  blue4: "#758bbd",
  blue5: "#9fc5f8",
};
