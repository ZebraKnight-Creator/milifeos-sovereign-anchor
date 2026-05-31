/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowUpRight, 
  Check, 
  Building2, 
  Wrench, 
  Tag, 
  Filter, 
  Layers, 
  CircleDollarSign, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  Briefcase,
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AnchorState, CURRENCIES, GLOBAL_COUNTRIES } from '../types';
import { getProviderIcon } from './SovereignControls';

interface SovereignDirectoryProps {
  userState: AnchorState;
  onShowToast: (message: string, isError?: boolean) => void;
  setActiveTab: (tab: any) => void;
}

interface DirectoryNode {
  id: string;
  moniker: string;
  realName: string;
  location: string;
  country?: string;
  classification: 'b2b' | 'services';
  industry: string;
  trades: string[];
  bio: string;
  quote: string;
  pillars: string;
  selectedTier: string;
  merchantKey: string;
  digitalScatter: Array<{ provider: string; handle: string; label: string }>;
}

// Pre-seeded local enterprise & community service directory entities
const INITIAL_DIRECTORY_NODES: DirectoryNode[] = [
  {
    id: 'coop-1',
    moniker: '@peninsula_agro',
    realName: "Cape Peninsula Agro-Forestry",
    location: "Constantia, Cape Town",
    country: "South Africa",
    classification: 'services',
    industry: 'Domestic & Home Services',
    trades: ['Gardening & Landscaping', 'Home Security'],
    bio: "Interconnected permaculture nurseries and organic composting nodes across the Cape Flats. Supporting local food systems, micro-farming, and soil restoration.",
    quote: "Soil regeneration is our mutual defense",
    pillars: "Permaculture, Seeds, Bio-char",
    selectedTier: "Business",
    merchantKey: "pay_pen_agro_stitch",
    digitalScatter: [
      { provider: 'email', handle: 'peninsula.agro@gmail.com', label: 'Primary Mail' },
      { provider: 'website', handle: 'https://capeninsula-agro.co.za', label: 'Produce Catalog' }
    ]
  },
  {
    id: 'coop-2',
    moniker: '@west_coast_micro',
    realName: "West Coast Steel & Micro-Grids",
    location: "Saldanha, Western Cape",
    country: "South Africa",
    classification: 'b2b',
    industry: 'Manufacturing & Heavy Industry',
    trades: ['Steel & Aluminum', 'Industrial Machinery', 'Building Maintenance'],
    bio: "Off-grid local solar integration, heavy-duty steel bracket welding, and localized battery bank enclosures for coastal cooperative hubs.",
    quote: "Welding the future, cell by cell",
    pillars: "Solar, Metal Fabrication, Off-Grid",
    selectedTier: "Company",
    merchantKey: "west_coast_saldanha_pay",
    digitalScatter: [
      { provider: 'slack', handle: 'westcoastgrids.slack.com', label: 'Engineers Slack' },
      { provider: 'github', handle: 'github.com/westcoast-micro', label: 'CAD Designs' }
    ]
  },
  {
    id: 'coop-3',
    moniker: '@table_audit',
    realName: "Table Mountain Professional Ledger",
    location: "Woodstock, Cape Town",
    country: "South Africa",
    classification: 'b2b',
    industry: 'Professional Services',
    trades: ['Accounting & Auditing', 'Legal & Compliance', 'Tax Consultancy'],
    bio: "Independent professional CPAs and local business compliance advisors specializing in POPIA safety, municipal registration, and cooperative tax code audits.",
    quote: "Transparent ledgers, sovereign people",
    pillars: "POPIA, Accounting, Auditing",
    selectedTier: "Business",
    merchantKey: "table_mountain_yoco",
    digitalScatter: [
      { provider: 'outlook', handle: 'audit@tablemountain.org', label: 'CPA Consultation' },
      { provider: 'wordpress', handle: 'https://tablemountainaudit.co.za/wp-admin', label: 'WordPress Core' }
    ]
  },
  {
    id: 'coop-4',
    moniker: '@gugu_delivery',
    realName: "Guguletu Last-Mile Eco-Delivery Net",
    location: "Guguletu, Cape Town",
    country: "South Africa",
    classification: 'services',
    industry: 'Domestic & Home Services',
    trades: ['Last-Mile Delivery'],
    bio: "E-bike powered cargo delivery, local community grocery drops, and direct-to-homestead courier service. Zero fuel emission, 100% community-owned.",
    quote: "Moving values, empowering local blocks",
    pillars: "Logistics, E-Bikes, Mutual-Aid",
    selectedTier: "Free Basic",
    merchantKey: "gugu_ecodel_safe",
    digitalScatter: [
      { provider: 'whatsApp', handle: '+27 82 455 1209', label: 'Delivery Dispatch' },
      { provider: 'website', handle: 'https://gugu-delivery.co.za', label: 'Booking App' }
    ]
  },
  {
    id: 'coop-5',
    moniker: '@karoo_cloud',
    realName: "Karoo Open-Source Systems",
    location: "Graaff-Reinet, Eastern Cape",
    country: "South Africa",
    classification: 'b2b',
    industry: 'IT & SaaS Software',
    trades: ['CRM/ERP Systems', 'Cloud Hosting', 'Cybersecurity', 'Project Management Tools'],
    bio: "Secure, offline-first server setups, custom CRM software for village cooperatives, and community mesh net software provisioning.",
    quote: "Decentralized hosting for small villages",
    pillars: "Open Source, CRM Systems, SaaS",
    selectedTier: "Company",
    merchantKey: "karoo_cloud_merch",
    digitalScatter: [
      { provider: 'github', handle: 'github.com/karoo-cloud-net', label: 'Public Repo' },
      { provider: 'matrix', handle: '#karoo-ops:matrix.org', label: 'Operations Room' }
    ]
  }
];

export default function SovereignDirectory({ userState, onShowToast, setActiveTab }: SovereignDirectoryProps) {
  const lang = userState.language || 'en';
  const currency = CURRENCIES[userState.currentRegion] || { symbol: 'R', label: 'ZAR' };

  // Combine static entities with dynamically added User Profile (if trade classification exists)
  const userNode: DirectoryNode | null = userState.moniker ? {
    id: 'user-node',
    moniker: userState.moniker.startsWith('@') ? userState.moniker : `@${userState.moniker}`,
    realName: userState.realName || "My Trade Node",
    location: userState.location || "Cape Town",
    country: userState.selectedCountry || "South Africa",
    classification: userState.classification || 'services',
    industry: userState.classification === 'b2b' ? 'B2B Professional Services' : 'Community Services',
    trades: userState.selectedTrades || [],
    bio: userState.bio || "Registered sovereign homestead business focusing on local reciprocal trades.",
    quote: userState.quote || "Empowering local village circles.",
    pillars: userState.pillars || "Mutual Aid, Cooperation",
    selectedTier: userState.selectedTier,
    merchantKey: userState.merchantKey || "unspecified",
    digitalScatter: (userState.digitalScatter || []).map(p => ({
      provider: p.provider,
      handle: p.handle,
      label: p.label
    }))
  } : null;

  const allNodes = userNode ? [userNode, ...INITIAL_DIRECTORY_NODES] : INITIAL_DIRECTORY_NODES;

  // Search, classification & tags filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<'all' | 'b2b' | 'services'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Split calculation simulation states
  const [dealAmount, setDealAmount] = useState<string>('1500');
  const [dealReason, setDealReason] = useState<string>('Contract Agreement');
  const [simStatus, setSimStatus] = useState<{ loading: boolean; logs: string[] }>({ loading: false, logs: [] });

  // Get list of distinct industries present
  const industries = Array.from(new Set(allNodes.map(n => n.industry)));

  // Filter calculation
  const filteredNodes = allNodes.filter(node => {
    const matchesSearch = 
      node.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.moniker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.trades.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClassification = 
      classificationFilter === 'all' || node.classification === classificationFilter;

    const matchesIndustry = 
      selectedIndustry === 'all' || node.industry === selectedIndustry;

    return matchesSearch && matchesClassification && matchesIndustry;
  });

  const activeNode = allNodes.find(n => n.id === activeNodeId);

  // 2-10-88 Split Calculator values
  const numericAmount = parseFloat(dealAmount) || 0;
  const splitPlatform = (numericAmount * 0.02).toFixed(2);
  const splitArchitect = (numericAmount * 0.10).toFixed(2);
  const splitUser = (numericAmount * 0.88).toFixed(2);

  const simulateTransaction = (node: DirectoryNode) => {
    if (numericAmount <= 0) {
      onShowToast("Please enter a valid amount to split", true);
      return;
    }
    setSimStatus({ loading: true, logs: ["Initiating 2-10-88 Cooperative Protocol Engine..."] });

    setTimeout(() => {
      setSimStatus(prev => ({
        ...prev,
        logs: [...prev.logs, `Locking transaction value: ${currency.symbol}${dealAmount} for ${dealReason}.`]
      }));
    }, 600);

    setTimeout(() => {
      setSimStatus(prev => ({
        ...prev,
        logs: [...prev.logs, `Accessing distributed registry nodes for ${node.moniker}...`]
      }));
    }, 1200);

    setTimeout(() => {
      setSimStatus(prev => ({
        ...prev,
        logs: [
          ...prev.logs,
          `Reciprocal split finalized! Logging allocations:`,
          `-> 💳 88% Direct Sovereign Trader: ${currency.symbol}${splitUser} (To: ${node.merchantKey || 'Node Pocket'})`,
          `-> 🏗️ 10% Infrastructure Architect: ${currency.symbol}${splitArchitect}`,
          `-> 🛡️ 2% Ecosystem Routing Router: ${currency.symbol}${splitPlatform}`,
          `Transaction safely synchronized locally! Secure handshake verified.`
        ],
        loading: false
      }));
      onShowToast(`Cooperative handshakes saved! Simulated reciprocal split of ${currency.symbol}${dealAmount} completed successfully.`);
    }, 2000);
  };

  return (
    <div className="bg-white border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[650px] relative">
      <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1">
        [ {lang === 'xh' ? 'ULO LUNTU KUNYE NEASHISHINI' : 'B2B & Service Industry Directory'} ]
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-black text-[#0D0D0D] flex items-center gap-2 font-display uppercase tracking-tight">
              <Building2 className="text-black w-6 h-6 stroke-[2.5]" />
              {lang === 'xh' ? 'I-Ecosystem yaBahlali kunye namaShishini' : 'Global Village Service Registry'}
            </h2>
            <p className="text-xs text-neutral-600 mt-1 font-serif italic">
              {lang === 'xh'
                ? 'Khangela kwaye uzibandakanye nemisebenzi yaselaleni kunye nothungelwano lokubambisana.'
                : 'Browse registered community nodes and discover local B2B contractors, service providers, and mutual businesses.'
              }
            </p>
          </div>
          <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
            {lang === 'xh' ? 'Ikhatsalogi ophilayo' : 'Community Catalog'}
          </span>
        </div>
        <div className="w-full bg-[#F4F2F0] h-2.5 rounded-none mt-2 overflow-hidden border-2 border-black">
          <div className="bg-[#ff5500] h-full w-full"></div>
        </div>
      </div>

      {/* High-Visibility Brutalist Sector & B2B Focus Multi-Tab Controller */}
      <div className="border-4 border-black bg-black p-[2px] grid grid-cols-1 md:grid-cols-3 gap-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-mono">
        <button
          type="button"
          onClick={() => {
            setClassificationFilter('all');
            onShowToast(lang === 'xh' ? "Ubonisa lonke uthungelwano lukajikelele..." : "Universal Access: Viewing all collaborative community & trade nodes.");
          }}
          className={`py-3 px-4 font-black uppercase text-center cursor-pointer transition border-none ${
            classificationFilter === 'all' 
              ? 'bg-[#FFFB00] text-black' 
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          🌍 All Directory Nodes
        </button>
        <button
          type="button"
          onClick={() => {
            setClassificationFilter('b2b');
            onShowToast(lang === 'xh' ? "Uvula uluhlu lwamashishini e-B2B..." : "Dedicated Matrix View: Filtering B2B Industrial & Professional Trade Hubs.");
          }}
          className={`py-3 px-4 font-black uppercase text-center cursor-pointer transition border-none ${
            classificationFilter === 'b2b' 
              ? 'bg-[#FFFB00] text-black' 
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          🏭 B2B Industrial Trade Focus
        </button>
        <button
          type="button"
          onClick={() => {
            setClassificationFilter('services');
            onShowToast(lang === 'xh' ? "Uvula uluhlu lweenkonzo zasekuhlaleni..." : "Utility Access: Filtering Local House, Beauty, & Community Services.");
          }}
          className={`py-3 px-4 font-black uppercase text-center cursor-pointer transition border-none ${
            classificationFilter === 'services' 
              ? 'bg-[#FFFB00] text-black' 
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          🛠️ Services Sector Focus
        </button>
      </div>

      {/* Directory Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Search and catalog list (7 columns or full width if no active node detailed) */}
        <div className={`${activeNode ? 'xl:col-span-7' : 'xl:col-span-12'} flex flex-col gap-4`}>
          
          {/* Brutalist Directory Filters Panel */}
          <div className="bg-[#FAF8F5] border-2 border-black p-4 flex flex-col gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative">
              <span className="absolute left-3 top-3 text-neutral-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={lang === 'xh' ? "Khangela igama, isixeko, amashishini okanye pillars..." : "Query by real name, monomer moniker, location, or trade categories..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-black py-2.5 pl-9 pr-3 text-xs font-mono text-black focus:outline-none focus:bg-[#FFFB00] placeholder:text-neutral-400 font-bold shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black pt-3">
              {/* Active Segment Breadcrumb Tracker */}
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-black rounded-none inline-block"></span>
                <span>Active Target Sector:</span>
                <span className="px-2 py-0.5 bg-neutral-200 text-black border border-black text-[9px]">
                  {classificationFilter === 'all' ? 'UNIVERSAL REGISTER' : (classificationFilter === 'b2b' ? 'B2B INDUSTRIAL MATRIX' : 'MUTUAL COMMUNITY SERVICES')}
                </span>
              </div>

              {/* Industry filter dropdown */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="font-bold text-neutral-600">Industry Filter:</span>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="bg-white border-2 border-black px-2 py-1 text-[10px] font-mono font-bold focus:outline-none cursor-pointer hover:bg-neutral-50"
                >
                  <option value="all">ALL INDUSTRIES</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Directory Listings List */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredNodes.map(node => {
              const isActive = node.id === activeNodeId;
              const isUser = node.id === 'user-node';
              const isB2B = node.classification === 'b2b';

              // 1. Custom Layout for Industrial Trade & Professional B2B Nodes
              if (isB2B) {
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    className={`bg-white border-4 border-black transition-all duration-150 cursor-pointer relative hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                      isActive 
                        ? 'shadow-[6px_6px_0px_0px_rgba(255,85,0,1)] border-[#ff5500]' 
                        : 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {/* Retro Hazard/Warning Diagonal Stripe Header */}
                    <div className="h-2.5 w-full bg-[repeating-linear-gradient(45deg,#ffff00,#ffff00_8px,#000000_8px,#000000_16px)] border-b-2 border-black"></div>
                    
                    <div className="p-4 flex flex-col gap-3">
                      {isUser && (
                        <span className="absolute top-4 right-3 bg-[#ff5500] text-white text-[8px] font-mono font-black px-2 py-0.5 border border-black uppercase tracking-widest animate-pulse">
                          Your Active Node
                        </span>
                      )}

                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-none border-2 border-black bg-orange-50 text-[#ff5500] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            🏭
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-black text-black uppercase tracking-tight leading-none font-display">
                                {node.realName}
                              </h3>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black text-[#FFFB00] border border-black font-extrabold tracking-tight">
                                {node.moniker}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono mt-1 font-bold">
                              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              <span>{node.location}</span>
                              <span className="text-neutral-300">|</span>
                              <span className="text-xs leading-none" title={node.country || "South Africa"}>
                                {GLOBAL_COUNTRIES[node.country || "South Africa"] || "🇿🇦"}
                              </span>
                              <span className="text-neutral-300">|</span>
                              <span className="uppercase text-[9px] text-[#ff5500]">{node.selectedTier} License Tier</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 font-mono">
                          <span className="px-2 py-0.5 bg-black text-white font-black uppercase text-[8px] tracking-widest border border-black">
                            B2B Enterprise Node
                          </span>
                          <span className="text-[8px] text-gray-400 uppercase font-black tracking-normal">
                            Split Protocol: 2-10-88 Compliant
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#FAF8F5] p-3 border-2 border-black border-dashed">
                        <span className="text-[8px] font-mono uppercase bg-neutral-200 text-neutral-800 px-1 py-0.5 font-black block w-max mb-1.5">
                          Enterprise Bio & Trade Mission
                        </span>
                        <p className="text-xs text-neutral-800 leading-relaxed italic font-serif">
                          "{node.bio}"
                        </p>
                      </div>

                      {/* Clean Brutalist Grid for Professional Service / Industrial Trade Listings */}
                      <div className="mt-2">
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black block mb-2 px-1 border-l-4 border-black">
                          Verified Enterprise Trade Capabilities & Work Specs:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-black">
                          {node.trades.map((trade, idx) => (
                            <div 
                              key={trade} 
                              className="bg-[#FFFB00]/5 hover:bg-[#FFFB00]/25 border-2 border-black p-3 font-mono text-[9px] uppercase font-black tracking-widest flex flex-col justify-between gap-2.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-black border border-black shrink-0 inline-block"></span>
                                <span className="text-black font-extrabold leading-tight break-words">{trade}</span>
                              </div>
                              <div className="flex items-center justify-between border-t border-black/20 pt-1.5 text-[8px] text-neutral-500 font-bold tracking-normal">
                                <span className="bg-black text-[7px] text-white px-1 py-0.5 uppercase tracking-widest">SPEC {idx + 1}</span>
                                <span>ACTIVE CAPABILITY</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t-2 border-dashed border-black pt-2.5 flex items-center justify-between text-[10px] font-mono text-[#ff5500] font-black uppercase tracking-wider">
                        <span>💳 Seal B2B Mutual Split Agreement</span>
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-500 hover:text-black">Run Splits</span>
                          <ArrowUpRight className="w-4 h-4 text-neutral-700 stroke-[3] shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // 2. Standard Layout for Community Service Nodes
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`bg-white border-2 border-black p-4 transition-all duration-150 cursor-pointer flex flex-col gap-3 relative hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                    isActive 
                      ? 'shadow-[4px_4px_0px_0px_rgba(255,85,0,0.8)] border-[#ff5500]' 
                      : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {isUser && (
                    <span className="absolute -top-2.5 right-3 bg-[#ff5500] text-white text-[8px] font-mono font-black px-2 py-0.5 border border-black uppercase tracking-wider">
                      Your Live Node
                    </span>
                  )}

                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-none border-2 border-black bg-emerald-50 text-[#00aa6c] flex items-center justify-center font-black text-sm">
                        🛠️
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-black text-black leading-snug uppercase tracking-tight">{node.realName}</h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-300 font-bold">
                            {node.moniker}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono mt-0.5 font-bold">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span>{node.location}</span>
                          <span className="text-neutral-300">|</span>
                          <span className="text-xs leading-none" title={node.country || "South Africa"}>
                            {GLOBAL_COUNTRIES[node.country || "South Africa"] || "🇿🇦"}
                          </span>
                          <span className="text-neutral-300">|</span>
                          <span className="uppercase text-[9px] text-[#ff5500]">{node.selectedTier} Tier</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 font-mono text-[9px]">
                      <span className="px-1.5 py-0.5 bg-black text-white font-black uppercase text-[8px] tracking-wider leading-none">
                        Service Provider
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed line-clamp-2 italic font-serif">
                    "{node.bio}"
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {node.trades.map(trade => (
                      <span key={trade} className="text-[9px] font-extrabold uppercase bg-amber-50 border border-black/30 text-neutral-800 px-2 py-0.5 font-mono">
                        ⚙️ {trade}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-neutral-300 pt-2 flex items-center justify-between text-[9px] font-mono text-[#ff5500] font-bold">
                    <span>Click to run protocol and splits</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 inline shrink-0" />
                  </div>
                </div>
              );
            })}

            {filteredNodes.length === 0 && (
              <div className="text-xs text-neutral-500 bg-[#F4F2F0] border-2 border-dashed border-neutral-400 p-8 text-center font-serif italic leading-relaxed">
                No matching trade directories or enterprise nodes found checking current grid search query.
              </div>
            )}
          </div>
        </div>

        {/* Right Active Node Details Drawer and Interactive 2-10-88 Protocol Split Controller (5 columns) */}
        {activeNode && (
          <div className="xl:col-span-5 border-4 border-black p-5 bg-[#FAF8F5] relative flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setActiveNodeId(null)}
              className="absolute top-2 right-2 bg-white hover:bg-red-50 text-black border-2 border-black font-mono font-bold text-xs px-2 py-0.5 hover:text-red-600 transition"
            >
              CLOSE ✕
            </button>

            <span className="text-[9px] font-mono font-black uppercase bg-black text-[#FFFB00] px-2 py-1 self-start border border-black">
              ACTIVE MATRIX VIEW
            </span>

            <div className="pb-3 border-b-2 border-black">
              <h3 className="text-base font-black text-black uppercase tracking-tight leading-snug">{activeNode.realName}</h3>
              <p className="text-xs text-neutral-500 font-mono font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{activeNode.moniker}</span>
                <span className="text-neutral-300">•</span>
                <span>{activeNode.location}</span>
                <span className="text-neutral-300">•</span>
                <span className="text-sm">{GLOBAL_COUNTRIES[activeNode.country || "South Africa"] || "🇿🇦"}</span>
                <span className="uppercase text-[10px]">{activeNode.country || "South Africa"}</span>
              </p>
              <div className="text-[10px] tracking-wider uppercase font-extrabold text-[#ff5500] mt-1 font-mono flex items-center gap-1">
                <span>CLASSIFIED:</span>
                <span className="bg-white border border-black px-1.5 py-0.5 font-black text-black">
                  {activeNode.classification.toUpperCase()} ({activeNode.industry.toUpperCase()})
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-800 font-sans">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 block mb-0.5">Biography & Mission</span>
                <p className="italic font-serif text-[#0D0D0D]">"{activeNode.bio}"</p>
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 block mb-1">Affiliated Trade Categories</span>
                <div className="flex flex-wrap gap-1">
                  {activeNode.trades.map(trade => (
                    <span key={trade} className="text-[9px] font-bold bg-white text-black border border-black px-2 py-0.5">
                      ✓ {trade}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 block mb-1">Direct Channels & Scatter</span>
                <div className="grid grid-cols-1 gap-1">
                  {activeNode.digitalScatter.map((sc, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white border border-neutral-300 p-1.5 font-mono text-[10px] overflow-hidden truncate">
                      <div className="shrink-0">{getProviderIcon(sc.provider)}</div>
                      <div className="truncate">
                        <strong className="text-neutral-500 uppercase">{sc.label || sc.provider}:</strong> <span className="text-black select-all">{sc.handle}</span>
                      </div>
                    </div>
                  ))}
                  {activeNode.digitalScatter.length === 0 && (
                    <span className="font-serif italic text-neutral-500">No public channels. Direct handshakes only.</span>
                  )}
                </div>
              </div>
            </div>

            {/* B2B Secure Handshake calculator (2-10-88 Splits) */}
            <div className="border-t-2 border-black pt-4 mt-1 bg-white p-4 border border-black">
              <h4 className="text-xs font-black uppercase text-black tracking-widest font-display flex items-center gap-1.5 leading-none">
                <CircleDollarSign className="w-4 h-4 text-black shrink-0" />
                Sovereign Trade Protocol
              </h4>
              <p className="text-[10px] text-neutral-500 font-serif italic mt-1 leading-snug">
                Commit B2B trade values directly below to calculate secure mutual ledger splits.
              </p>

              <div className="flex flex-col gap-3 mt-3 font-mono text-xs">
                <div>
                  <label className="text-[9px] tracking-wider uppercase font-black text-neutral-600 block mb-0.5">Split Purpose / Item Description</label>
                  <input
                    type="text"
                    value={dealReason}
                    onChange={(e) => setDealReason(e.target.value)}
                    className="w-full bg-white border border-neutral-400 px-2.5 py-1.5 text-xs text-black focus:outline-none focus:border-black font-extrabold"
                    placeholder="e.g. 50 Steel Brackets Delivery"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] tracking-wider uppercase font-black text-neutral-600 block mb-0.5">Contract Value ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1.5 font-bold">{currency.symbol}</span>
                      <input
                        type="number"
                        value={dealAmount}
                        onChange={(e) => setDealAmount(e.target.value)}
                        className="w-full bg-white border border-neutral-400 pl-6 pr-2 py-1.5 text-xs text-black focus:outline-none focus:border-black font-black"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      disabled={simStatus.loading || numericAmount <= 0}
                      onClick={() => simulateTransaction(activeNode)}
                      className="bg-black text-[#FFFB00] font-black uppercase tracking-wider py-1.5 px-3 border border-black hover:bg-[#FFFB00] hover:text-black transition flex items-center justify-center gap-1 text-[11px] h-[33px]"
                    >
                      <span>{simStatus.loading ? 'COMPUTING...' : 'SEAL TRADE'}</span>
                      <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Simulated split overview grid */}
                <div className="bg-[#FAF8F5] p-2.5 border border-black text-[10px] space-y-1 mt-1 font-bold">
                  <div className="flex justify-between text-neutral-600">
                    <span>Platform Service Router (2%):</span> <span>{currency.symbol}{splitPlatform}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Ecosystem Sponsor Builder (10%):</span> <span>{currency.symbol}{splitArchitect}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 border-t border-dashed border-black/30 pt-1 mt-1 font-black">
                    <span>Sovereign Node pocket (88%):</span> <span>{currency.symbol}{splitUser}</span>
                  </div>
                </div>

                {/* Progress logs terminal overlay */}
                {simStatus.logs.length > 0 && (
                  <div className="bg-[#1A1A1A] p-3 text-emerald-400 font-mono text-[9px] rounded-none border border-black flex flex-col gap-1 max-h-[140px] overflow-y-auto leading-relaxed">
                    <div className="text-white border-b border-neutral-800 pb-1 flex justify-between uppercase">
                      <span>PROTOCOL CONSOLE</span>
                      <span className="animate-pulse">● LIVE</span>
                    </div>
                    {simStatus.logs.map((log, index) => (
                      <div key={index}>{log}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-between gap-4 border-t-2 border-black pt-5">
        <button 
          type="button"
          onClick={() => setActiveTab('profile-workspace')} 
          className="bg-white border-2 border-black hover:bg-neutral-100 font-bold px-5 py-3 text-xs uppercase tracking-wider transition cursor-pointer"
        >
          {lang === 'xh' ? 'Buyela kuCwangciso lekharid' : 'Back to Profile Design'}
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('payment-router')} 
          className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black font-black py-3.5 px-6 rounded-none transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-display cursor-pointer"
        >
          {lang === 'xh' ? 'Indlela yoNcediswano' : 'Edit My Pricing Splits'}
        </button>
      </div>
    </div>
  );
}
