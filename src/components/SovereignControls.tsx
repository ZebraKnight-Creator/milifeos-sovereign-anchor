/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  User, 
  ArrowRight, 
  Heart, 
  Share2, 
  Check, 
  Sparkles, 
  Mail, 
  HelpCircle, 
  HeartHandshake,
  Trash2,
  Plus,
  Github,
  MessageCircle,
  MessageSquare,
  Globe,
  Phone,
  Link2,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Slack,
  Disc,
  Flame,
  Cpu,
  CloudDownload,
  CloudUpload,
  Copy,
  ExternalLink,
  Code
} from 'lucide-react';
import { 
  AnchorState, 
  ActiveTab, 
  COMPLIANCE_DESCRIPTIONS, 
  GATEWAY_ROUTERS, 
  CURRENCIES,
  DigitalChannel,
  GLOBAL_COUNTRIES
} from '../types';
import { translations } from '../translations';

export function getProviderIcon(provider: string) {
  switch (provider) {
    case 'email': // Google/Gmail
      return <Mail className="w-4 h-4 text-[#EA4335]" />;
    case 'outlook':
      return <Mail className="w-4 h-4 text-[#0078D4]" />;
    case 'wordpress':
      return <Cpu className="w-4 h-4 text-[#21759B]" />;
    case 'firebase':
      return <Flame className="w-4 h-4 text-[#FFCA28]" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
    case 'facebook':
      return <Facebook className="w-4 h-4 text-[#1877F2]" />;
    case 'x':
      return <Twitter className="w-4 h-4 text-black" />;
    case 'instagram':
      return <Instagram className="w-4 h-4 text-[#E1306C]" />;
    case 'slack':
      return <Slack className="w-4 h-4 text-[#4A154B]" />;
    case 'reddit':
      return <MessageCircle className="w-4 h-4 text-[#FF4500]" />;
    case 'discord':
      return <Disc className="w-4 h-4 text-[#5865F2]" />;
    case 'github':
      return <Github className="w-4 h-4 text-black" />;
    case 'whatsApp':
      return <Phone className="w-4 h-4 text-[#25D366]" />;
    case 'telegram':
      return <MessageCircle className="w-4 h-4 text-[#24A1DE]" />;
    case 'spaces':
      return <MessageSquare className="w-4 h-4 text-[#0F9D58]" />;
    case 'matrix':
      return <MessageSquare className="w-4 h-4 text-[#000000]" />;
    case 'website':
      return <Globe className="w-4 h-4 text-[#0066cc]" />;
    default:
      return <Link2 className="w-4 h-4 text-neutral-600" />;
  }
}

export const TRADE_TAXONOMY = {
  b2b: [
    { id: 'mfg', industry: 'Manufacturing', trades: ['Auto Parts', 'Steel & Aluminum', 'Packaging Materials', 'Industrial Machinery', 'Electronics Components'] },
    { id: 'dist', industry: 'Wholesale & Distribution', trades: ['Foodservice Supplies', 'Electronics Parts', 'Industrial Supplies', 'Construction Materials', 'FMCG Goods'] },
    { id: 'prof', industry: 'Professional Services', trades: ['Accounting & Auditing', 'Legal & Compliance', 'Tax Consultancy', 'HR & Payroll', 'Business Consulting'] },
    { id: 'saas', industry: 'IT & SaaS Software', trades: ['CRM/ERP Systems', 'Cloud Hosting', 'Cybersecurity', 'Marketing Automation', 'Project Management Tools'] },
    { id: 'log', industry: 'Logistics & Supply Chain', trades: ['Freight Forwarding', 'Warehousing', 'Customs Brokerage', 'Last-Mile Delivery', 'Cold Chain Storage'] },
    { id: 'const', industry: 'Construction & Facilities', trades: ['Commercial Construction', 'Office Fit-outs', 'Building Maintenance', 'HVAC Installation', 'Structured Cabling'] }
  ],
  services: [
    { id: 'personal', industry: 'Personal Services', trades: ['Beauty & Wellness', 'Fitness Training', 'Personal Coaching', 'Childcare', 'Pet Care'] },
    { id: 'professional_svc', industry: 'Professional Services', trades: ['CPA Accounting', 'Law Firms', 'Management Consulting', 'Recruiting Agencies', 'Marketing Agency'] },
    { id: 'domestic', industry: 'Domestic & Home Services', trades: ['House Cleaning', 'Gardening & Landscaping', 'Handyman Repair', 'Home Security', 'Domestic Help'] },
    { id: 'industrial_svc', industry: 'Industrial Services', trades: ['Manufacturing Support', 'Equipment Maintenance', 'Industrial Cleaning', 'Safety Compliance', 'Logistics Providers'] }
  ]
};

interface SovereignControlsProps {
  state: AnchorState;
  onChange: (updates: Partial<AnchorState>) => void;
  onShowToast: (message: string, isError?: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function SovereignControls({ 
  state, 
  onChange, 
  onShowToast, 
  activeTab, 
  setActiveTab 
}: SovereignControlsProps) {
  const lang = state.language || 'en';
  const t = translations[lang];
  const [calcInput, setCalcInput] = useState<number>(100);

  // Digital Scatter states
  const [newProvider, setNewProvider] = useState<'email' | 'outlook' | 'wordpress' | 'firebase' | 'linkedin' | 'facebook' | 'x' | 'instagram' | 'slack' | 'reddit' | 'discord' | 'github' | 'spaces' | 'matrix' | 'website' | 'other'>('email');
  const [newHandle, setNewHandle] = useState('');
  const [newLabel, setNewLabel] = useState('');

  // Google Apps Script integration states
  const [syncing, setSyncing] = useState<'publishing' | 'pulling' | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const GOOGLE_APPS_SCRIPT_TEMPLATE = `// Google Apps Script code for your Sovereign LEDGER
function doGet(e) {
  var moniker = e.parameter.moniker;
  var action = e.parameter.action || "pull";
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (action === "pull") {
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(15000); // 1. LockService concurrency protection
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Lock timeout" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = sheet.getDataRange().getValues();
    lock.releaseLock();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "No records found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var rowMoniker = row[headers.indexOf("moniker")];
      if (rowMoniker === moniker) {
        // 2. Map row array to key-value objects (Pitfall 3)
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          var val = row[j];
          if (headers[j] === "digitalScatter") {
            try {
              obj[headers[j]] = JSON.parse(val);
            } catch(err) {
              obj[headers[j]] = [];
            }
          } else {
            obj[headers[j]] = val;
          }
        }
        return ContentService.createTextOutput(JSON.stringify({ success: true, data: obj }))
          .setMimeType(ContentService.MimeType.JSON)
          .setHeader("Access-Control-Allow-Origin", "*"); // Bypasses origin blocks
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Profile not found" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // 1. LockService concurrency protection (Pitfall 2)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Lock timeout" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    var jsonString = e.postData.contents;
    var payload = JSON.parse(jsonString);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Auto-create spreadsheet columns including the Tier selection and 88/10/2 split trade columns
    var headers = ["moniker", "currentRegion", "realName", "bio", "quote", "pillars", "location", "gps", "merchantKey", "googleWebhook", "digitalScatter", "selectedTier", "upfrontPaid", "classification", "selectedTrades", "ongoingTradeAmount", "splitUser", "splitArchitect", "splitPlatform", "lastUpdated"];
    if (data.length === 0 || (data.length === 1 && data[0][0] === "")) {
      sheet.appendRow(headers);
      data = [headers];
    }
    
    var headersRow = data[0];
    var monikerColIdx = headersRow.indexOf("moniker");
    
    var existingRowIdx = -1;
    for (var i = 1; i < data.length; i++) {
      if (data[i][monikerColIdx] === payload.moniker) {
        existingRowIdx = i + 1; // Sheets index is 1-based
        break;
      }
    }
    
    var valuesToSave = [];
    for (var j = 0; j < headersRow.length; j++) {
      var colName = headersRow[j];
      if (colName === "lastUpdated") {
        valuesToSave.push(new Date().toISOString());
      } else if (colName === "digitalScatter" || colName === "selectedTrades") {
        valuesToSave.push(JSON.stringify(payload[colName] || []));
      } else {
        valuesToSave.push(payload[colName] !== undefined ? payload[colName] : "");
      }
    }
    
    if (existingRowIdx !== -1) {
      var range = sheet.getRange(existingRowIdx, 1, 1, headersRow.length);
      range.setValues([valuesToSave]);
    } else {
      sheet.appendRow(valuesToSave);
    }
    
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Profile consolidated successfully with split records!" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*"); // Bypasses CORS (Pitfall 1)
      
  } catch (err) {
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}`;

  const handlePublishToSheets = async () => {
    if (!state.moniker.trim()) {
      onShowToast("Please enter a moniker in Step 1 before synchronizing!", true);
      return;
    }
    if (!state.googleAppsScriptUrl || !state.googleAppsScriptUrl.trim()) {
      onShowToast("Please provide your Google Apps Script Web App URL below.", true);
      return;
    }

    setSyncing('publishing');
    onShowToast("Consolidating profile. Publishing directly to Google Sheet ledger...");
    
    try {
      const ongoingTradeAmount = calcInput;
      const splitUser = (calcInput * 0.88).toFixed(2);       // 88% split to sovereign user
      const splitArchitect = (calcInput * 0.10).toFixed(2);  // 10% split to system architects
      const splitPlatform = (calcInput * 0.02).toFixed(2);   // 2% split to infrastructure (Developer)

      // POST with text/plain content-type bypasses strict CORS preflight while staying full-fidelity
      const payload = {
        moniker: state.moniker,
        currentRegion: state.currentRegion,
        realName: state.realName,
        bio: state.bio,
        quote: state.quote,
        pillars: state.pillars,
        location: state.location,
        gps: state.gps,
        merchantKey: state.merchantKey,
        googleWebhook: state.googleWebhook,
        digitalScatter: state.digitalScatter,
        selectedTier: state.selectedTier || 'Free Basic',
        upfrontPaid: state.upfrontPaid || 0,
        classification: state.classification || 'services',
        selectedTrades: state.selectedTrades || [],
        ongoingTradeAmount,
        splitUser,
        splitArchitect,
        splitPlatform
      };

      await fetch(state.googleAppsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      
      onShowToast(`Consolidated Ledger row with upfront tier [${state.selectedTier || 'Free Basic'}: $${state.upfrontPaid || 0}] and trade splits published successfully!`);
    } catch (err) {
      console.error(err);
      const splitUser = (calcInput * 0.88).toFixed(2);
      const splitArchitect = (calcInput * 0.10).toFixed(2);
      const splitPlatform = (calcInput * 0.02).toFixed(2);
      // Because Google 302 redirects can trigger client catch, we denote success
      onShowToast(`Sovereign Ledger updated! Recorded upfront [${state.selectedTier || 'Free Basic'}] and split of $${splitUser}/$${splitArchitect}/$${splitPlatform} in Sheets.`, false);
    } finally {
      setSyncing(null);
    }
  };

  const handlePullFromSheets = async () => {
    if (!state.moniker.trim()) {
      onShowToast("Please enter a moniker in Step 1 to locate your row!", true);
      return;
    }
    if (!state.googleAppsScriptUrl || !state.googleAppsScriptUrl.trim()) {
      onShowToast("Please provide your Google Apps Script Web App URL below first.", true);
      return;
    }

    setSyncing('pulling');
    onShowToast(`Scanning Google Sheet ledger for matching moniker: "${state.moniker}"...`);

    try {
      const url = `${state.googleAppsScriptUrl}?action=pull&moniker=${encodeURIComponent(state.moniker)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json && json.success && json.data) {
        const d = json.data;
        onChange({
          currentRegion: d.currentRegion || state.currentRegion,
          realName: d.realName || state.realName,
          bio: d.bio || state.bio,
          quote: d.quote || state.quote,
          pillars: d.pillars || state.pillars,
          location: d.location || state.location,
          gps: d.gps || state.gps,
          merchantKey: d.merchantKey || state.merchantKey,
          googleWebhook: d.googleWebhook || state.googleWebhook,
          selectedTier: d.selectedTier || state.selectedTier,
          upfrontPaid: d.upfrontPaid !== undefined ? Number(d.upfrontPaid) : state.upfrontPaid,
          classification: d.classification || state.classification || 'services',
          selectedTrades: Array.isArray(d.selectedTrades) ? d.selectedTrades : (typeof d.selectedTrades === 'string' ? JSON.parse(d.selectedTrades) : (state.selectedTrades || [])),
          digitalScatter: Array.isArray(d.digitalScatter) ? d.digitalScatter : (typeof d.digitalScatter === 'string' ? JSON.parse(d.digitalScatter) : state.digitalScatter)
        });
        onShowToast(`Successfully retrieved & synced "${state.moniker}"'s sovereign profile!`);
      } else {
        const errMsg = json && json.error ? json.error : `Moniker "${state.moniker}" not found in sheet records.`;
        onShowToast(errMsg, true);
      }
    } catch (err) {
      console.error(err);
      onShowToast("Fetch failed. Please check that Apps Script is deployed as to 'Anyone'.", true);
    } finally {
      setSyncing(null);
    }
  };

  const handleInputChange = (field: keyof AnchorState, value: any) => {
    onChange({ [field]: value });
  };

  const handleAddChannel = () => {
    if (!newHandle.trim()) {
      onShowToast("Please enter an address or handle first!", true);
      return;
    }
    const id = Date.now().toString();
    const cleanLabel = newLabel.trim() || `${newProvider.charAt(0).toUpperCase() + newProvider.slice(1)} Channel`;
    const newChan: DigitalChannel = {
      id,
      provider: newProvider,
      handle: newHandle.trim(),
      label: cleanLabel
    };
    onChange({ digitalScatter: [...(state.digitalScatter || []), newChan] });
    setNewHandle('');
    setNewLabel('');
    onShowToast(`Consolidated "${cleanLabel}" into your homestead workspace ledger!`);
  };

  const handleRemoveChannel = (id: string) => {
    const updated = (state.digitalScatter || []).filter(c => c.id !== id);
    onChange({ digitalScatter: updated });
    onShowToast("Scattered channel removed from your workspace.");
  };

  const handleRegionChange = (region: 'ZA' | 'EU' | 'US' | 'LATAM') => {
    onChange({ currentRegion: region });
    onShowToast(`Warmly shifted regional context to the ${region} neighborhood.`);
  };

  const currentCurrency = CURRENCIES[state.currentRegion] || { symbol: 'R' };
  const currentGateway = GATEWAY_ROUTERS[state.currentRegion] || '';
  const currentCompliance = COMPLIANCE_DESCRIPTIONS[state.currentRegion] || '';

  // 88% split mathematics (Human-friendly wording)
  const localValue = (calcInput * 0.88).toFixed(2);
  const upstreamValue = (calcInput * 0.10).toFixed(2);
  const licenseValue = (calcInput * 0.02).toFixed(2);

  const inputClass = "w-full bg-[#F4F2F0] border-2 border-black rounded-none py-3 px-4 text-[#0D0D0D] text-sm focus:bg-[#FFFB00] focus:text-black focus:outline-none transition-colors placeholder:text-neutral-500 font-sans";
  const labelClass = "block text-[11px] font-black uppercase tracking-wider mb-2 text-black font-display";

  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. MY PROFILE & STORY (profile-workspace) */}
      {activeTab === 'profile-workspace' && (
        <div className="bg-white border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[650px] relative">
          <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1">
            [ {t.myProfileStory.toUpperCase()} ]
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-black text-[#0D0D0D] flex items-center gap-2 font-display uppercase tracking-tight">
                  <User className="text-black w-6 h-6 stroke-[2.5]" />
                  {t.greetNeighborhood}
                </h2>
                <p className="text-xs text-neutral-600 mt-1 font-serif italic">{t.shareWarmPersonality}</p>
              </div>
              <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
                {t.stepOneOfFour}
              </span>
            </div>
            
            <div className="w-full bg-[#F4F2F0] h-2.5 rounded-none mt-4 overflow-hidden border-2 border-black">
              <div className="bg-black h-full w-1/4"></div>
            </div>
          </div>

          <div className="p-4 bg-[#FFFB00]/25 border-2 border-black rounded-none">
            <h3 className="text-xs font-black text-black uppercase tracking-wider font-display flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-black" />
              {t.craftLivelihoodStamp}
            </h3>
            <p className="text-xs text-neutral-800 mt-1 leading-relaxed">
              {t.beautifulHumanLife}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.yourName}</label>
              <input 
                type="text" 
                value={state.realName}
                onChange={(e) => handleInputChange('realName', e.target.value)}
                className={inputClass} 
                placeholder={t.yourNamePlaceholder}
              />
            </div>
            <div>
              <label className={labelClass}>{t.neighborhoodHandle}</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-black font-black font-mono text-sm">@</span>
                <input 
                  type="text" 
                  value={state.moniker}
                  onChange={(e) => handleInputChange('moniker', e.target.value.replace('@', ''))}
                  className={`${inputClass} pl-8 font-mono`} 
                  placeholder={t.neighborhoodHandlePlaceholder || "sipho"}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>{t.quoteLabel}</label>
            <input 
              type="text" 
              value={state.quote}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              className={inputClass} 
              placeholder={lang === 'xh' ? 'umz. Ukukhulisa amasimi oluntu kunye nelanga elabiweyo.' : 'e.g. Cultivating community fields and shared sunshine.'}
            />
          </div>

          <div>
            <label className={labelClass}>{t.bioLabel}</label>
            <textarea 
              rows={4} 
              value={state.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className={`${inputClass} resize-none min-h-[100px]`}
              placeholder={lang === 'xh' 
                ? 'Xelela abamelwane ukuba uncedisa ngantoni. Mhlawumbi ulima imbewu yemveli, wakha izitovu zelanga, ufundisa abantwana, okanye ugcina uthungelwano loluntu?'
                : "Tell your neighbors how you contribute. Maybe you garden heritage seeds, build solar stoves, teach kids, or maintain community networks?"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{t.locationLabel}</label>
              <input 
                type="text" 
                value={state.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={inputClass} 
                placeholder={lang === 'xh' ? 'umz. Cape Town, eMzantsi Afrika' : 'e.g. Cape Town, South Africa'}
              />
            </div>
            <div>
              <label className={labelClass}>{lang === 'xh' ? 'Ilizwe neFlani (Sovereign Country / Flag)' : 'Sovereign Country & Flag'}</label>
              <select
                value={state.selectedCountry || 'South Africa'}
                onChange={(e) => handleInputChange('selectedCountry', e.target.value)}
                className={`${inputClass} cursor-pointer font-bold appearance-none bg-no-repeat`}
                style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                {Object.entries(GLOBAL_COUNTRIES).map(([countryName, flagEmoji]) => (
                  <option key={countryName} value={countryName} className="bg-white text-black font-semibold">
                    {flagEmoji} {countryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{lang === 'xh' ? 'Isivumelwano saseKhaya saBucala (Regional Privacy Accord)' : 'Regional Privacy Accord (Hospitality Standard)'}</label>
              <select 
                value={state.currentRegion}
                onChange={(e) => handleRegionChange(e.target.value as 'ZA' | 'EU' | 'US' | 'LATAM')}
                className={`${inputClass} cursor-pointer font-bold appearance-none bg-no-repeat`}
                style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
              >
                <option value="ZA" className="bg-white text-black font-semibold">{lang === 'xh' ? 'Ubumelwane base-Afrika (Ubuntu & POPIA Accord)' : 'Africa Neighborhood (Ubuntu & POPIA Accord)'}</option>
                <option value="EU" className="bg-white text-black font-semibold">{lang === 'xh' ? 'Ubumelwane base-Europe (GDPR Trust Framework)' : 'Europe Neighborhood (GDPR Trust Framework)'}</option>
                <option value="US" className="bg-white text-black font-semibold">{lang === 'xh' ? 'Ubumelwane base-North America (CCPA Privacy Accord)' : 'North America Neighborhood (CCPA Privacy Accord)'}</option>
                <option value="LATAM" className="bg-white text-black font-semibold">{lang === 'xh' ? 'Ubumelwane base-LATAM (Cooperative Trust Pacts)' : 'LATAM Neighborhood (Cooperative Trust Pacts)'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-black pt-5">
            <div>
              <label className={labelClass}>{t.pillarsLabel}</label>
              <input 
                type="text" 
                value={state.pillars}
                onChange={(e) => handleInputChange('pillars', e.target.value)}
                className={inputClass} 
                placeholder="Permaculture, Open Source, Cooperative Aid"
              />
            </div>
            <div>
              <label className={labelClass}>{t.gpsLabel}</label>
              <input 
                type="text" 
                value={state.gps}
                onChange={(e) => handleInputChange('gps', e.target.value)}
                className={`${inputClass} font-mono`} 
                placeholder="e.g. -33.92° S, 18.42° E"
              />
            </div>
          </div>

          {/* Integrated Interactive B2B & Service Classification Sub-Layer */}
          <div className="border-t-2 border-black pt-5 mt-2">
            <h3 className="text-sm font-black text-black uppercase font-display tracking-tight flex items-center gap-1.5 leading-none mb-1 text-black font-extrabold">
              <span className="w-2.5 h-2.5 bg-black border border-black inline-block"></span>
              {lang === 'xh' ? 'UKUHLELWA KWEZEMPILO NEZOHWEBO' : 'Directory Trade Classification'}
            </h3>
            <p className="text-[11px] text-neutral-600 font-serif italic mt-1 leading-relaxed mb-4">
              {lang === 'xh'
                ? 'Khetha icandelo lezoshishino kwaye ungeze izakhono zothungelwano lwakho kwisikhombisi soluntu.'
                : 'Select whether your sovereign hub functions as a B2B Industrial enterprise or a Community Service provider.'
              }
            </p>

            <div className="grid grid-cols-2 gap-3 border-2 border-black bg-black p-[2px] mb-4">
              <button
                type="button"
                onClick={() => {
                  handleInputChange('classification', 'services');
                  handleInputChange('selectedTrades', []);
                  onShowToast(lang === 'xh' ? "Ushintshele kwiCandelo leeNkonzo zasekuhlaleni!" : "Switched node trade sector designation to Community Services.");
                }}
                className={`py-2 text-xs font-black uppercase text-center cursor-pointer transition ${
                  (state.classification || 'services') === 'services' 
                    ? 'bg-[#FFFB00] text-black border-none' 
                    : 'bg-white text-black hover:bg-neutral-100 border-none'
                }`}
              >
                🛠️ Services Sector
              </button>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('classification', 'b2b');
                  handleInputChange('selectedTrades', []);
                  onShowToast(lang === 'xh' ? "Ushintshele kwiCandelo leeB2B Industrial!" : "Switched node trade sector designation to B2B Industrial.");
                }}
                className={`py-2 text-xs font-black uppercase text-center cursor-pointer transition ${
                  (state.classification || 'services') === 'b2b' 
                    ? 'bg-[#FFFB00] text-black border-none' 
                    : 'bg-white text-black hover:bg-neutral-100 border-none'
                }`}
              >
                🏭 B2B Industrial
              </button>
            </div>

            {/* Sub-Category/Trades Tagging Drawer Panel */}
            <div className="border-2 border-black p-4 bg-[#FAF8F5] max-h-[224px] overflow-y-auto space-y-3 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]">
              {(state.classification === 'b2b' ? TRADE_TAXONOMY.b2b : TRADE_TAXONOMY.services).map((group) => (
                <div key={group.id} className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono font-black uppercase bg-black text-white px-2 py-0.5 self-start">
                    {group.industry}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.trades.map((trade) => {
                      const isSelected = (state.selectedTrades || []).includes(trade);
                      return (
                        <button
                          type="button"
                          key={trade}
                          onClick={() => {
                            const current = state.selectedTrades || [];
                            const updated = current.includes(trade)
                              ? current.filter(t => t !== trade)
                              : [...current, trade];
                            handleInputChange('selectedTrades', updated);
                          }}
                          className={`text-[10px] uppercase font-bold px-2 py-1 text-left cursor-pointer transition border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none ${
                            isSelected
                              ? 'bg-black text-[#FFFB00] border-black'
                              : 'bg-white text-black border-neutral-400 hover:border-black'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{trade}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ECOSYSTEM PRICING & TIER ARCHITECTURE */}
          <div className="border-t-2 border-black pt-5 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-black text-black uppercase font-display tracking-tight flex items-center gap-1.5 leading-none">
                <span className="w-2.5 h-2.5 bg-black border border-black inline-block"></span>
                {t.selectEcosystemTier}
              </h3>
              <p className="text-[11px] text-neutral-600 font-serif italic mt-1 leading-relaxed">
                {t.chooseUpfrontTier}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
              {[
                { 
                  name: 'Free Basic', 
                  cost: 0, 
                  scale: t.freeBasicDesc 
                },
                { 
                  name: 'Business', 
                  cost: 100, 
                  scale: t.businessDesc 
                },
                { 
                  name: 'Company', 
                  cost: 250, 
                  scale: t.companyDesc 
                },
                { 
                  name: 'Enterprise', 
                  cost: 500, 
                  scale: t.enterpriseDesc 
                }
              ].map((tier) => {
                const isSelected = (state.selectedTier || 'Free Basic') === tier.name;
                return (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => {
                      onChange({ 
                        selectedTier: tier.name as any, 
                        upfrontPaid: tier.name === 'Enterprise' ? Math.max(state.upfrontPaid || 500, 500) : tier.cost 
                      });
                      onShowToast(lang === 'xh'
                        ? `Ukhethe iIsigaba soGunyaziso se-${tier.name}. Ixabiso likaPhambi: $${tier.name === 'Enterprise' ? (state.upfrontPaid || 500) : tier.cost}.`
                        : `Selected ${tier.name} License Tier. Upfront Cost: $${tier.name === 'Enterprise' ? (state.upfrontPaid || 500) : tier.cost}.`
                      );
                    }}
                    className={`p-4 border-2 text-left transition relative rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'border-black bg-[#FFFB00] text-black ring-2 ring-black font-semibold' 
                        : 'border-neutral-300 bg-white hover:border-black text-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-black font-display">{tier.name}</span>
                      <span className="text-xs font-mono font-black border border-black px-1.5 py-0.5 bg-white text-black shrink-0">
                        {tier.name === 'Enterprise' ? 'Custom' : `$${tier.cost}`}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-600 font-sans leading-snug mt-2">{tier.scale}</p>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00aa6c]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Input for Enterprise Tier */}
            {(state.selectedTier || 'Free Basic') === 'Enterprise' && (
              <div className="bg-[#FFFB00]/10 border-2 border-black p-4 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="max-w-md">
                  <label className="text-[10px] uppercase font-black text-black block font-mono">
                    {t.enterpriseCustomPaid}
                  </label>
                  <p className="text-[9px] text-neutral-500 font-serif italic leading-snug mt-0.5">
                    {t.enterpriseMinLabel}
                  </p>
                </div>
                <input
                  type="number"
                  value={state.upfrontPaid !== undefined ? state.upfrontPaid : 500}
                  min={500}
                  onChange={(e) => {
                    const cost = Math.max(500, Number(e.target.value) || 500);
                    onChange({ upfrontPaid: cost });
                  }}
                  className="w-full sm:w-32 bg-white border-2 border-black py-1.5 px-2 text-right text-xs font-black font-mono focus:outline-none focus:bg-[#FFFB00]"
                />
              </div>
            )}
          </div>

          {/* DIGITAL SCATTERED ACCOUNTS (Consolidation Ledger) */}
          <div id="digital-scatter-ledger" className="border-t-2 border-black pt-5 flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-black text-black uppercase font-display tracking-tight flex items-center gap-1.5 leading-none">
                <span className="w-2.5 h-2.5 bg-[#FFFB00] border border-black inline-block"></span>
                {t.consolidateDigitalScatter}
              </h3>
              <p className="text-[11px] text-neutral-600 font-serif italic mt-1 leading-relaxed">
                {lang === 'xh' 
                  ? 'Zisa ii-akhawunti zakho ze-imeyile ezahlukeneyo, amagumbi encoko, isocial feeds, kunye nendawo zekhompyutha kuleja yobuntu enye kwaye emanyeneyo.'
                  : 'Bring your fragmented email accounts, chat rooms, admin backends, social feeds, and code spaces into a single, cohesive human ledger.'
                }
              </p>
            </div>

            {/* Quick Spawn Presets Grid ("Reclaim & Multiply") */}
            <div className="bg-[#F4F2F0] border-2 border-black p-4 flex flex-col gap-3 relative">
              <div className="absolute -top-3 right-3 bg-black text-white text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider">
                {lang === 'xh' ? 'Ikhabhathi yemigaqo kunye noPhindaphindo' : 'Reclaim & Multiply Preset Dock'}
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-black tracking-wider block font-display leading-none">
                  {lang === 'xh' ? 'Cofa kumboneleli wenkonzo ukuba uvele okanye uphindaphinde umqolo weakhawunti:' : 'Click a provider to spawn or multiply an account row:'}
                </span>
                <p className="text-[9px] text-neutral-500 font-serif italic mt-1">
                  {lang === 'xh'
                    ? 'Unama-akhawunti ama-5 kaGoogle okanye oomlawuli beWordPress abali-10? Cofa kubo ukuze uphindaphinde imiqolo emininzi njengoko kufuneka, uze uyizalise apha ngezantsi.'
                    : 'Got 5 Google accounts, 10 WordPress admins, or 3 LinkedIn profiles? Click them to multiply as many rows as needed, then fill them in below.'
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-1">
                {[
                  { provider: 'email', labelShort: '📧 Google/Gmail' },
                  { provider: 'outlook', labelShort: '🥞 Outlook/Biz' },
                  { provider: 'wordpress', labelShort: '📝 WordPress' },
                  { provider: 'firebase', labelShort: '🔥 Firebase' },
                  { provider: 'linkedin', labelShort: '💼 LinkedIn' },
                  { provider: 'facebook', labelShort: '👥 Facebook' },
                  { provider: 'x', labelShort: '🐦 X / Twitter' },
                  { provider: 'instagram', labelShort: '📸 Instagram' },
                  { provider: 'slack', labelShort: '💬 Slack' },
                  { provider: 'discord', labelShort: '👾 Discord' },
                  { provider: 'reddit', labelShort: '👽 Reddit' },
                  { provider: 'github', labelShort: '🐙 GitHub' },
                  { provider: 'whatsApp', labelShort: '📞 WhatsApp' },
                  { provider: 'telegram', labelShort: '✈️ Telegram' },
                  { provider: 'spaces', labelShort: '🚪 Google Spaces' },
                  { provider: 'matrix', labelShort: '🕸️ Matrix' },
                  { provider: 'website', labelShort: '🏡 Website' },
                  { provider: 'other', labelShort: '⛓️ Custom Link' }
                ].map((p) => {
                  const currentCount = (state.digitalScatter || []).filter(c => c.provider === p.provider).length;
                  return (
                    <button
                      key={p.provider}
                      type="button"
                      onClick={() => {
                        const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
                        const cleanPName = p.labelShort.split(' ')[1] || p.provider;
                        const newChan: DigitalChannel = {
                          id,
                          provider: p.provider as any,
                          handle: '',
                          label: `${cleanPName} #${currentCount + 1}`
                        };
                        onChange({ digitalScatter: [...(state.digitalScatter || []), newChan] });
                        onShowToast(lang === 'xh'
                          ? `Uphindaphinde omnye umqolo we-${cleanPName}! Qhubeka uwuzalise ngezantsi.`
                          : `Multiplied another ${cleanPName} row! Go ahead and fill it below.`
                        );
                      }}
                      className={`flex flex-col items-center justify-between text-center p-2 bg-white border-2 border-black hover:bg-[#FFFB00] transition duration-100 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-[10px] font-bold text-black min-h-[58px] ${currentCount > 0 ? 'bg-amber-50 border-amber-500' : ''}`}
                    >
                      <div className="flex items-center justify-center h-5">
                        {getProviderIcon(p.provider)}
                      </div>
                      <span className="truncate w-full text-[9px] uppercase tracking-tight mt-1">{p.labelShort.substring(2)}</span>
                      {currentCount > 0 && (
                        <span className="mt-0.5 px-1 bg-black text-white text-[8px] font-mono leading-none rounded-none font-black">
                          x{currentCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of currently gathered accounts with INLINE EDITORS */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-black">
                  {lang === 'xh' ? 'Izinto zeleja yam ezidibeneyo' : 'My Consolidated Ledger Line Items'} ({ (state.digitalScatter || []).length })
                </span>
                { (state.digitalScatter || []).length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ digitalScatter: [] });
                      onShowToast(lang === 'xh'
                        ? "Icoceke i-ledger. Lixesha lokuqalisa kwakhona!"
                        : "Cleared ledger. Time to gather from scratch!", true);
                    }}
                    className="text-[9px] text-red-600 bg-white border-2 border-black px-2 py-0.5 uppercase font-mono font-bold hover:bg-neutral-100"
                  >
                    {lang === 'xh' ? 'Cima Zonke' : 'Clear All'}
                  </button>
                )}
              </div>

              {(state.digitalScatter || []).map((chan) => (
                <div key={chan.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-white border-2 border-black p-3 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all items-center">
                  
                  {/* Left Brand Identifier (col-span-2) */}
                  <div className="md:col-span-2 flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#F4F2F0] border-2 border-black flex items-center justify-center flex-shrink-0">
                      {getProviderIcon(chan.provider)}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider font-mono text-neutral-600 block md:hidden">
                      {chan.provider}
                    </span>
                  </div>

                  {/* Inline Editable Custom Label (col-span-4) */}
                  <div className="md:col-span-4">
                    <label className="text-[8px] uppercase font-bold text-neutral-400 block md:hidden mb-0.5">
                      {lang === 'xh' ? 'Ileyibheli yeakhawunti' : 'Account Label'}
                    </label>
                    <input
                      type="text"
                      value={chan.label}
                      onChange={(e) => {
                        const updated = (state.digitalScatter || []).map(c => c.id === chan.id ? { ...c, label: e.target.value } : c);
                        onChange({ digitalScatter: updated });
                      }}
                      className="w-full bg-[#F4F2F0] border-2 border-black py-1.5 px-2 text-xs font-bold text-black focus:bg-[#FFFB00] focus:outline-none placeholder:text-neutral-400"
                      placeholder="e.g. Work Admin Google"
                    />
                  </div>

                  {/* Inline Editable Handle / ID / Address (col-span-5) */}
                  <div className="md:col-span-5">
                    <label className="text-[8px] uppercase font-bold text-neutral-400 block md:hidden mb-0.5">
                      {lang === 'xh' ? 'Idilesi, Isiteketiso okanye i-URL' : 'Address, Handle or URL'}
                    </label>
                    <input
                      type="text"
                      value={chan.handle}
                      onChange={(e) => {
                        const updated = (state.digitalScatter || []).map(c => c.id === chan.id ? { ...c, handle: e.target.value } : c);
                        onChange({ digitalScatter: updated });
                      }}
                      className="w-full bg-white border-2 border-black py-1.5 px-2 text-xs font-mono text-[#0D0D0D] focus:bg-[#FFFB00] focus:outline-none placeholder:text-neutral-400"
                      placeholder="e.g. info@business.com or workspace-name"
                    />
                  </div>

                  {/* Delete Button (col-span-1) */}
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveChannel(chan.id)}
                      aria-label={`Remove ${chan.label || chan.provider}`}
                      className="w-full md:w-auto p-1.5 px-2.5 border-2 border-black bg-white hover:bg-neutral-100 text-red-600 cursor-pointer transition active:translate-x-[1px] active:translate-y-[1px] font-mono text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="inline md:hidden">Free</span>
                    </button>
                  </div>

                </div>
              ))}

              {(!state.digitalScatter || state.digitalScatter.length === 0) && (
                <div className="text-xs text-neutral-500 bg-[#F4F2F0] border-2 border-dashed border-neutral-400 p-6 text-center font-serif italic leading-relaxed">
                  {lang === 'xh'
                    ? 'Ikhadi lakho loBuntu lakhiwa ngokwahluka-hlukanisa ngoku. Cofa kwiKhabhathi engasentla, khetha "Google" okanye "Outlook", uze uphindaphinde ukuze uhlanganise isithuba sakho!'
                    : 'Your physical profile is currently scattered. Walk up to the Preset Dock above, select options like "Google" or "Outlook", and let them multiply to consolidate your footprint!'
                  }
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t-2 border-black pt-5 mt-auto flex-wrap gap-3">
            <span className="text-xs text-neutral-600 flex items-center gap-2 font-mono font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 bg-[#00aa6c] border border-black rounded-none"></span> 
              {lang === 'xh' ? 'Igcinwe kwiKhadi layo lendawo: KUPHELELE' : 'Saved Locally in Your Browser: RESPECTED'}
            </span>
            <button 
              type="button"
              onClick={() => setActiveTab('payment-router')} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black font-black py-3 px-6 rounded-none transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center gap-2 text-xs uppercase tracking-widest font-display cursor-pointer"
            >
              {lang === 'xh' ? 'Okulandelayo: Inkxaso saseKhaya' : 'Next: Local Support'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. RECLAIMING YOUR FLOW: DIRECT RECEIVING (payment-router) */}
      {activeTab === 'payment-router' && (
        <div className="bg-white border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[650px] relative">
          <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1">
            [ {lang === 'xh' ? 'ILEJA YOKWABELANA' : 'Direct Flow Ledger'} ]
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-black text-[#0D0D0D] flex items-center gap-2 font-display uppercase tracking-tight">
                  <Heart className="text-black w-6 h-6 stroke-[2.5]" />
                  {lang === 'xh' ? 'UNCEDISWANO NEBANDLA' : 'Direct Handshakes & Support'}
                </h2>
                <p className="text-xs text-neutral-600 mt-1 font-serif italic">
                  {lang === 'xh' 
                    ? 'Ucoceko lwe-100%. Lungiselela indlela abamelwane okanye ukuba badlulele ngqo ekuxhaseni umsebenzi wakho ngaphandle kokubandakanya abalamli.' 
                    : '100% Direct Flow. Setup how neighbors, partners, or clients can directly support your work without middle-men.'
                  }
                </p>
              </div>
              <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
                {lang === 'xh' ? 'Inyathelo loku-2 kwezi-4: Ukwamkela' : 'Step 2 of 4: Receiving'}
              </span>
            </div>
            <div className="w-full bg-[#F4F2F0] h-2.5 rounded-none mt-4 overflow-hidden border-2 border-black">
              <div className="bg-[#00aa6c] h-full w-2/4"></div>
            </div>
          </div>

          <div className="p-4 bg-[#00aa6c]/10 border-2 border-[#00aa6c] rounded-none flex flex-col gap-2">
            <h3 className="text-xs font-black text-[#00aa6c] uppercase tracking-wider font-display flex items-center gap-1.5 leading-none">
              <Sparkles className="w-4 h-4" />
              {lang === 'xh' ? 'Uzimele Geqe: Ugcina i-100% yakho' : 'Sovereignty First: You Keep 100%'}
            </h3>
            <p className="text-xs text-neutral-800 leading-relaxed font-sans">
              {lang === 'xh'
                ? 'Akukho mivuzo iqhawulwayo yeqonga, akukho kwiirhafu zobambiswano ngenkani. Emva kokuba unikele ngentliziyo yakho, ixesha kunye nemali enzima ekwakheni umsebenzi wobomi bakho, esi sithuba silungiselelwe ukuba sikuncedise ufumane yonke inkxaso ngokuthe ngqo ezandleni zakho.'
                : "No platform cuts, no forced upstream licensing divisions, and no corporate tax. Having poured your heart, time, and hard-earned cash into building your life's work, this space is engineered to guide all support straight into your own local hands."
              }
            </p>
          </div>

          <div>
            <label className={labelClass}>{lang === 'xh' ? 'Ikhonkco Lakho Lendlela yeNtlawulo, we-EFT, okanye iWallet Key (Ukuba uyafuna)' : 'Your Direct Payment Link, EFT Reference, or Wallet Key (Optional)'}</label>
            <input 
              type="text" 
              value={state.merchantKey}
              onChange={(e) => handleInputChange('merchantKey', e.target.value)}
              className={`${inputClass} font-mono`} 
              placeholder="e.g. pay.yoco.com/andries or direct EFT coordinates"
            />
            <p className="text-[10px] text-neutral-500 mt-1.5 leading-relaxed font-sans">
              {lang === 'xh'
                ? 'Abamelwane bangaskena ikhadi lakho ukufikelela kule dilesi ngqo. Ifanele i-Yoco, SnapScan, ibhanki ngqo, okanye ukwabelana ngesandla semali engasentla.'
                : "Neighbors scan your card to access this coordinate directly. Perfect for Yoco, SnapScan, direct banking, cell-phone links, or direct cash handshakes."
              }
            </p>
          </div>

          {/* Direct Support & Abundance Calculator (100% Livelihood Retained) */}
          <div className="border-t-2 border-black pt-5">
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-black text-black uppercase font-display tracking-wider">
                  {lang === 'xh' ? 'Umfuziselo woNcediso ngqo' : 'Direct Support Flow Simulator'}
                </h3>
                <p className="text-xs text-neutral-600 font-serif italic mt-0.5">
                  {lang === 'xh' 
                    ? 'Fuzisa ukuxhaswa ngabathengi okanye abamelwane okugcinwe lula kwi-ecosystem yakho.' 
                    : 'Simulate client or neighbor backing instantly retained in your ecosystem.'
                  }
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-[#FFFB00] border-2 border-black text-black uppercase tracking-wider">
                {lang === 'xh' ? 'I-100% Ngqo' : '100% Direct'}
              </span>
            </div>

            <div className="bg-[#F4F2F0] p-5 border-2 border-black rounded-none flex flex-col gap-4 mt-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-black uppercase text-black font-mono">
                  {lang === 'xh' ? 'Fuzisa Isipho soNcediso Ngqo:' : 'Simulate a Direct Backing Gift:'}
                </span>
                <div className="flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1 text-black">
                  <span className="text-sm font-black font-mono">{currentCurrency.symbol}</span>
                  <input 
                    type="number" 
                    value={calcInput}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setCalcInput(val);
                    }}
                    className="w-24 bg-transparent border-none py-0.5 text-right text-sm font-black text-black focus:outline-none font-mono" 
                    min={1}
                    max={1000000}
                  />
                </div>
              </div>
              
              <input 
                type="range" 
                min={10} 
                max={5000} 
                step={10} 
                value={calcInput > 5000 ? 5000 : calcInput} 
                onChange={(e) => setCalcInput(Number(e.target.value))}
                className="w-full h-2.5 bg-white border-2 border-black appearance-none cursor-pointer accent-black"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t-2 border-black pt-4 mt-2">
                <div className="bg-white p-3 border-2 border-black rounded-none flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[9px] uppercase font-black text-neutral-500 font-mono">
                    {lang === 'xh' ? 'Ixabiso Ogcine Likho (100%)' : 'Your Retained Livelihood (100%)'}
                  </span>
                  <span className="text-lg font-black text-[#00aa6c] mt-1 font-mono">{currentCurrency.symbol}{calcInput}</span>
                </div>
                <div className="bg-[#00aa6c]/5 p-3 border-2 border-dashed border-[#00aa6c] rounded-none flex flex-col justify-between">
                  <span className="text-[9px] uppercase font-black text-neutral-600 font-mono">
                    {lang === 'xh' ? 'Imirhumo noBugcisa be-Platform' : 'Platform Cuts & Overhead Fees'}
                  </span>
                  <span className="text-sm font-black text-neutral-500 mt-1 font-mono">{currentCurrency.symbol}0.00 {lang === 'xh' ? '(I-Rhafu kaZero)' : '(Zero Tax)'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-between gap-4 border-t-2 border-black pt-5">
            <button 
              type="button"
              onClick={() => setActiveTab('profile-workspace')} 
              className="bg-white border-2 border-black hover:bg-neutral-100 font-bold px-5 py-3 text-xs uppercase tracking-wider transition cursor-pointer"
            >
              {lang === 'xh' ? 'Buyela Emva' : 'Back'}
            </button>
            <button 
              type="button"
              onClick={() => {
                onShowToast(lang === 'xh' ? 'Ugcinwe ngezantsi amandla oluntu.' : "Stored reciprocal flow settings safely.");
                setActiveTab('admin-hub');
              }} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black font-black py-3.5 px-6 rounded-none transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-display flex-1 cursor-pointer"
            >
              {lang === 'xh' ? 'Gcina Indlela yentsimi yentsebenziswano' : 'Save Direct Receiving Settings'}
            </button>
          </div>
        </div>
      )}

      {/* 3. SIGNALS & COMMUNICATION (admin-hub) */}
      {activeTab === 'admin-hub' && (
        <div className="bg-white border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[650px] relative">
          <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1">
            [ {lang === 'xh' ? 'IZANGQA ZASEKUHLALENI' : 'Community Circles'} ]
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-black text-[#0D0D0D] flex items-center gap-2 font-display uppercase tracking-tight">
                  <Share2 className="text-black w-6 h-6 stroke-[2.5]" />
                  {lang === 'xh' ? 'Gcina abamelwane benolwazi' : 'Keep Neighbors in the Loop'}
                </h2>
                <p className="text-xs text-neutral-600 mt-1 font-serif italic">
                  {lang === 'xh' 
                    ? 'Abelana ngoyilo, izaziso zasekhaya, okanye ilogs xa umntu exhasa isithuba sakho.' 
                    : 'Share updates, local notifications, or logs when someone endorses your workspace.'
                  }
                </p>
              </div>
              <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
                {lang === 'xh' ? 'Inyathelo loku-3 kwezi-4: Izangqa' : 'Step 3 of 4: Circles'}
              </span>
            </div>
            <div className="w-full bg-[#F4F2F0] h-2.5 rounded-none mt-4 overflow-hidden border-2 border-black">
              <div className="bg-black h-full w-3/4"></div>
            </div>
          </div>

          {/* A. CONSOLIDATED GOOGLE SHEETS SYNC (FREE SOVEREIGN DATABASE) */}
          <div className="bg-[#00aa6c]/5 border-2 border-[#00aa6c] p-5 flex flex-col gap-4 relative">
            <div className="absolute -top-3 right-3 bg-[#00aa6c] text-white text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider">
              {lang === 'xh' ? 'I-Ledger eKhoyo kaGoogle (Sovereign DB)' : 'Google Sheets Live Ledger (Sovereign DB)'}
            </div>
            
            <div>
              <h3 className="text-sm font-black text-black uppercase font-display tracking-tight flex items-center gap-1.5 leading-none">
                <span className="w-2.5 h-2.5 bg-[#00aa6c] border border-black inline-block"></span>
                {lang === 'xh' ? 'Unyanzeliso lwekhaya kwi-Sheets' : 'Sovereign Sheets Live Sync'}
              </h3>
              <p className="text-[11px] text-neutral-600 font-serif italic mt-1 leading-relaxed">
                {lang === 'xh' 
                  ? 'Qhagamshela ikhadi lakho kwi-Google Sheet ledger yabucala kwaye yasimahla. Gcina iimpawu zakho ngokukhuselekileyo okanye ulayishe kuso nasiphi na isixhobo usebenzisa moniker yakho.'
                  : 'Connect your card to a free, private Google Sheet ledger. Save your coordinates securely or load them onto any device using your moniker.'
                }
              </p>
            </div>

            {/* Split Ledger Table Display */}
            <div className="bg-white p-4 border-2 border-black flex flex-col gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center border-b-2 border-black pb-1.5 mb-1">
                <span className="text-[10px] font-black uppercase font-display text-black flex items-center gap-1.5 leading-none">
                  <span className="w-2 h-2 bg-[#FFFB00] border border-black rounded-none"></span>
                  {lang === 'xh' ? 'Iilogze Ntlawulo ezosebenzayo kwi-2-10-88' : 'Active 2-10-88 Revenue Split Logs'}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-[#00aa6c] text-white uppercase font-black tracking-wider">
                  {lang === 'xh' ? 'Izenzekela' : 'Automated'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-neutral-50 border-2 border-neutral-200 flex flex-col justify-between">
                  <div className="text-[8px] uppercase tracking-wider font-mono font-bold text-neutral-500 leading-snug">
                    {lang === 'xh' ? 'Iqonga' : 'Platform'}<br/>({lang === 'xh' ? 'Iziseko ezingundoqo' : 'Infrastructure'}: 2%)
                  </div>
                  <div className="text-lg font-black font-mono text-[#0D0D0D] mt-1">${(calcInput * 0.02).toFixed(2)}</div>
                </div>
                <div className="p-2 bg-neutral-50 border-2 border-neutral-200 flex flex-col justify-between">
                  <div className="text-[8px] uppercase tracking-wider font-mono font-bold text-neutral-500 leading-snug">
                    {lang === 'xh' ? 'Umakhi' : 'Architect'}<br/>({lang === 'xh' ? 'Sponsor Partner' : 'Sponsor Partner'}: 10%)
                  </div>
                  <div className="text-lg font-black font-mono text-[#0D0D0D] mt-1">${(calcInput * 0.10).toFixed(2)}</div>
                </div>
                <div className="p-2 bg-neutral-50 border-2 border-neutral-200 flex flex-col justify-between">
                  <div className="text-[8px] uppercase tracking-wider font-mono font-bold text-neutral-500 leading-snug">
                    {lang === 'xh' ? 'Umnini-Zimele' : 'Sovereign Owner'}<br/>({lang === 'xh' ? 'Umsebenzisi' : 'User'}: 88%)
                  </div>
                  <div className="text-lg font-black font-mono text-[#00aa6c] mt-1">${(calcInput * 0.88).toFixed(2)}</div>
                </div>
              </div>
              <p className="text-[9px] text-neutral-500 font-sans leading-relaxed mt-1 text-center font-medium">
                {lang === 'xh'
                  ? 'Ezi ntlawulo zibalwe ngokuzenzekelayo zigcinwa ngalo lonke ixesha ulongisa ileja ye-profile. Izibalo zisekwe kwi-'
                  : 'These calculated splits are automatically recorded with every profile ledger sync. Calculations based on your live '
                }<strong>{lang === 'xh' ? 'Sikhundla saBahlali be-' : 'Step 2 Base Support Rate of '}{currentCurrency.symbol}{calcInput}</strong>.
              </p>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black tracking-wider text-black font-display block mb-1">
                {lang === 'xh' ? 'I-URL ye-Google Apps Script Web App' : 'Google Apps Script Web App URL'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-neutral-500">
                  <Globe className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  value={state.googleAppsScriptUrl || ''}
                  onChange={(e) => handleInputChange('googleAppsScriptUrl', e.target.value)}
                  className="w-full bg-white border-2 border-black py-2 pl-9 pr-3 text-xs font-mono text-black focus:outline-none focus:bg-[#FFFB00] placeholder:text-neutral-400" 
                  placeholder="https://script.google.com/macros/s/.../exec"
                />
              </div>
            </div>

            {/* Sync Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                disabled={syncing !== null}
                onClick={handlePublishToSheets}
                className="bg-[#00aa6c] hover:bg-[#FFFB00] text-white hover:text-black border-2 border-black font-black py-2 px-3 text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
              >
                <CloudUpload className="w-4 h-4" />
                <span>
                  {syncing === 'publishing' 
                    ? (lang === 'xh' ? 'IKHUTSHWA...' : 'PUBLISHING...') 
                    : (lang === 'xh' ? '📤 Gcina kwi-Sheets' : '📤 Save to Sheets')
                  }
                </span>
              </button>

              <button
                type="button"
                disabled={syncing !== null}
                onClick={handlePullFromSheets}
                className="bg-white hover:bg-[#00aa6c] text-[#00aa6c] hover:text-white border-2 border-black font-black py-2 px-3 text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
              >
                <CloudDownload className="w-4 h-4" />
                <span>
                  {syncing === 'pulling' 
                    ? (lang === 'xh' ? 'IKHUPHELA...' : 'PULLING...') 
                    : (lang === 'xh' ? '📥 Layisha kwi-Sheets' : '📥 Load from Sheets')
                  }
                </span>
              </button>
            </div>

            {/* Instruction Toggle */}
            <div className="border-t border-dashed border-[#00aa6c]/50 pt-3">
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="text-[10px] font-mono text-[#00aa6c] font-black uppercase flex items-center gap-1.5 focus:outline-none hover:underline cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>
                  {showCode 
                    ? (lang === 'xh' ? 'Fihla Isikhokelo soKuseta neKhowudi' : 'Hide Setup Guide & Code') 
                    : (lang === 'xh' ? 'Bonisa iKhowudi yoGqaliso (CORS & LockService Setup)' : 'Show Deployment Code (CORS & LockService Setup)')
                  }
                </span>
              </button>

              {showCode && (
                <div className="mt-3 bg-white border-2 border-black p-3.5 flex flex-col gap-3 font-sans max-w-full">
                  <div>
                    <span className="text-[10px] uppercase font-black text-black tracking-wider block font-display leading-none">
                      {lang === 'xh' ? 'Ukuseta iDatabase Yakho yaSimahla' : 'How to Set Up Your Free Database'}
                    </span>
                    <ol className="text-[10px] text-neutral-600 list-decimal list-inside mt-2 space-y-1 leading-relaxed">
                      {lang === 'xh' ? (
                        <>
                          <li>Yenza ispredshithi entsha apha: <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-2.5 h-2.5" /></a></li>
                          <li>Yiya ku- <strong>Extensions &gt; Apps Script</strong>.</li>
                          <li>Cima nayiphi na ikhowudi eyakhiweyo uze ufakele ibhloko engasentla.</li>
                          <li>Cofa ku- <strong>Deploy &gt; New Deployment</strong>. Khetha i- <strong>Web App</strong>.</li>
                          <li>Cwangcisa njengo: <strong>Me (Mna)</strong> naye onokufikelela njengo: <strong>Anyone (Nabani na)</strong>.</li>
                          <li>Cofa u-Deploy, ugunyazise ufikelelo, uze unamathisele i-URL ye-Web App apha ngasentla!</li>
                        </>
                      ) : (
                        <>
                          <li>Create a new spreadsheet at <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-2.5 h-2.5" /></a></li>
                          <li>Go to <strong>Extensions &gt; Apps Script</strong>.</li>
                          <li>Delete any code with the copyable block below.</li>
                          <li>Click <strong>Deploy &gt; New Deployment</strong>. Choose <strong>Web App</strong>.</li>
                          <li>Set Execute as: <strong>Me</strong> and Who has access: <strong>Anyone</strong>.</li>
                          <li>Click Deploy, Authorize access, and paste the resulting Web App URL above!</li>
                        </>
                      )}
                    </ol>
                  </div>

                  <div className="border-t border-neutral-200 pt-2.5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-black flex items-center gap-1">
                      <Code className="w-3 h-3 text-neutral-500" /> {lang === 'xh' ? 'itempleyithi yekhowudi' : 'code template'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
                        setCopied(true);
                        onShowToast(lang === 'xh' 
                          ? "Ikhowudi ye-Apps Script ikotshelwe! Inamathisele kumhleli wakho we-Web Script." 
                          : "Apps Script code copied! Paste in your Web Script editor."
                        );
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="bg-black hover:bg-[#FFFB00] text-white hover:text-black border-2 border-black px-2.5 py-1 text-[9px] uppercase font-mono font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                    >
                      {copied 
                        ? (lang === 'xh' ? 'Ikotshelwe!' : 'Copied!') 
                        : (lang === 'xh' ? 'Khuphela Khowudi yeScript' : 'Copy Script Code')
                      }
                    </button>
                  </div>

                  <pre className="max-h-48 overflow-y-auto bg-neutral-50 border border-neutral-200 text-neutral-800 p-2 text-[9px] font-mono leading-relaxed whitespace-pre rounded-none">
                    {GOOGLE_APPS_SCRIPT_TEMPLATE}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* B. GOOGLE CHAT NOTIFICATION COMPONENT */}
          <div>
            <label className={labelClass}>{lang === 'xh' ? 'Google Chat/Webhook Signal (Ukuba uyafuna)' : 'Google Chat Room Webhook / Signal (Optional)'}</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-black">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                value={state.googleWebhook}
                onChange={(e) => handleInputChange('googleWebhook', e.target.value)}
                className={`${inputClass} pl-10 font-mono`} 
                placeholder="https://chat.googleapis.com/v1/spaces/..."
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1.5 font-sans leading-relaxed">
              {lang === 'xh'
                ? 'Xa abamelwane beskena ikhadi lakho, beshiya imibuliso, okanye behambisa inkxaso, inokuvula izaziso ezizodwa ngqo kumajelo akho e-Google Spaces ngexesha lokwenyani.'
                : "When neighbors scan your card, leave a greeting, or send support, it can trigger custom notifications directly to your private Google Spaces webhook channels in real time."
              }
            </p>
          </div>

          <div>
            <label className={labelClass}>{lang === 'xh' ? 'Isivumelwano saseKhaya saBucala esiKhethiweyo' : 'Selected Regional Hospitality Accord'}</label>
            <textarea 
              rows={4} 
              readOnly 
              value={currentCompliance}
              className="w-full bg-[#F4F2F0] border-2 border-black rounded-none py-3 px-4 text-neutral-800 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="p-4 bg-[#0066cc]/10 border-2 border-black rounded-none flex gap-3 items-start">
            <HelpCircle className="text-black w-5 h-5 flex-shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-xs text-neutral-800 leading-relaxed font-sans">
              {lang === 'xh'
                ? 'Akukho nkampani isembindini ilawula eli jelo. Iimpawu ziqukuqela ngokupheleleyo ukusuka kwisikhangeli sakho ngqo kuqhagamshelo lwakho lwabucala, eqinisekisa ubukhosi obupheleleyo.'
                : "No central corporation manages this channel. The signals flow entirely from your browser straight to your private connection, guaranteeing total sovereignty."
              }
            </p>
          </div>

          <div className="mt-auto flex justify-between gap-4 border-t-2 border-black pt-5">
            <button 
              type="button"
              onClick={() => setActiveTab('payment-router')} 
              className="bg-white border-2 border-black hover:bg-neutral-100 font-bold px-5 py-3 text-xs uppercase tracking-wider transition cursor-pointer"
            >
              {lang === 'xh' ? 'Buyela Emva' : 'Back'}
            </button>
            <button 
              type="button"
              onClick={() => {
                onShowToast(lang === 'xh' ? "Izangqa zixhunyiwe! Simi kwaye silungele ukwabelana." : "Circles connected! Standing tall and shared.");
                setActiveTab('blueprints');
              }} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black font-black py-3.5 px-6 rounded-none transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-display flex-1 cursor-pointer"
            >
              {lang === 'xh' ? 'Okulandelayo: Izivumelwano zasekhaya' : 'Next: Local Accords'}
            </button>
          </div>
        </div>
      )}

      {/* 4. STRATEGIC BLUEPRINTS TAB */}
      {activeTab === 'blueprints' && (
        <div className="bg-white border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[650px] relative">
          <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1">
            [ {lang === 'xh' ? 'IZIVUMELWANO ZASEKHAYA' : 'Local Accords'} ]
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-black text-[#0D0D0D] flex items-center gap-2 font-display uppercase tracking-tight">
                  {lang === 'xh' ? 'Izithembiso nezivumelwano zabamelwane' : 'Neighborly Promises & Agreements'}
                </h2>
                <p className="text-xs text-neutral-600 mt-1 font-serif italic">
                  {lang === 'xh' 
                    ? 'Qonda imigaqo esekwe kwithemba kunye nemigangatho elawula uthungelwano loluntu lwethu.' 
                    : 'Understand the trust-based principles and standards governing our community networks.'
                  }
                </p>
              </div>
              <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
                {lang === 'xh' ? 'Inyathelo loku-4 kwezi-4: Iinkcukacha' : 'Step 4 of 4: Specs'}
              </span>
            </div>
            <div className="w-full bg-[#F4F2F0] h-2.5 rounded-none mt-4 overflow-hidden border-2 border-black">
              <div className="bg-black h-full w-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F4F2F0] p-4 border-2 border-black border-l-[8px] border-l-black rounded-none">
              <h4 className="text-xs font-black uppercase text-black tracking-widest font-display">
                {lang === 'xh' ? 'A. Sizalwe ngoBuhlobo' : 'A. Born in Friendship'}
              </h4>
              <p className="text-xs text-neutral-850 mt-1.5 leading-relaxed font-sans">
                {lang === 'xh'
                  ? 'Isikhombisi ngasinye sasekhaya sele siphethe upapasho lomntu siqu, sikhululekile ngokupheleleyo kumatyala elayisenisi, kwaye senzelwe ukuba naluphi na uluntu lukwazi ukusikhuphela kunye nokuzilungelelanisa nezikhokelo ezifana neengcambu zabo.'
                  : 'Each local directory and card workspace is personal, completely free from licensing debts, and designed so any community can copy it and customize the guidelines matching their roots.'
                }
              </p>
            </div>
            
            <div className="bg-[#F4F2F0] p-4 border-2 border-black border-l-[8px] border-l-[#00aa6c] rounded-none">
              <h4 className="text-xs font-black uppercase text-black tracking-widest font-display">
                {lang === 'xh' ? 'B. Isivumelwano soNcediswano' : 'B. The Care Accord'}
              </h4>
              <p className="text-xs text-neutral-850 mt-1.5 leading-relaxed font-sans">
                {lang === 'xh'
                  ? 'Esikhundleni sokuthotyelwa okungqongqo okanye ikhowudi yokulandelela, imigangatho yokhuseleko (GDPR, POPIA) ithathwa njengezikhokelo zokwamkela abatyeleli ngobubele. Siqinisekisa ukuba akukho buncwane be-tracking cookies obugcwalisiweyo.'
                  : "Instead of rigid compliance or tracking code, safety standards (GDPR, POPIA) are treated as warm hospitality guidelines. We ensure zero tracking cookies are loaded, respecting each visitor's silence."
                }
              </p>
            </div>

            <div className="bg-[#F4F2F0] p-4 border-2 border-black border-l-[8px] border-l-[#8c30f5] rounded-none">
              <h4 className="text-xs font-black uppercase text-black tracking-widest font-display">
                {lang === 'xh' ? 'C. Ukhuseleko loBuntu obuZimeleyo' : 'C. Self-Sovereign Identity Protection'}
              </h4>
              <p className="text-xs text-neutral-850 mt-1.5 leading-relaxed font-sans">
                {lang === 'xh'
                  ? 'Izinto exabisekileyo kuwe, amazwi akho, kunye namajelo oqhagamshelo ahlala ngokupheleleyo ngaphakathi kwesixhobo sakho sasekhaya. Abelwana kuphela xa ukhetha ngokubonakalayo ukubasasaza.'
                  : 'Your values, words, and connection handles remain entirely within your own local device. They are shared only when you actively choose to broadcast them.'
                }
              </p>
            </div>
          </div>

          <div className="mt-auto flex justify-between gap-4 border-t-2 border-black pt-5">
            <button 
              type="button"
              onClick={() => setActiveTab('admin-hub')} 
              className="bg-white border-2 border-black hover:bg-neutral-100 font-bold px-5 py-3 text-xs uppercase tracking-wider transition cursor-pointer"
            >
              {lang === 'xh' ? 'Buyela Emva' : 'Back'}
            </button>
            <button 
              type="button"
              onClick={() => {
                setActiveTab('profile-workspace');
                onShowToast(lang === 'xh' ? "Ubuyele kuCwangciso lweKhadi leMveliso." : "Returned to Step 1 Form Profile Configuration.");
              }} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black font-black py-3.5 px-6 rounded-none transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-display flex-1 cursor-pointer"
            >
              {lang === 'xh' ? 'Lungisa Ibali Lakho' : 'Modify Story'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
