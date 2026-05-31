/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MapPin, 
  Globe2, 
  Podcast, 
  Play, 
  Pause, 
  Leaf, 
  Monitor, 
  HeartHandshake, 
  Printer, 
  Copy, 
  Share2,
  Users,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Github,
  Globe,
  Link2,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Slack,
  Disc,
  Flame,
  Cpu
} from 'lucide-react';
import { 
  AnchorState, 
  LOCALIZED_SEED_DICTIONARY, 
  CURRENCIES,
  GLOBAL_COUNTRIES
} from '../types';
import SovereignQRCode from './SovereignQRCode';
import { translations } from '../translations';

interface SovereignCardPreviewProps {
  state: AnchorState;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function SovereignCardPreview({ state, onShowToast }: SovereignCardPreviewProps) {
  const lang = state.language || 'en';
  const t = translations[lang];
  const [accentColor, setAccentColor] = useState<'orange' | 'purple' | 'green' | 'blue'>('orange');
  const [isPlaying, setIsPlaying] = useState(false);
  const [secs, setSecs] = useState(0);
  const audioIntervalRef = useRef<NodeJS.Timeout|null>(null);

  const colors = {
    orange: 'text-black bg-[#ff9100] border-black font-semibold uppercase',
    purple: 'text-white bg-[#8c30f5] border-black font-semibold uppercase',
    green: 'text-white bg-[#00aa6c] border-black font-semibold uppercase',
    blue: 'text-white bg-[#0066cc] border-black font-semibold uppercase',
  };

  const borderLeftColors = {
    orange: 'border-[#ff9100]',
    purple: 'border-[#8c30f5]',
    green: 'border-[#00aa6c]',
    blue: 'border-[#0066cc]',
  };

  const bgBtnColors = {
    orange: 'bg-[#ff9100] text-black hover:bg-amber-500',
    purple: 'bg-[#8c30f5] text-white hover:bg-violet-600',
    green: 'bg-[#00aa6c] text-white hover:bg-emerald-600',
    blue: 'bg-[#0066cc] text-white hover:bg-blue-600',
  };

  const currentSeeds = LOCALIZED_SEED_DICTIONARY[state.currentRegion] || [];

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setIsPlaying(false);
      onShowToast("Neighborhood Audio Overview Paused");
    } else {
      setIsPlaying(true);
      onShowToast("Listening to a soft conversation about our stories...");
      audioIntervalRef.current = setInterval(() => {
        setSecs((prev) => {
          if (prev >= 102) {
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            setIsPlaying(false);
            onShowToast("Audio narrative completed");
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const remainder = totalSecs % 60;
    return `${mins}:${String(remainder).padStart(2, '0')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClone = () => {
    onShowToast("Copied your beautiful homestead parameters directly inside your browser.");
  };

  const handleCopyLink = () => {
    const safeMoniker = state.moniker.replace('@', '').trim() || 'homestead';
    const link = `https://milifeos.network/@${safeMoniker}`;
    navigator.clipboard.writeText(link).then(() => {
      onShowToast("Public Homestead Address Copied to Clipboard!");
    }).catch(() => {
      onShowToast("Failed to copy address.", true);
    });
  };

  const getPillarIcon = (name: string) => {
    const lower = name.toLowerCase().trim();
    if (lower.includes('permaculture') || lower.includes('farming') || lower.includes('agriculture') || lower.includes('plant')) {
      return <Leaf className="w-3.5 h-3.5 text-black" />;
    }
    if (lower.includes('open source') || lower.includes('software') || lower.includes('monitor') || lower.includes('coding')) {
      return <Monitor className="w-3.5 h-3.5 text-black" />;
    }
    return <Users className="w-3.5 h-3.5 text-black" />;
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'email': // Google/Gmail
        return <Mail className="w-3.5 h-3.5 text-[#EA4335]" />;
      case 'outlook':
        return <Mail className="w-3.5 h-3.5 text-[#0078D4]" />;
      case 'wordpress':
        return <Cpu className="w-3.5 h-3.5 text-[#21759B]" />;
      case 'firebase':
        return <Flame className="w-3.5 h-3.5 text-[#FFCA28]" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />;
      case 'facebook':
        return <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />;
      case 'x':
        return <Twitter className="w-3.5 h-3.5 text-black" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />;
      case 'slack':
        return <Slack className="w-3.5 h-3.5 text-[#4A154B]" />;
      case 'reddit':
        return <MessageCircle className="w-3.5 h-3.5 text-[#FF4500]" />;
      case 'discord':
        return <Disc className="w-3.5 h-3.5 text-[#5865F2]" />;
      case 'github':
        return <Github className="w-3.5 h-3.5 text-black" />;
      case 'whatsApp':
        return <Phone className="w-3.5 h-3.5 text-[#25D366]" />;
      case 'telegram':
        return <MessageCircle className="w-3.5 h-3.5 text-[#24A1DE]" />;
      case 'spaces':
        return <MessageSquare className="w-3.5 h-3.5 text-[#0F9D58]" />;
      case 'matrix':
        return <MessageSquare className="w-3.5 h-3.5 text-[#000000]" />;
      case 'website':
        return <Globe className="w-3.5 h-3.5 text-[#0066cc]" />;
      default:
        return <Link2 className="w-3.5 h-3.5 text-neutral-600" />;
    }
  };

  const userCountry = state.selectedCountry || 'South Africa';
  const countryFlag = GLOBAL_COUNTRIES[userCountry] || '🇿🇦';

  const previewAvatarChar = state.realName.trim() ? state.realName.trim()[0].toUpperCase() : 'S';
  const safeMonikerVal = state.moniker.startsWith('@') ? state.moniker : `@${state.moniker}`;

  const qrUri = `milifeos://homestead/${state.moniker.replace('@', '')}?net=${state.currentRegion}`;

  return (
    <div className="bg-white border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5 relative">
      <div className="absolute -top-3.5 -left-2 bg-black text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1 no-print">
        [ {lang === 'xh' ? 'IKHADI LOBUNTU ELIPHILAYO' : 'Live Homestead Card'} ]
      </div>

      <div className="flex justify-between items-center pb-3 border-b-2 border-black mt-2">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#0D0D0D] flex items-center gap-1.5 no-print font-display">
          <span className="w-2.5 h-2.5 bg-[#FFFB00] border border-black rounded-none"></span>
          {t.myProfileStory} {lang === 'xh' ? '(Isampula)' : '(Preview)'}
        </span>
        
        {/* Dynamic theme colors */}
        <div className="flex items-center gap-1.5 no-print">
          <span className="text-[10px] text-gray-500 font-mono mr-1">Shade:</span>
          <button 
            type="button"
            onClick={() => setAccentColor('orange')}
            aria-label="Set warm style Orange"
            className={`w-3.5 h-3.5 rounded-none bg-[#ff9100] border border-black cursor-pointer ${accentColor === 'orange' ? 'ring-2 ring-black scale-110' : ''}`} 
          />
          <button 
            type="button"
            onClick={() => setAccentColor('purple')}
            aria-label="Set warm style Purple"
            className={`w-3.5 h-3.5 rounded-none bg-[#8c30f5] border border-black cursor-pointer ${accentColor === 'purple' ? 'ring-2 ring-black scale-110' : ''}`} 
          />
          <button 
            type="button"
            onClick={() => setAccentColor('green')}
            aria-label="Set warm style Green"
            className={`w-3.5 h-3.5 rounded-none bg-[#00aa6c] border border-black cursor-pointer ${accentColor === 'green' ? 'ring-2 ring-black scale-110' : ''}`} 
          />
          <button 
            type="button"
            onClick={() => setAccentColor('blue')}
            aria-label="Set warm style Blue"
            className={`w-3.5 h-3.5 rounded-none bg-[#0066cc] border border-black cursor-pointer ${accentColor === 'blue' ? 'ring-2 ring-black scale-110' : ''}`} 
          />
        </div>
      </div>

      {/* The Printable Card Frame in Brutalist Editorial Theme */}
      <div id="printable-anchor-card" className="bg-white border-2 border-black rounded-none p-5 flex flex-col gap-4.5 transition duration-300">
        
        {/* Head Details */}
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-none flex items-center justify-center font-black text-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${bgBtnColors[accentColor]}`}>
              {previewAvatarChar}
            </div>
            <div>
              <h3 className="text-lg font-black text-black tracking-tight font-display uppercase">{state.realName || 'Sipho Khumalo'}</h3>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-none border-2 border-black ${colors[accentColor]}`}>
                  {safeMonikerVal}
                </span>
                <span className="text-[10px] text-neutral-800 font-bold flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3 h-3 text-red-600 font-black" />
                  <span>{state.location || 'Cape Town'}</span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-sm leading-none" title={userCountry}>{countryFlag}</span>
                  <span className="uppercase tracking-tight text-[9px] text-neutral-650 font-black">{userCountry}</span>
                </span>
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono border-2 border-black bg-white text-black py-1 px-2.5 rounded-none font-bold flex items-center gap-1 system-tag-print">
            <Globe2 className="w-3 h-3 text-black" />
            <span>{state.currentRegion}_ACCORD</span>
          </span>
        </div>

        {/* Dynamic Registered Trades Badges Layer */}
        {state.selectedTrades && state.selectedTrades.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-0.5 -mt-2">
            <span className="text-[8px] uppercase tracking-wider font-mono font-black py-0.5 px-1.5 bg-black text-[#FFFB00] self-center">
              {state.classification === 'b2b' ? '🏭 B2B Enterprise' : '🛠️ Local Services'}
            </span>
            {state.selectedTrades.map((trade) => (
              <span key={trade} className="text-[9px] uppercase font-black px-2 py-0.5 bg-white text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] font-mono leading-none flex items-center">
                ⚙️ {trade}
              </span>
            ))}
          </div>
        )}

        {/* Dynamic blockquote line using premium italic serif font */}
        <div className={`border-l-4 ${borderLeftColors[accentColor]} pl-4 italic text-sm md:text-base text-black font-serif leading-relaxed pr-2`}>
          "{state.quote || 'Cultivating community fields and shared sunshine.'}"
        </div>

        {/* Dual voice podcast simulator */}
        <div className="bg-[#F4F2F0] border-2 border-black rounded-none p-4 flex flex-col gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-black text-black tracking-widest flex items-center gap-1 font-display">
              <Podcast className="w-3.5 h-3.5 stroke-[2.5]" />
              {t.audioGuideTitle}
            </span>
            <span className="text-[9px] font-mono text-neutral-700 font-bold bg-white px-2 py-0.5 border border-black">{formatTime(secs)} / 1:42</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border-2 border-black p-3">
            <p className="text-[10px] text-neutral-800 max-w-[210px] leading-tight font-sans font-medium">
              {lang === 'xh' 
                ? `Ingxoxo emnandi yelizwi elingambini ehloniphekileyo malunga neprojekthi ka-${state.realName || 'Sipho'} yasekuhlaleni.`
                : `A serene dual-voice audio conversation exploring ${state.realName || 'Sipho'}'s local project focus.`
              }
            </p>
            <button 
              type="button"
              onClick={toggleAudio} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black text-[11px] font-black py-1.5 px-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              {isPlaying 
                ? (lang === 'xh' ? 'YEMISA IBHALI' : 'PAUSE STORY') 
                : (lang === 'xh' ? 'PHULA-PHULA' : 'PLAY PODCAST')
              }
            </button>
          </div>
          <div className="w-full bg-white border-2 border-black rounded-none h-3 relative overflow-hidden p-[2px]">
            <div 
              className="bg-black h-full transition-all duration-300" 
              style={{ width: `${(secs / 102) * 100}%` }}
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-1">
          <span className="text-[9px] uppercase tracking-widest font-black text-neutral-400 block mb-1 font-mono">[ {lang === 'xh' ? 'IKHAYA NEENJONGO' : 'Passion & Contributions'} ]</span>
          <p className="text-xs text-[#0D0D0D] leading-relaxed font-sans font-medium">
            {state.bio || (lang === 'xh' ? 'Yabelana ngobuntu bakho, iinjongo zoluntu...' : 'Sharing roots, local fields, and reciprocal actions...')}
          </p>
        </div>

        {/* Split and render list of pillars with brutalist layout stamps */}
        <div className="flex flex-wrap gap-1.5">
          {state.pillars.split(',').map((p, index) => {
            const cleanP = p.trim();
            if (!cleanP) return null;
            return (
              <span key={index} className="text-[10px] font-black uppercase bg-white border-2 border-black px-2.5 py-1 rounded-none flex items-center gap-1 text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                {getPillarIcon(cleanP)}
                {cleanP}
              </span>
            );
          })}
        </div>

        {/* Consolidated Digital Scatter Ledger */}
        <div className="bg-white border-2 border-black p-4 flex flex-col gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block font-mono leading-none">
            [ {lang === 'xh' ? 'IZINTO ZELEJA EZIDITYANISIWEYO' : 'GATHERED DIGITAL SCATTER'} ]
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans">
            {(state.digitalScatter || []).map((chan) => (
              <div key={chan.id} className="flex items-center gap-2 bg-[#F4F2F0] border-2 border-black p-2 rounded-none transition-all hover:bg-neutral-100 overflow-hidden">
                <div className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center flex-shrink-0">
                  {getProviderIcon(chan.provider)}
                </div>
                <div className="min-w-0 flex-grow">
                  <span className="text-[8px] uppercase tracking-wider font-black text-neutral-500 font-mono block leading-none">{chan.label || chan.provider}</span>
                  <span className="text-[10px] font-mono font-bold text-black block truncate mt-1" title={chan.handle}>{chan.handle}</span>
                </div>
              </div>
            ))}

            {(!state.digitalScatter || state.digitalScatter.length === 0) && (
              <p className="text-[10px] text-neutral-500 font-serif italic py-1 leading-none col-span-2">
                {lang === 'xh' 
                  ? 'Akukho majelo akhoyo. Faka ii-imeyile okanye amagumbi encoko kwi-workspace yakho!' 
                  : 'No active scattered channels. Add email or spaces rooms inside your workspace configuration!'
                }
              </p>
            )}
          </div>
        </div>

        {/* Reciprocal support section */}
        <div className="bg-[#F4F2F0] border-2 border-black rounded-none p-4 flex flex-col gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[9px] uppercase font-black text-neutral-400 tracking-widest block font-mono">
            [ {lang === 'xh' ? 'UNCEDISWANO NEBANDLA' : 'RECIPROCAL NEIGHBOR EXCHANGE'} ]
          </span>
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <span className="text-xs font-black text-black block font-display uppercase">{state.currentRegion} {lang === 'xh' ? 'Isangqa soNcediswano' : 'Support Circle'}</span>
              <span className="text-[10px] text-neutral-600 block truncate max-w-[200px] font-mono font-bold" title={state.merchantKey}>
                {state.merchantKey 
                  ? `${lang === 'xh' ? 'Idilesi yoBukhosi' : 'Preferred Address'}: ${state.merchantKey}` 
                  : (lang === 'xh' ? 'Akukho wallet ifunekayo, siphathana ngezandla!' : "No wallet needed, direct bartering welcome!")
                }
              </span>
            </div>
            <button 
              type="button"
              onClick={() => {
                if (!state.merchantKey) {
                  onShowToast(lang === 'xh' 
                    ? `${state.realName || 'UMNIKAZI'} usebenza ngokupheleleyo ngesandla se-cooperative, ngaphandle kwemali!` 
                    : `${state.realName || 'Owner'} runs purely on cooperative, non-monetary handshake exchange!`, false);
                } else {
                  onShowToast(`Redirecting to support local creator ecosystem: ${state.merchantKey}`);
                }
              }} 
              className="bg-black hover:bg-[#FFFB00] hover:text-black text-white border-2 border-black text-[10px] font-black py-1.5 px-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              {lang === 'xh' ? 'NCEDISA OSOMASHISHINI' : 'SUPPORT WORKER'}
            </button>
          </div>
        </div>

        {/* Recovery Identity Vault with stamp style seeds & QR */}
        <div className="border-t-2 border-black pt-4 flex flex-col gap-4">
          <div>
            <label className="block text-[9px] uppercase font-black text-neutral-400 tracking-widest mb-2 font-mono">
              [ {t.sharedValues.toUpperCase()} ]
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-sans">
              {currentSeeds.map((word, idx) => (
                <div key={idx} className="seed-word bg-white border-2 border-black p-1.5 rounded-none text-[10px] flex items-center gap-1.5 font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-neutral-500 font-bold text-[8px]">{idx + 1}.</span>
                  <strong className="text-black font-black font-mono uppercase">{word}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Local high-fidelity QR Code block containing structural tag name */}
          <div className="flex flex-col items-center justify-center p-3 mt-1 bg-[#F4F2F0] border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative">
            <span className="absolute top-2 left-2 text-[8px] font-black uppercase text-neutral-500 font-mono">[ HOMESTEAD_CARD_LINK ]</span>
            <div className="pt-4">
              <SovereignQRCode value={qrUri} />
            </div>
            <span className="text-[9px] text-neutral-800 font-mono font-bold mt-3 select-all overflow-hidden text-ellipsis max-w-full text-center py-1 px-2 border border-black bg-white">
              {qrUri}
            </span>
          </div>
        </div>

        {/* Verified Ledger Badge */}
        <div className="flex items-center justify-between text-[9px] text-neutral-500 font-mono border-t-2 border-black pt-3 font-bold uppercase tracking-wider">
          <span>{lang === 'xh' ? 'UMGUBHO WENTSEBENZISWANO' : 'COOPERATIVE CIRCLE'}</span>
          <span>{lang === 'xh' ? 'IXABISO LABANTU LIQINISEKISIWEYO' : 'HUMAN VALUE GUARANTEED'}</span>
        </div>

      </div>

      {/* Preview Actions */}
      <div className="grid grid-cols-2 gap-2 mt-2 no-print font-display">
        <button 
          onClick={handlePrint} 
          className="w-full bg-white hover:bg-neutral-100 border-2 border-black py-2.5 px-4 rounded-none text-xs font-black text-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Printer className="w-4 h-4 text-black stroke-[2.5]" />
          {lang === 'xh' ? 'Shicilela Ikhadi' : 'Print Story Stamp'}
        </button>
        <button 
          onClick={handleClone} 
          className="w-full bg-white hover:bg-neutral-100 border-2 border-black py-2.5 px-4 rounded-none text-xs font-black text-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Copy className="w-4 h-4 stroke-[2.5]" />
          {lang === 'xh' ? 'Gcina Isithuba' : 'Save Local Space'}
        </button>
      </div>
      
      <button 
        onClick={handleCopyLink} 
        className="w-full bg-black hover:bg-[#FFFB00] hover:text-black border-2 border-black py-2.5 px-4 rounded-none text-xs font-black text-white flex items-center justify-center gap-1.5 transition no-print cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] font-display"
      >
        <Share2 className="w-4 h-4 text-[#00aa6c] stroke-[2.5]" />
        {lang === 'xh' ? 'Yabelana Idilesi yoBukhosi Bakho' : 'Share My Homestead Stamp Address'}
      </button>
    </div>
  );
}
