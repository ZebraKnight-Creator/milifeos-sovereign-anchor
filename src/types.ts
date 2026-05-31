/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DigitalChannel {
  id: string;
  provider: 'email' | 'outlook' | 'wordpress' | 'firebase' | 'linkedin' | 'facebook' | 'x' | 'instagram' | 'slack' | 'reddit' | 'discord' | 'github' | 'spaces' | 'matrix' | 'website' | 'other';
  handle: string;
  label: string;
}

export interface AnchorState {
  currentRegion: 'ZA' | 'EU' | 'US' | 'LATAM';
  selectedCountry?: string;
  moniker: string;
  realName: string;
  bio: string;
  quote: string;
  pillars: string;
  location: string;
  gps: string;
  merchantKey: string;
  googleWebhook: string;
  googleAppsScriptUrl: string;
  digitalScatter: DigitalChannel[];
  selectedTier: 'Free Basic' | 'Business' | 'Company' | 'Enterprise';
  upfrontPaid: number;
  language?: 'en' | 'xh' | 'zu' | 'af' | 'sn' | 'nso' | 'st' | 'tn' | 'ts' | 've' | 'ss';
  classification?: 'b2b' | 'services';
  selectedTrades?: string[];
}

export const INITIAL_ANCHOR_STATE: AnchorState = {
  currentRegion: 'ZA',
  selectedCountry: 'South Africa',
  moniker: 'sipho',
  realName: 'Sipho Khumalo',
  bio: 'Gathering fragmented code, community forums, emails, and networks into a single sovereign card. Reclaiming my digital life and local mesh operations.',
  quote: 'Living cooperative mesh architect & builder',
  pillars: 'Permaculture, Open Source, Sovereign Admin',
  location: 'Cape Town, WC',
  gps: '-33.9167° S, 18.4233° E',
  merchantKey: 'yoco_sipho_abundance',
  googleWebhook: 'https://chat.googleapis.com/v1/spaces/...',
  googleAppsScriptUrl: '',
  digitalScatter: [
    { id: '1', provider: 'email', handle: 'sipho.personal@gmail.com', label: 'Google: Personal Mail' },
    { id: '2', provider: 'email', handle: 'sipho.meshnet@gmail.com', label: 'Google: Meshnet Admin' },
    { id: '3', provider: 'outlook', handle: 'sipho.khumalo@outlook.com', label: 'Outlook: Business Mail' },
    { id: '4', provider: 'wordpress', handle: 'https://siphomesh.coza/wp-admin', label: 'WordPress: Local Marketplace Admin' },
    { id: '5', provider: 'firebase', handle: 'console.firebase.google.com/u/0/project/mesh-net-89a', label: 'Firebase: Local DB Console' },
    { id: '6', provider: 'linkedin', handle: 'linkedin.com/in/sipho-khumalo-mesh', label: 'LinkedIn: Cooperation Network' },
    { id: '7', provider: 'x', handle: 'x.com/sipho_mesh', label: 'X: Public Broadcast Logs' },
    { id: '8', provider: 'slack', handle: 'milifeos-workspace.slack.com', label: 'Slack: Community Devs' }
  ],
  selectedTier: 'Free Basic',
  upfrontPaid: 0,
  language: 'en',
  classification: 'services',
  selectedTrades: ['Beauty & Wellness', 'Gardening & Landscaping']
};

export const LOCALIZED_SEED_DICTIONARY: Record<string, string[]> = {
  ZA: ["Umhlaba", "Ubuntu", "Amandla", "Ikhaya", "Imbizo", "Inkululeko", "Isibane", "Uthando", "Ukuphila", "Inzuzo", "Sizwe", "Isisekelo"],
  EU: ["Heimat", "Freiheit", "Gemeinschaft", "Verbindung", "Vertrauen", "Quelle", "Boden", "Frieden", "Anker", "Zukunft", "Licht", "Struktur"],
  US: ["Sovereign", "Anchor", "Kinship", "Bedrock", "Harvest", "Freedom", "Network", "Trust", "Compass", "Horizon", "Shelter", "Legacy"],
  LATAM: ["Tierra", "Libertad", "Raiz", "Comunidad", "Fuego", "Abundancia", "Semilla", "Amparo", "Tejido", "Fuerza", "Soberano", "Legado"]
};

export const COMPLIANCE_DESCRIPTIONS: Record<string, string> = {
  ZA: "HOSPITALITY & CARE: Adhering to the spirits of Ubuntu & POPIA. This means we treat your digital presence with absolute respect, guarding your workspace and personal stories as local community secrets.",
  EU: "HOSPITALITY & CARE: Respecting European privacy traditions and GDPR. Your digital footprints are entirely your own; we run on zero cookies, zero intrusive telemetry, and absolute human dignity.",
  US: "HOSPITALITY & CARE: Safeguarding your independent personal voice and local rights. Guided by simple local trust circles so you can share your work on your own terms, free from commercial tracking.",
  LATAM: "INFORMAL AGREEMENTS: Honouring genuine community ties and neighborhood trust pacts. Keeping our reciprocal relationships close, simple, and transparent without rigid legal coldness."
};

export const GATEWAY_ROUTERS: Record<string, string> = {
  ZA: "Yoco / PayFast / Stitch Connectors",
  EU: "Stripe Connect / SEPA Direct Rails",
  US: "Stripe Core / PayPal Unified Checkout",
  LATAM: "Mercado Pago / Pix Dynamic Router"
};

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  ZA: { symbol: "R", label: "South African Rand (ZAR)" },
  EU: { symbol: "€", label: "Euro (EUR)" },
  US: { symbol: "$", label: "United States Dollar (USD)" },
  LATAM: { symbol: "R$", label: "Brazilian Real (BRL)" }
};

export type ActiveTab = 'profile-workspace' | 'payment-router' | 'admin-hub' | 'blueprints' | 'business-directory';

export const GLOBAL_COUNTRIES: Record<string, string> = {
  "Afghanistan": "🇦🇫",
  "Albania": "🇦🇱",
  "Algeria": "🇩🇿",
  "Andorra": "🇦🇩",
  "Angola": "🇦🇴",
  "Antigua and Barbuda": "🇦🇬",
  "Argentina": "🇦🇷",
  "Armenia": "🇦🇲",
  "Australia": "🇦🇺",
  "Austria": "🇦🇹",
  "Azerbaijan": "🇦🇿",
  "Bahamas": "🇧🇸",
  "Bahrain": "🇧🇭",
  "Bangladesh": "🇧🇩",
  "Barbados": "🇧🇧",
  "Belarus": "🇧🇾",
  "Belgium": "🇧🇪",
  "Belize": "🇧🇿",
  "Benin": "🇧🇯",
  "Bhutan": "🇧🇹",
  "Bolivia": "🇧🇴",
  "Bosnia and Herzegovina": "🇧🇦",
  "Botswana": "🇧🇼",
  "Brazil": "🇧🇷",
  "Brunei": "🇧🇳",
  "Bulgaria": "🇧🇬",
  "Burkina Faso": "🇧🇫",
  "Burundi": "🇧🇮",
  "Cabo Verde": "🇨🇻",
  "Cambodia": "🇰🇭",
  "Cameroon": "🇨🇲",
  "Canada": "🇨🇦",
  "Central African Republic": "🇨🇫",
  "Chad": "🇹🇩",
  "Chile": "🇨🇱",
  "China": "🇨🇳",
  "Colombia": "🇨🇴",
  "Comoros": "🇰🇲",
  "Democratic Republic of the Congo": "🇨🇩",
  "Republic of the Congo": "🇨🇬",
  "Costa Rica": "🇨🇷",
  "Côte d'Ivoire": "🇨🇮",
  "Croatia": "🇭🇷",
  "Cuba": "🇨🇺",
  "Cyprus": "🇨🇾",
  "Czechia (Czech Republic)": "🇨🇿",
  "Denmark": "🇩🇰",
  "Djibouti": "🇩🇯",
  "Dominica": "🇩🇲",
  "Dominican Republic": "🇩🇴",
  "Ecuador": "🇪🇨",
  "Egypt": "🇪🇬",
  "El Salvador": "🇸🇻",
  "Equatorial Guinea": "🇬🇶",
  "Eritrea": "🇪🇷",
  "Estonia": "🇪🇪",
  "Eswatini": "🇸🇿",
  "Ethiopia": "🇪🇹",
  "Fiji": "🇫🇯",
  "Finland": "🇫🇮",
  "France": "🇫🇷",
  "Gabon": "🇬🇦",
  "Gambia": "🇬🇲",
  "Georgia": "🇬🇪",
  "Germany": "🇩🇪",
  "Ghana": "🇬🇭",
  "Greece": "🇬🇷",
  "Grenada": "🇬🇩",
  "Guatemala": "🇬🇹",
  "Guinea": "🇬🇳",
  "Guinea-Bissau": "🇬🇼",
  "Guyana": "🇬🇾",
  "Haiti": "🇭🇹",
  "Honduras": "🇭🇳",
  "Hungary": "🇭🇺",
  "Iceland": "🇮🇸",
  "India": "🇮🇳",
  "Indonesia": "🇮🇩",
  "Iran": "🇮🇷",
  "Iraq": "🇮🇶",
  "Ireland": "🇮🇪",
  "Israel": "🇮🇱",
  "Italy": "🇮🇹",
  "Jamaica": "🇯🇲",
  "Japan": "🇯🇵",
  "Jordan": "🇯🇴",
  "Kazakhstan": "🇰🇿",
  "Kenya": "🇰🇪",
  "Kiribati": "🇰🇮",
  "Kuwait": "🇰🇼",
  "Kyrgyzstan": "🇰🇬",
  "Laos": "🇱🇦",
  "Latvia": "🇱🇻",
  "Lebanon": "🇱🇧",
  "Lesotho": "🇱🇸",
  "Liberia": "🇱🇷",
  "Libya": "🇱🇾",
  "Liechtenstein": "🇱🇮",
  "Lithuania": "🇱🇹",
  "Luxembourg": "🇱🇺",
  "Madagascar": "🇲🇬",
  "Malawi": "🇲🇼",
  "Malaysia": "🇲🇾",
  "Maldives": "🇲🇻",
  "Mali": "🇲🇱",
  "Malta": "🇲🇹",
  "Marshall Islands": "🇲🇭",
  "Mauritania": "🇲🇷",
  "Mauritius": "🇲🇺",
  "Mexico": "🇲🇽",
  "Micronesia": "🇫🇲",
  "Moldova": "🇲🇩",
  "Monaco": "🇲🇨",
  "Mongolia": "🇲🇳",
  "Montenegro": "🇲🇪",
  "Morocco": "🇲🇦",
  "Mozambique": "🇲🇿",
  "Myanmar (Burma)": "🇲🇲",
  "Namibia": "🇳🇦",
  "Nauru": "🇳🇷",
  "Nepal": "🇳🇵",
  "Netherlands": "🇳🇱",
  "New Zealand": "🇳🇿",
  "Nicaragua": "🇳🇮",
  "Niger": "🇳🇪",
  "Nigeria": "🇳🇬",
  "North Korea": "🇰🇵",
  "North Macedonia": "🇲🇰",
  "Norway": "🇳🇴",
  "Oman": "🇴🇲",
  "Pakistan": "🇵🇰",
  "Palau": "🇵🇼",
  "Palestine": "🇵🇸",
  "Panama": "🇵🇦",
  "Papua New Guinea": "🇵🇬",
  "Paraguay": "🇵🇾",
  "Peru": "🇵🇪",
  "Philippines": "🇵🇭",
  "Poland": "🇵🇱",
  "Portugal": "🇵🇹",
  "Qatar": "🇶🇦",
  "Romania": "🇷🇴",
  "Russia": "🇷🇺",
  "Rwanda": "🇷🇼",
  "Saint Kitts and Nevis": "🇰🇳",
  "Saint Lucia": "🇱🇨",
  "Saint Vincent and the Grenadines": "🇻🇨",
  "Samoa": "🇼🇸",
  "San Marino": "🇸🇲",
  "Sao Tome and Principe": "🇸🇹",
  "Saudi Arabia": "🇸🇦",
  "Senegal": "🇸🇳",
  "Serbia": "🇷🇸",
  "Seychelles": "🇸🇨",
  "Sierra Leone": "🇸🇱",
  "Singapore": "🇸🇬",
  "Slovakia": "🇸🇰",
  "Slovenia": "🇸🇮",
  "Solomon Islands": "🇸🇧",
  "Somalia": "🇸🇴",
  "South Africa": "🇿🇦",
  "South Korea": "🇰🇷",
  "South Sudan": "🇸🇸",
  "Spain": "🇪🇸",
  "Sri Lanka": "🇱🇰",
  "Sudan": "🇸🇩",
  "Suriname": "🇸🇷",
  "Sweden": "🇸🇪",
  "Switzerland": "🇨🇭",
  "Syria": "🇸🇾",
  "Taiwan": "🇹🇼",
  "Tajikistan": "🇹🇯",
  "Tanzania": "🇹🇿",
  "Thailand": "🇹🇭",
  "Timor-Leste": "🇹🇱",
  "Togo": "🇹🇬",
  "Tonga": "🇹🇴",
  "Trinidad and Tobago": "🇹🇹",
  "Tunisia": "🇹🇳",
  "Turkey": "🇹🇷",
  "Turkmenistan": "🇹🇲",
  "Tuvalu": "🇹🇻",
  "Uganda": "🇺🇬",
  "Ukraine": "🇺🇦",
  "United Arab Emirates": "🇦🇪",
  "United Kingdom": "🇬🇧",
  "United States of America": "🇺🇸",
  "Uruguay": "🇺🇾",
  "Uzbekistan": "🇺🇿",
  "Vanuatu": "🇻🇺",
  "Holy See (Vatican City)": "🇻🇦",
  "Venezuela": "🇻🇪",
  "Vietnam": "🇻🇳",
  "Yemen": "🇾🇪",
  "Zambia": "🇿🇲",
  "Zimbabwe": "🇿🇼"
};
