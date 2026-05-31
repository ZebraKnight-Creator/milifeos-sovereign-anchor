/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Anchor, 
  Mic, 
  Key, 
  User, 
  Calculator, 
  Settings, 
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  BookOpen,
  ShoppingBag,
  HeartHandshake,
  Mail,
  Globe,
  Building2
} from 'lucide-react';
import { AnchorState, INITIAL_ANCHOR_STATE, ActiveTab } from './types';
import SovereignCardPreview from './components/SovereignCardPreview';
import SovereignControls from './components/SovereignControls';
import SovereignDirectory from './components/SovereignDirectory';
import { translations, locales } from './translations';

export default function App() {
  const [state, setState] = useState<AnchorState>(INITIAL_ANCHOR_STATE);
  const lang = state.language || 'en';
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile-workspace');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  
  // Custom Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = (message: string, isError: boolean = false) => {
    setToastMessage(message);
    setToastError(isError);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Click outside menu listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStateChange = (updates: Partial<AnchorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="grid-mesh text-[#0D0D0D] min-h-screen flex flex-col font-sans selection:bg-[#FFFB00] selection:text-black">
      
      {/* Top Header Navigation */}
      <header className="bg-white border-b-2 border-black py-5 px-6 lg:px-10 flex flex-col xl:flex-row justify-between items-center gap-4 sticky top-0 z-50 no-print">
        <div className="flex flex-col md:flex-row md:items-center gap-5 w-full xl:w-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0D0D0D] text-white flex items-center justify-center font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Anchor className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none text-black font-display flex items-center gap-2">
                MILIFEOS <span className="text-[10px] font-black px-2 py-0.5 bg-[#FFFB00] text-black border border-black">SOVEREIGN HOMESTEAD STORIES</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono mt-0.5">{t.livingLedger}</p>
            </div>
          </div>

          {/* Local Community Dropdown Menu with dual color symmetry */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 bg-white border-2 border-black px-3.5 py-1.5 text-xs font-black uppercase tracking-wider hover:bg-neutral-100 transition shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00aa6c] border border-black inline-block animate-pulse"></span>
                <span className="text-black">{t.localCommunity}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute left-0 mt-[6px] w-full sm:w-[320px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-[999] p-1 font-sans text-xs flex flex-col">
                
                {/* PART 1: Local Community Hub (Green Brand Theme) */}
                <div className="bg-[#00aa6c]/5 p-2 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 px-1 py-0.5 mb-0.5">
                    <span className="w-1.5 h-1.5 bg-[#00aa6c] rounded-none"></span>
                    <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#00aa6c]">
                      Local Community Hub (Ecosystem)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleShowToast("Opening Village Cooperative Mission Ledger: 'Deepening mutual-aid and self-reliance.'");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#00aa6c]/10 text-[#00aa6c] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" /> About Community
                    </button>
                    
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleShowToast("Opening cooperative notices, municipal minutes, and circular forum posts...");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#00aa6c]/10 text-[#00aa6c] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Community Blog
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleShowToast("Loading Village Peer-To-Peer Marketplace listings (Zero Platform Tax).");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#00aa6c]/10 text-[#00aa6c] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> E-Commerce Mutuals
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleShowToast("Consulting circular seed sponsor guidelines. Reclaiming flow!");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#00aa6c]/10 text-[#00aa6c] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" /> Cooperative Sponsor
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleShowToast("Connecting to Cape Town - Village Green Mesh Support desk...");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#00aa6c]/10 text-[#00aa6c] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Contact Meshnet
                    </button>
                  </div>
                </div>

                {/* Aesthetic brutalist bold black border line */}
                <div className="border-t-2 border-black my-0.5" />

                {/* PART 2: Sovereign Workspace (Orange Brand Theme) */}
                <div className="bg-[#ff5500]/5 p-2 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 px-1 py-0.5 mb-0.5">
                    <span className="w-1.5 h-1.5 bg-[#ff5500] rounded-none"></span>
                    <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#ff5500]">
                      Your Sovereign Profile Space
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveTab('profile-workspace');
                        handleShowToast(`Switched view: Now customizing ${state.realName || 'Your'} Sovereign Profile.`);
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#ff5500]/10 text-[#ff5500] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" /> Edit About Info
                    </button>
                    
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveTab('profile-workspace');
                        handleShowToast("Navigated! Scroll down to edit/multiply your consolidated digital channels.");
                        setTimeout(() => {
                          const s = document.getElementById('digital-scatter-ledger');
                          if (s) {
                            s.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 100);
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#ff5500]/10 text-[#ff5500] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Edit Personal Blog Links
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveTab('payment-router');
                        handleShowToast("Navigated! Editing your Direct snap-pay keys and billing links.");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#ff5500]/10 text-[#ff5500] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Setup My E-Commerce
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveTab('payment-router');
                        handleShowToast("Accessing direct neighbor-to-creator support simulators.");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#ff5500]/10 text-[#ff5500] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" /> Simulate My Sponsors
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveTab('admin-hub');
                        handleShowToast("Settings: Configuring cooperative circles and support mesh routes.");
                      }}
                      className="flex items-center gap-2 bg-white text-left p-1.5 px-2 border border-neutral-300 hover:border-black hover:bg-[#ff5500]/10 text-[#ff5500] font-black text-[10px] uppercase transition cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Setup Custom Contacts
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Sovereign Language Quick-Tabs (Brutalist Demographically Ordered) */}
          <div className="flex flex-wrap border-2 border-black bg-black gap-[1px] shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] max-w-full overflow-hidden">
            {[
              { code: 'zu', display: 'ZU' },
              { code: 'xh', display: 'XH' },
              { code: 'af', display: 'AF' },
              { code: 'en', display: 'EN' },
              { code: 'sn', display: 'SN' },
              { code: 'st', display: 'ST' },
              { code: 'tn', display: 'TN' },
              { code: 'ts', display: 'TS' },
              { code: 've', display: 'VE' },
              { code: 'ss', display: 'SS' },
              { code: 'nso', display: 'NSO' }
            ].map((tab) => (
              <button
                key={tab.code}
                type="button"
                onClick={() => {
                  handleStateChange({ language: tab.code as any });
                  const welcomeMsg = {
                    en: "Interface language: English active",
                    xh: "Ulwimi lwesiXhosa luvulwe ngempumelelo!",
                    zu: "Ulimi lwesiZulu luvulwe ngempumelelo!",
                    af: "Afrikaanse taalaktivering suksesvol!",
                    sn: "Mutauro weShona watanga kushanda!",
                    nso: "Polelo ya Sepedi e thongwe ka katlego!",
                    st: "Puo ea Sesotho e qoliloe ka katleho!",
                    tn: "Puo ya Setswana e butswe ka katlego!",
                    ts: "Ririmi ra Xitsonga ri hlayisiwile hi ku humelela!",
                    ve: "Luambo lwa Tshivenda lwo vulwa nga u khunyeledza!",
                    ss: "Lulwimi lwesiSwati luvulwe ngemphumelelo!"
                  }[tab.code] || `Language active!`;
                  handleShowToast(welcomeMsg);
                }}
                className={`px-2 py-1 font-mono text-[10px] font-black uppercase cursor-pointer transition border-none ${
                  lang === tab.code ? 'bg-[#FFFB00] text-black' : 'bg-white hover:bg-neutral-100 text-[#0d0d0d]'
                }`}
              >
                {tab.display}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Header Tab Controls in Brutalist Box Outline */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button 
            onClick={() => handleShowToast(lang === 'xh' ? "Uqhagamshela kwi-commentary loop yelizwi..." : "Connecting to the community's gentle vocal commentary loop...", false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-mono font-bold border-2 border-black hover:bg-[#FFFB00] transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-accentPurple" /> {t.voiceNarrative}
          </button>
          
          <button 
            onClick={() => handleShowToast(lang === 'xh' ? "Izinto ezilawulayo zikhuselekile kwisebuzi yakho." : "Grounded values are preserved safely on your own device.", false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-mono font-bold border-2 border-black hover:bg-[#FFFB00] transition cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-accentOrange" /> {t.sharedValues}
          </button>

          <div className="w-0.5 h-6 bg-black hidden sm:block mx-1" />

          <button 
            onClick={() => setActiveTab('profile-workspace')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest transition cursor-pointer border-2 border-black ${
              activeTab === 'profile-workspace' 
                ? 'bg-black text-white shadow-none' 
                : 'bg-white text-black hover:bg-[#FFFB00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <User className="w-3.5 h-3.5" /> 
            {t.myStoryTab}
          </button>

          <button 
            onClick={() => setActiveTab('payment-router')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest transition cursor-pointer border-2 border-black ${
              activeTab === 'payment-router' 
                ? 'bg-black text-white shadow-none' 
                : 'bg-white text-black hover:bg-[#FFFB00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> 
            {t.reciprocityTab}
          </button>

          <button 
            onClick={() => setActiveTab('admin-hub')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest transition cursor-pointer border-2 border-black ${
              activeTab === 'admin-hub' 
                ? 'bg-black text-white shadow-none' 
                : 'bg-white text-black hover:bg-[#FFFB00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> 
            {t.circlesTab}
          </button>

          <button 
            onClick={() => {
              setActiveTab('business-directory');
              handleShowToast(lang === 'xh' ? "Uvula Ikhatsalogi yoShishino neenkonzo..." : "Accessing the B2B and Services Cooperative Directory...");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest transition cursor-pointer border-2 border-black ${
              activeTab === 'business-directory' 
                ? 'bg-black text-[#FFFB00] font-black shadow-none ring-2 ring-black' 
                : 'bg-white text-black hover:bg-[#FFFB00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-black" /> 
            {lang === 'xh' ? 'Izoshishino' : 'Business Sector'}
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      {activeTab === 'business-directory' ? (
        <main className="flex-grow max-w-[1700px] w-full mx-auto p-4 lg:p-8 no-print animate-fade-in">
          <SovereignDirectory 
            userState={state}
            onShowToast={handleShowToast}
            setActiveTab={setActiveTab}
          />
        </main>
      ) : (
        <main className="flex-grow max-w-[1700px] w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Configuration Forms (7/12 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-8 no-print">
            <SovereignControls 
              state={state}
              onChange={handleStateChange}
              onShowToast={handleShowToast}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </section>

          {/* Right Column: High Fidelity Live Preview Card (5/12 Cols) */}
          <section className="lg:col-span-5 flex flex-col gap-8 animate-fade-in">
            <SovereignCardPreview 
              state={state}
              onShowToast={handleShowToast}
            />
          </section>

        </main>
      )}

      {/* Bottom Footer Credits */}
      <footer className="no-print mt-auto border-t-2 border-black bg-black text-white py-5 px-6 lg:px-10 text-xs font-mono flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex gap-4 uppercase text-[10px] font-bold tracking-[0.2em] text-gray-400">
          <span className="text-white font-black">Modernist</span>
          <span>●</span>
          <span>Brutalist</span>
          <span>●</span>
          <span>Sovereign ID</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px]">
          <span className="hover:underline cursor-pointer text-gray-300" onClick={() => setActiveTab('blueprints')}>SYSTEM PARAMETERS (BLUEPRINTS)</span>
          <span className="text-gray-400">DESIGN_MODE: ARTISTIC_FLAIR_STABLE_01</span>
        </div>
      </footer>

      {/* Dynamic Animated Toast Notifications UI */}
      <div 
        className={`fixed bottom-6 right-6 font-mono text-xs py-3 px-5 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform flex items-center gap-3 z-[9999] border-2 border-black ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'
        } ${
          toastError 
            ? 'bg-red-50 text-red-600' 
            : 'bg-[#FFFB00] text-black font-black'
        }`}
      >
        {toastError ? (
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        ) : (
          <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
        )}
        <span className="leading-snug">{toastMessage}</span>
      </div>

    </div>
  );
}
