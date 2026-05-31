/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationSet {
  livingLedger: string;
  localCommunity: string;
  voiceNarrative: string;
  sharedValues: string;
  myStoryTab: string;
  reciprocityTab: string;
  circlesTab: string;
  
  // Identity / Step 1
  myProfileStory: string;
  greetNeighborhood: string;
  shareWarmPersonality: string;
  stepOneOfFour: string;
  craftLivelihoodStamp: string;
  beautifulHumanLife: string;
  yourName: string;
  yourNamePlaceholder: string;
  neighborhoodHandle: string;
  neighborhoodHandlePlaceholder: string;
  locationLabel: string;
  gpsLabel: string;
  bioLabel: string;
  quoteLabel: string;
  pillarsLabel: string;
  
  // Digital Scatter
  consolidateDigitalScatter: string;
  bringFragmentedEmail: string;
  clickProviderSpawn: string;
  consolidatedLedgerItems: string;
  savedLocallyRespected: string;
  addChannel: string;
  
  // Tier selection
  selectEcosystemTier: string;
  chooseUpfrontTier: string;
  freeBasicTier: string;
  freeBasicDesc: string;
  businessTier: string;
  businessDesc: string;
  companyTier: string;
  companyDesc: string;
  enterpriseTier: string;
  enterpriseDesc: string;
  enterpriseCustomPaid: string;
  enterpriseMinLabel: string;
  
  // Sheets Sync & Webhook
  sheetsLiveSync: string;
  connectFreePrivateSheet: string;
  appsScriptUrlLabel: string;
  saveToSheetsBtn: string;
  loadFromSheetsBtn: string;
  showCodeBtn: string;
  hideCodeBtn: string;
  setupGuideTitle: string;
  setupGuideSteps: string[];
  chatWebhookLabel: string;
  chatWebhookDesc: string;
  
  // Preview Card Elements
  previewTitle: string;
  previewSub: string;
  reciprocityPledgeTitle: string;
  reciprocityPledgeDesc: string;
  baseRateLabel: string;
  ongoingTradeLabel: string;
  audioGuideTitle: string;
  audioPlayingDesc: string;
  audioPausedDesc: string;
  qrAltTitle: string;
  scanAddressLabel: string;
  printFormBtn: string;
  copyLinkBtn: string;
  communityCoopFooter: string;
}

export const locales: Record<string, {
  ledger: string;
  community: string;
  voice: string;
  values: string;
  story: string;
  reciprocity: string;
  circles: string;
  greet: string;
  identityStep: string;
  namePrompt: string;
  handlePrompt: string;
  localNotice: string;
  tierTitle: string;
  basic: string;
  biz: string;
  corp: string;
}> = {
  en: {
    ledger: "Living Cooperative Ledger",
    community: "Local Community",
    voice: "Voice Narrative",
    values: "Shared Values",
    story: "1. My Story",
    reciprocity: "2. Reciprocity",
    circles: "3. Circles",
    greet: "Greet the Neighborhood",
    identityStep: "Step 1 of 4: Identity First",
    namePrompt: "Your Name (What should neighbors call you?)",
    handlePrompt: "Your Neighborhood Handle",
    localNotice: "Saved locally in your browser: Respected",
    tierTitle: "Select Ecosystem License Tier",
    basic: "Free Basic ($0) - Everyday neighbors setting up profiles.",
    biz: "Business ($100) - Local individual traders and entrepreneurs.",
    corp: "Company ($250) - Established local companies and networks."
  },
  xh: {
    ledger: "Umgubho weNtsebenziswano oPhilayo",
    community: "Uluntu Lwethu",
    voice: "Ibali Ngelizwi",
    values: "Izinto EziLawulayo",
    story: "1. Ibali Lam",
    reciprocity: "2. Uncediswano",
    circles: "3. Izangqa Zoluntu",
    greet: "Bulisa iMelwane",
    identityStep: "Inyathelo 1 kwama-4: Ubuni kuqala",
    namePrompt: "Igama Lakho (Bamelwane bakubiza ngantoni?)",
    handlePrompt: "Igama lakho lasesitratweni",
    localNotice: "Igcwele apha kwi-browser your: Iyahlonitshwa",
    tierTitle: "Khetha iLayisenisi ye-Ecosystem",
    basic: "Isiseko Sasimahla ($0) - Abamelwane bemihla ngemihla abaseta iiprofayili.",
    biz: "Ishishini ($100) - Abathengisi relied, oorhwebi nabasekhaya.",
    corp: "Inkampani ($250) - Iinkampani zasekuhlaleni ezisekiweyo."
  },
  zu: {
    ledger: "Ibhuku Lokubambisana Eliphilayo",
    community: "Umphakathi Wethu",
    voice: "Indaba Ngezwi",
    values: "Amagugu Esabelana Ngawo",
    story: "1. Indaba Yami",
    reciprocity: "2. Ukwenzisana",
    circles: "3. Izimbizo Zomphakathi",
    greet: "Bingelela Omakhelwane",
    identityStep: "Isinyathelo 1 kwesi-4: Ubazi Bakho Kuqala",
    namePrompt: "Igama Lakho (Omakhelwane bakubiza ngokuthini?)",
    handlePrompt: "Isiteketiso sasekhaya",
    localNotice: "Igcwele lapha ku-browser yakho: Iyahlonishwa",
    tierTitle: "Khetha Isigaba Selayisensi",
    basic: "Isiseko Samahhala ($0) - Omakhelwane bemihla ngemihla abaseta amaphrofayili.",
    biz: "Ibhizinisi ($100) - Abahwebi abazimele nosomabhizinisi basekhaya.",
    corp: "Inkampani ($250) - Izinkampani zasendaweni ezisekiwe."
  },
  af: {
    ledger: "Lewende Koöperatiewe Grootboek",
    community: "Plaaslike Gemeenskap",
    voice: "Stem-vertelling",
    values: "Gedeelde Waardes",
    story: "1. My Storie",
    reciprocity: "2. Wederkerigheid",
    circles: "3. Gemeenskapsringe",
    greet: "Groet die Buurt",
    identityStep: "Stap 1 van 4: Identiteit Eerste",
    namePrompt: "Jou Naam (Wat moet bure jou noem?)",
    handlePrompt: "Jou Buurt-Gebruikersnaam",
    localNotice: "Plaaslik in jou webblaaier gestoor: Gerespekteer",
    tierTitle: "Kies Ekostelsel-Lisensievlak",
    basic: "Gratis Basies ($0) - Alledaagse bure wat hul profiele opstel.",
    biz: "Besigheid ($100) - Plaaslike handelaars en kleinsake-entrepreneurs.",
    corp: "Maatskappy ($250) - Gevestigde plaaslike maatskappye."
  },
  sn: {
    ledger: "Gwaro Ungano reMushandirapamwe",
    community: "Nharaunda Yedu",
    voice: "Nhoroondo yeZwi",
    values: "Zvisungo Zvedu",
    story: "1. Nhoroondo Yangu",
    reciprocity: "2. Kugamuchirana",
    circles: "3. Dare reNharaunda",
    greet: "Kwazisai Nharaunda",
    identityStep: "Danho 1 pa4: Kuzivikanwa Kutanga",
    namePrompt: "Zita Rako (Vavakidzani vanokudaidza kuti ani?)",
    handlePrompt: "Zita rako remunharaunda",
    localNotice: "Zvachengetwa mukombiyuta yako muno: Zvinoremekedzwa",
    tierTitle: "Sarudza Giredhi reRezinesi",
    basic: "Yemahara Inongotanga ($0) - Kuitira vavakidzani vemazuva ose vanotanga.",
    biz: "Vatengesi ($100) - Kuitira vanhu vanozvimiririra vanotengesa.",
    corp: "Kambani ($250) - Kuitira makambani akasimba emunharaunda."
  },
  nso: {
    ledger: "Tšhupamatoho ya Tirišanosetšhaba",
    community: "Setšhaba sa Gona",
    voice: "Kanegelo ya Lentšu",
    values: "Tše di Hlahlago",
    story: "1. Kanegelo ya Aka",
    reciprocity: "2. Tirišanoswa",
    circles: "3. Kgorong ya Gona",
    greet: "Dumela Baagi",
    identityStep: "Kgato 1 go tša 4: Boitsebišo Pele",
    namePrompt: "Leina la Gago (Baagi ba go bitša mang?)",
    handlePrompt: "Leina la gago la tsela",
    localNotice: "E bolokilwe mo sefining sa gago: E a hlomphega",
    tierTitle: "Kgetha Layisense ya Setšhaba",
    basic: "Ntle le Tuelo ($0) - Baagi ba mehleng ba go hlama diprofala.",
    biz: "Kgwebo ($100) - Bawebi ba banyenyane le borakgwebo ba gae.",
    corp: "Khamphani ($250) - Dikhamphani tša gae tše di ntlhomilwego."
  },
  st: {
    ledger: "Buka ya Tsamaiso e Phelang",
    community: "Motsana wa Rona",
    voice: "Pale ka Lentswe",
    values: "Melao ya Motheo",
    story: "1. Pale ya Ka",
    reciprocity: "2. Pheletsano",
    circles: "3. Lekhotla la Motse",
    greet: "Dumela Baahisani",
    identityStep: "Mohato 1 ho e 4: Boitsebiso Pele",
    namePrompt: "Lebitso la Hao (Baahisani ba go bitsa mang?)",
    handlePrompt: "Lebitso la gago la seterateng",
    localNotice: "E bolokilwe ka har'a sebatli sa hao: E a tlotleha",
    tierTitle: "Kgetha Laesense ya Motsana",
    basic: "E sa Lefelloeng ($0) - Baahisani ba letsatsi le letsatsi ba iketsetsang boitsebiso.",
    biz: "Kgoebo ($100) - Bahoebi ba banyenyane le bo-rakgoebo ba motse.",
    corp: "Khampani ($250) - Likhamphani tsa motse tse seng li le teng."
  },
  tn: {
    ledger: "Lokwalo la Kobamelo le le Tshelang",
    community: "Baagi ba Rona",
    voice: "Polelo ka Lentswe",
    values: "Melao ya Motheo",
    story: "1. Polelo ya Me",
    reciprocity: "2. Thwethwano",
    circles: "3. Kgotla ya Motse",
    greet: "Dumela Baagisani",
    identityStep: "Kgato 1 mo go 4: Boitshupo Pele",
    namePrompt: "Leina la Gago (Baagisani ba go bitsa mang?)",
    handlePrompt: "Leina la gago la mmila",
    localNotice: "E bolokilwe mo sebatling sa gago: E a tlotlega",
    tierTitle: "Kgetha Teseletso ya Baagi",
    basic: "E e sa Duelweng ($0) - Baagisani ba malatsi otlhe ba ba ipopelelang daphorefa.",
    biz: "Kgwebo ($100) - Babapadisani ba babotlana le borakgwebo ba mo gae.",
    corp: "Khampani ($250) - Dikhampani tsa mo gae tse di tlhomameng."
  },
  ts: {
    ledger: "Tsalwa leri hanyaka ra Ntirhisano",
    community: "Vaaki va Rona",
    voice: "Matimu hi Rito",
    values: "Timhaka ta Rixaka",
    story: "1. Matimu ya Mina",
    reciprocity: "2. Ntirhisano",
    circles: "3. Hubo ya Vaaki",
    greet: "Xeweta Vaakelani",
    identityStep: "Khwantsu 1 eka 4: Tiva hileswaku i mani",
    namePrompt: "Vito ra Wena (Vaakelani va ku vitana mani?)",
    handlePrompt: "Vito ra wena ra xitarata",
    localNotice: "Yi hlayisiwile eka browser ya wena: Ya hloniphiwa",
    tierTitle: "Hlawula Layisense ya Vaaki",
    basic: "Mahala ($0) - Vaakelani va siku ni siku va endla ti-profile.",
    biz: "Bindzu ($100) - Vaxavisi va le ndhawini ni vatekimbindzu.",
    corp: "Khamphani ($250) - Tikhamphani ta laha kusuhi leti nga simekiwa."
  },
  ve: {
    ledger: "Rembe la Kushumele Ku Tshilaho",
    community: "Tshitshavha Tshashu",
    voice: "Mafhungo nga Ipfhi",
    values: "Milayo ya Lushaka",
    story: "1. Mafhungo Anga",
    reciprocity: "2. U Tangana",
    circles: "3. Khoro ya Mudzimu",
    greet: "Reshani Vhahura",
    identityStep: "Vhukando 1 kha 4: Muvhumbi u Thoma",
    namePrompt: "Dzina Lanu (Vhahura vha ni vhidha u pfi ani?)",
    handlePrompt: "Dzina lanu la tshitatarata",
    localNotice: "Yo vhewa kha browser yanu: Inga hloniphiwa",
    tierTitle: "Nangani Vhuimo ha Layisense",
    basic: "Nga fhedzi ($0) - Vhahura vha mivhundo vha tshi vhumba dziphrofayili.",
    biz: "Vhubindzi ($100) - Vhavhambadzi vha thungo na vhamusi vha hayani.",
    corp: "Khonphani ($250) - Dzikhamphani dza vhupo dzo randelwaho."
  },
  ss: {
    ledger: "Incwadzi Yekubambisana Lephilako",
    community: "Umphakatsi Wetfu",
    voice: "Indaba Ngelizwi",
    values: "Timiso Letisikhombisako",
    story: "1. Umlandvo Wami",
    reciprocity: "2. Kusizana",
    circles: "3. Izimbizo Nemisamo",
    greet: "Bingelela Bomakhelwane",
    identityStep: "Isinyatselo 1 kuloku-4: Ubati Bakho Kucala",
    namePrompt: "Ligama Lakho (Bomakhelwane bakubita ngabani?)",
    handlePrompt: "Ligama lakho lasesitaladini",
    localNotice: "Igcinwe apha ku-browser yakho: Iyahlonishwa",
    tierTitle: "Khetha Lizinga Laphrofayili",
    basic: "Kwamahhala ($0) - Bomakhelwane bemalanga onkhe labatichazela.",
    biz: "Libhizinisi ($100) - Abahwebi labancane netosomabhizinisi tasekhaya.",
    corp: "Inkhampani ($250) - Tinhlangano netinkhampani tasekuhlaleni."
  }
};

const baseEn: TranslationSet = {
  livingLedger: "Living Cooperative Ledger: ROOTED.COMMUNITY",
  localCommunity: "Local Community",
  voiceNarrative: "VOICE NARRATIVE",
  sharedValues: "SHARED VALUES",
  myStoryTab: "1. My Story",
  reciprocityTab: "2. Reciprocity",
  circlesTab: "3. Circles",
  
  myProfileStory: "My Profile & Story",
  greetNeighborhood: "Greet the Neighborhood",
  shareWarmPersonality: "Share your warm personality, community contribution, and what makes you feel safe.",
  stepOneOfFour: "Step 1 of 4: Identity First",
  craftLivelihoodStamp: "Craft your livelihood stamp first",
  beautifulHumanLife: "We believe a beautiful human life is defined by mutual connection and shared values. Let's start by declaring your local anchor here. No sign-ups or lock-ins.",
  yourName: "Your Name (What should neighbors call you?)",
  yourNamePlaceholder: "Sipho Khumalo",
  neighborhoodHandle: "Your Neighborhood Handle (Moniker / Community Username)",
  neighborhoodHandlePlaceholder: "e.g. sipho",
  locationLabel: "Your Sovereign Location (Suburb / Village)",
  gpsLabel: "Sovereign GPS Coordinates",
  bioLabel: "Sovereign Homestead Vision (Bio)",
  quoteLabel: "Living Creed / Uplifting Quote",
  pillarsLabel: "Your Primary Guiding Ground Pillars (Comma Separated)",
  
  consolidateDigitalScatter: "Consolidate your digital scatter",
  bringFragmentedEmail: "Bring your fragmented email accounts, chat rooms, and code spaces into a single, cohesive human ledger.",
  clickProviderSpawn: "Click a provider to spawn or multiply an account row securely on this ledger.",
  consolidatedLedgerItems: "My Consolidated Ledger Line Items",
  savedLocallyRespected: "Saved locally in your browser: Respected.",
  addChannel: "Add Channel",
  
  selectEcosystemTier: "Select Ecosystem License Tier",
  chooseUpfrontTier: "Choose the correct upfront tier for your homestead node. All tiers transition onto our automated 88/10/2 reciprocal trade engine once active.",
  freeBasicTier: "Free Basic",
  freeBasicDesc: "Everyday neighbors setting up basic profiles & digital scatter.",
  businessTier: "Business",
  businessDesc: "Local individual traders, merchants and homestead entrepreneurs.",
  companyTier: "Company",
  companyDesc: "Established local companies and high-volume village trade networks.",
  enterpriseTier: "Enterprise",
  enterpriseDesc: "Large regional entities and regional structural hubs (Custom input).",
  enterpriseCustomPaid: "Enterprise Upfront Custom Paid Score ($)",
  enterpriseMinLabel: "Manually enter your custom negotiated upfront node licensing activation cost amount ($500 minimum).",
  
  sheetsLiveSync: "Sovereign Sheets Live Sync",
  connectFreePrivateSheet: "Connect your card to a free, private Google Sheet ledger. Save your coordinates securely or load them onto any device using your moniker.",
  appsScriptUrlLabel: "Google Apps Script Web App URL",
  saveToSheetsBtn: "Save to Sheets",
  loadFromSheetsBtn: "Load from Sheets",
  showCodeBtn: "Show Deployment Code (CORS & LockService Setup)",
  hideCodeBtn: "Hide Setup Guide & Code",
  setupGuideTitle: "How to Set Up Your Free Database",
  setupGuideSteps: [
    "Create a new spreadsheet at sheets.new",
    "Go to Extensions > Apps Script.",
    "Delete any code and replace with the copyable block below.",
    "Click Deploy > New Deployment. Choose Web App.",
    "Set Execute as: 'Me' and Who has access: 'Anyone'.",
    "Click Deploy, Authorize access, and paste the resulting Web App URL above!"
  ],
  chatWebhookLabel: "Google Chat Room Webhook / Signal (Optional)",
  chatWebhookDesc: "When neighbors scan your card, leave a greeting, or send support, it can trigger custom notifications directly to your private Google Spaces webhook channels in real time.",
  
  previewTitle: "MILifeOS Profile Card",
  previewSub: "Zero-Overhead Ledger Sync • Infrastructure Sovereign",
  reciprocityPledgeTitle: "RECIPROCITY PLEDGE",
  reciprocityPledgeDesc: "When exchanging labor, services or seeds with other local homestead nodes, trade routes and transactional flows operate under the sovereign distribution split.",
  baseRateLabel: "Base Support Rate Score",
  ongoingTradeLabel: "Ongoing Trade Splits",
  audioGuideTitle: "Neighborhood Audio Overview",
  audioPlayingDesc: "Listening to a soft conversation about our stories...",
  audioPausedDesc: "Neighborhood Audio Overview Paused",
  qrAltTitle: "Tap or Scan card coordinates to coordinate direct neighbor-to-neighbor flow.",
  scanAddressLabel: "Scan Homestead Web Identity Address",
  printFormBtn: "Print Paper Permit Card",
  copyLinkBtn: "Copy Live Gateway URL",
  communityCoopFooter: "Cape Town Sovereign Mesh Support"
};

const baseXh: TranslationSet = {
  livingLedger: "Umgubho weNtsebenziswano oPhilayo: ROOTED.COMMUNITY",
  localCommunity: "Uluntu Lwethu",
  voiceNarrative: "IBALI NGELIZWI",
  sharedValues: "IZINTO EZILAWULAYO",
  myStoryTab: "1. Ibali Lam",
  reciprocityTab: "2. Uncediswano",
  circlesTab: "3. Izangqa Zoluntu",
  
  myProfileStory: "Imbali Yam Nomelo Wam",
  greetNeighborhood: "Bulisa iMelwane",
  shareWarmPersonality: "Yabelana ngobuntu bakho, iinjongo zoluntu, noko ukhuseleke kuko.",
  stepOneOfFour: "Inyathelo 1 kwama-4: Ubuni kuqala",
  craftLivelihoodStamp: "Yenza isitampu sakho sokuphila kuqala",
  beautifulHumanLife: "Sikholelwa ukuba ubomi obuhle bomntu bumalunga nonxibelelwano namaxabiso esabelana ngawo. Masiqale ngokwazisa isiqus sakho sasekhaya. Akukho ngena-khonkco okanye ukutshodwa.",
  yourName: "Igama Lakho (Bamelwane bakubiza ngantoni?)",
  yourNamePlaceholder: "Sipho Khumalo",
  neighborhoodHandle: "Igama lakho lasesitratweni (Isiteketiso / Igama lomsebenzisi)",
  neighborhoodHandlePlaceholder: "umz. sipho",
  locationLabel: "Indawo Yakho yoBukhosi (Isuburb / Ilali)",
  gpsLabel: "Ii-coordinate ze-GPS zoBukhosi",
  bioLabel: "Umbono oPhambili woBukhosi bakho (Bio)",
  quoteLabel: "Isiqubulo sokuPhila / Amagama Akhuthazayo",
  pillarsLabel: "Izibonda Zakho eziKhokelayo eziPhambili (Zahlulwe ngeekoma)",
  
  consolidateDigitalScatter: "Dibanisa Iinkcukacha Zakho Ezithe nca",
  bringFragmentedEmail: "Zisa ii-imeyile zakho zasekuhlaleni ezithe nca, amagumbi eincoko, neendawo zekhowudi kwileja enye yobuntu.",
  clickProviderSpawn: "Cofa umboneleli ngezantsi ukuze uvule okanye wandise umqolo we-akhawunti.",
  consolidatedLedgerItems: "Izinto zeLeja yam Ezidityanisiweyo",
  savedLocallyRespected: "Igcwele apha kwi-browser yakho: Iyahlonitshwa.",
  addChannel: "Faka i-Channel",
  
  selectEcosystemTier: "Khetha iQela lakho leLayisenisi ye-Ecosystem",
  chooseUpfrontTier: "Khetha iqela elifanelekileyo lendawo yakho. Onke amaqela atshintshela kwi-enjini yorwebo ezenzekelayo ye-88/10/2 yakuba isebenza.",
  freeBasicTier: "Isiseko Sasimahla",
  freeBasicDesc: "Abamelwane bemihla ngemihla abaseta iiprofayili zabo ezisisiseko.",
  businessTier: "Ishishini",
  businessDesc: "Abathengisi relied, oorhwebi, kunye noosomashishini basekhaya.",
  companyTier: "Inkampani",
  companyDesc: "Iinkampani zasekuhlaleni ezisekiweyo nothungelwano lohwebo lwelali.",
  enterpriseTier: "Ushishino Olukhulu (Okukhethekileyo)",
  enterpriseDesc: "Amaziko amakhulu ommandla.",
  enterpriseCustomPaid: "Ixabiso Elikhethekileyo loShishino ($)",
  enterpriseMinLabel: "Faka apha isixa esivunyelweneyo sokuqala se-licensing ye-node (Ubuncinci yi-$500).",
  
  sheetsLiveSync: "Sovereign Sheets Live Sync",
  connectFreePrivateSheet: "Qhagamshela ikhadi lakho kwi-Google Sheet ledger yasimahla neyimfihlo. Gcina ii-coordinate zakho ngokukhuselekileyo okanye uzilayishe kwisixhobo ngasinye usebenzisa igama lakho lasendlini tab.",
  appsScriptUrlLabel: "I-URL ye-Google Apps Script Web App",
  saveToSheetsBtn: "Gcina kwi-Sheets",
  loadFromSheetsBtn: "Layisha kwi-Sheets",
  showCodeBtn: "Bonisa iKhowudi yoLungelelwaniso (CORS & LockService Setup)",
  hideCodeBtn: "Fihla iKhowudi kunye neSikhokelo",
  setupGuideTitle: "Ukuseta i-Database Yakho Yasimahla",
  setupGuideSteps: [
    "Vula i-spreadsheet entsha kwi-sheets.new",
    "Yiya kwi-Extensions > Apps Script.",
    "Cima nayiphi na ikhowudi ekhoyo uze ufake le khowudi ingentla.",
    "Cofa apha: Deploy > New Deployment. Khetha 'Web App'.",
    "Seta 'Execute as' ibe ngu-'Me' uze u-'Who has access' ibe ngumyiseleyo- 'Anyone'.",
    "Cofa u-Deploy, Vumela ukufikelela (Authorize), uze ukhuphele i-URL yewebhu elapha ngasentla!"
  ],
  chatWebhookLabel: "Google Chat Room Webhook / Signal (Ozindikhethela)",
  chatWebhookDesc: "Xa abamelwane beskena ikhadi lakho, beshiya imibuliso, okanye befaka inkxaso, isenzo siza trigger izaziso ngqo kumagumbi encoko we-Google Spaces yakho.",
  
  previewTitle: "MILifeOS Ikhadi loBuntu",
  previewSub: "Umgubho weNtsebenziswano oPhilayo • Bukhosi Be-Infrastructure",
  reciprocityPledgeTitle: "ISIBONELELO SENDAWO",
  reciprocityPledgeDesc: "Xa nishintshelana ngemisebenzi, iinkonzo okanye imbewu, iitransaction zilandela isplit sobukhosi (88/10/2).",
  baseRateLabel: "Ixabiso lesiseko sokuxhasa",
  ongoingTradeLabel: "Ulwabelo lwe-88 / 10 / 2 oluqhubekayo",
  audioGuideTitle: "Isikhokelo Ngelizwi sasekhaya",
  audioPlayingDesc: "Uphulaphule incoko efudumeleyo malunga namabali ethu...",
  audioPausedDesc: "Isikhokelo Ngelizwi Simusiwe",
  qrAltTitle: "Cofa okanye uskene ikhadi ukulungelelanisa uncediswano nabamelwane abakufutshane nawe.",
  scanAddressLabel: "Skena i-Homestead Web Identity Address",
  printFormBtn: "Shicilela Ikhadi e-Phepheni",
  copyLinkBtn: "Khuphela i-live gateway URL",
  communityCoopFooter: "Inkxaso ye-Cape Town Sovereign Mesh"
};

// Generate final structured translations dictionary mapping all 11 languages with robust fallbacks
export const translations: Record<string, TranslationSet> = {};

// Settle each key
const langKeys = ['en', 'xh', 'zu', 'af', 'sn', 'nso', 'st', 'tn', 'ts', 've', 'ss'];
for (const k of langKeys) {
  const loc = locales[k] || locales.en;
  const base = k === 'xh' ? baseXh : baseEn;
  translations[k] = {
    ...base,
    livingLedger: loc.ledger + ": ROOTED.COMMUNITY",
    localCommunity: loc.community,
    voiceNarrative: loc.voice.toUpperCase(),
    sharedValues: loc.values.toUpperCase(),
    myStoryTab: loc.story,
    reciprocityTab: loc.reciprocity,
    circlesTab: loc.circles,
    myProfileStory: loc.story.replace(/^\d+\.\s*/, ""),
    greetNeighborhood: loc.greet,
    stepOneOfFour: loc.identityStep,
    yourName: loc.namePrompt,
    neighborhoodHandle: loc.handlePrompt,
    savedLocallyRespected: loc.localNotice,
    selectEcosystemTier: loc.tierTitle,
    freeBasicDesc: loc.basic,
    businessDesc: loc.biz,
    companyDesc: loc.corp,
  };
}

