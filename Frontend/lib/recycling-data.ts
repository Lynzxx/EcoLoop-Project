// Shared types + reference data for EcoLoop.
// The recyclability verdict shape is also what the AI image/chat endpoints return,
// so the UI can render results identically regardless of source.

export type Verdict = "recyclable" | "not-recyclable" | "conditional" | "unknown"

export interface RecyclingResult {
  /** Short label of the detected item, e.g. "Plastic bottle". */
  item: string
  /** Material category, e.g. "Plastic", "Paper", "Glass", "Metal". */
  category: string
  verdict: Verdict
  /** Model confidence 0-100. */
  confidence: number
  /** One-line plain-English summary. */
  summary: string
  /** Actionable preparation steps before recycling (or disposal). */
  steps: string[]
  /** Which bin / stream it belongs to in Singapore. */
  binType: string
}

export const VERDICT_META: Record<
  Verdict,
  { label: string; tone: "good" | "bad" | "warn" | "neutral" }
> = {
  recyclable: { label: "Recyclable", tone: "good" },
  "not-recyclable": { label: "Not recyclable", tone: "bad" },
  conditional: { label: "Recyclable if prepared", tone: "warn" },
  unknown: { label: "Needs a closer look", tone: "neutral" },
}

export interface GuideCategory {
  id: string
  name: string
  blurb: string
  accepted: string[]
  rejected: string[]
}

// Singapore Blue Bin recycling guidance (NEA "Recycle Right" categories).
export const GUIDE: GuideCategory[] = [
  {
    id: "paper",
    name: "Paper & Cardboard",
    blurb: "One of the easiest materials to recycle — keep it clean and dry.",
    accepted: [
      "Newspapers, magazines, flyers",
      "Cardboard boxes (flattened)",
      "Office paper, envelopes",
      "Paper bags",
    ],
    rejected: [
      "Tissue paper & paper towels",
      "Food-soiled paper (e.g. pizza boxes)",
      "Waxed or laminated paper",
      "Disposable cups with plastic lining",
    ],
  },
  {
    id: "plastic",
    name: "Plastic",
    blurb: "Rinse out food and drink residue before binning.",
    accepted: [
      "Drink bottles (PET)",
      "Detergent & shampoo bottles (HDPE)",
      "Clean plastic containers",
      "Plastic bags (clean, bagged together)",
    ],
    rejected: [
      "Styrofoam / polystyrene",
      "Cling wrap",
      "Plastic with heavy food residue",
      "Toothpaste tubes",
    ],
  },
  {
    id: "glass",
    name: "Glass",
    blurb: "Empty and rinse. Remove caps and lids.",
    accepted: [
      "Drink bottles",
      "Glass jars",
      "Cosmetic glass containers",
    ],
    rejected: [
      "Broken glass & ceramics",
      "Mirrors & window glass",
      "Light bulbs",
      "Pyrex / heat-treated glass",
    ],
  },
  {
    id: "metal",
    name: "Metal",
    blurb: "Rinse cans and tins before recycling.",
    accepted: [
      "Drink & food cans",
      "Clean aluminium foil & trays",
      "Metal tins",
      "Aerosol cans (fully empty)",
    ],
    rejected: [
      "Cans with food residue",
      "Paint or chemical tins",
      "Batteries (e-waste)",
      "Gas canisters",
    ],
  },
]

// ---- Singapore recycling bin locations ----
// Sample dataset modelled on the OneMap / Data.gov.sg "Recycling Bins" schema
// (name, type, lat, lng, address). Swap this array for a live OneMap API fetch
// to go to production.
export type BinType = "Blue Bin" | "E-Waste" | "Cash-for-Trash" | "Textile"

export interface RecyclingBin {
  id: string
  name: string
  type: BinType
  lat: number
  lng: number
  address: string
  region: string
}

export const SINGAPORE_BINS: RecyclingBin[] = [
  {
    id: "bin-001",
    name: "Tampines Hub Recycling Point",
    type: "Blue Bin",
    lat: 1.3527,
    lng: 103.9407,
    address: "1 Tampines Walk, Singapore 528523",
    region: "East",
  },
  {
    id: "bin-002",
    name: "Jurong East MRT Blue Bin",
    type: "Blue Bin",
    lat: 1.3331,
    lng: 103.7422,
    address: "10 Jurong East Street 12, Singapore 609690",
    region: "West",
  },
  {
    id: "bin-003",
    name: "Ang Mo Kio Hub E-Waste Point",
    type: "E-Waste",
    lat: 1.3691,
    lng: 103.8485,
    address: "53 Ang Mo Kio Ave 3, Singapore 569933",
    region: "North-East",
  },
  {
    id: "bin-004",
    name: "VivoCity Cash-for-Trash",
    type: "Cash-for-Trash",
    lat: 1.2643,
    lng: 103.8222,
    address: "1 HarbourFront Walk, Singapore 098585",
    region: "Central",
  },
  {
    id: "bin-005",
    name: "Woodlands Civic Centre Blue Bin",
    type: "Blue Bin",
    lat: 1.4361,
    lng: 103.7864,
    address: "900 South Woodlands Dr, Singapore 730900",
    region: "North",
  },
  {
    id: "bin-006",
    name: "Bishan Community Club Textile Bin",
    type: "Textile",
    lat: 1.3508,
    lng: 103.848,
    address: "51 Bishan St 13, Singapore 579799",
    region: "Central",
  },
  {
    id: "bin-007",
    name: "Bedok Mall Recycling Point",
    type: "Blue Bin",
    lat: 1.3252,
    lng: 103.9295,
    address: "311 New Upper Changi Rd, Singapore 467360",
    region: "East",
  },
  {
    id: "bin-008",
    name: "Clementi Mall E-Waste Bin",
    type: "E-Waste",
    lat: 1.3151,
    lng: 103.7644,
    address: "3155 Commonwealth Ave W, Singapore 129588",
    region: "West",
  },
  {
    id: "bin-009",
    name: "Toa Payoh HDB Hub Blue Bin",
    type: "Blue Bin",
    lat: 1.3327,
    lng: 103.8474,
    address: "480 Toa Payoh Lor 6, Singapore 310480",
    region: "Central",
  },
  {
    id: "bin-010",
    name: "Punggol Waterway Point Textile Bin",
    type: "Textile",
    lat: 1.4052,
    lng: 103.9023,
    address: "83 Punggol Central, Singapore 828761",
    region: "North-East",
  },
  {
    id: "bin-011",
    name: "Orchard ION Cash-for-Trash",
    type: "Cash-for-Trash",
    lat: 1.3041,
    lng: 103.8318,
    address: "2 Orchard Turn, Singapore 238801",
    region: "Central",
  },
  {
    id: "bin-012",
    name: "Sengkang Compass One Blue Bin",
    type: "Blue Bin",
    lat: 1.3916,
    lng: 103.8952,
    address: "1 Sengkang Square, Singapore 545078",
    region: "North-East",
  },
]

export const BIN_TYPE_META: Record<BinType, { color: string; description: string }> = {
  "Blue Bin": {
    color: "#2563eb",
    description: "General commingled recyclables — paper, plastic, glass, metal.",
  },
  "E-Waste": {
    color: "#16a34a",
    description: "Electronics, batteries, bulbs, ICT equipment.",
  },
  "Cash-for-Trash": {
    color: "#d97706",
    description: "Trade in recyclables by weight for cash or rewards.",
  },
  Textile: {
    color: "#9333ea",
    description: "Clothes, shoes and fabric for reuse and recycling.",
  },
}
