import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, MapPin, Globe } from "lucide-react";
import logo from "@/assets/alpha-byte-logo.png";
import cardBg from "@/assets/card-bg.jpg";

interface MembershipCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberNumber: number;
  interests: string[];
  onNewRegistration: () => void;
}

export default function MembershipCard({
  firstName,
  lastName,
  email,
  phone,
  memberNumber,
  interests,
  onNewRegistration,
}: MembershipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showBack, setShowBack] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
    
    const link = document.createElement("a");
    link.download = `carte-membre-${firstName}-${lastName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Card Container */}
      <div 
        className="relative w-full max-w-lg cursor-pointer perspective-1000"
        onClick={() => setShowBack(!showBack)}
      >
        <div
          ref={cardRef}
          className={`relative transition-transform duration-700 preserve-3d ${showBack ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of Card */}
          <div
            className={`relative w-full aspect-[1.75/1] rounded-xl overflow-hidden shadow-2xl ${showBack ? 'hidden' : 'block'}`}
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Geometric Accents */}
            <div className="absolute inset-0">
              {/* Top left accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24">
                <div className="absolute w-full h-full border-r-2 border-b-2 border-white/30 transform rotate-45 translate-x-8 -translate-y-4" />
              </div>
              
              {/* Bottom right accent */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48">
                <div className="absolute w-full h-full">
                  <div className="absolute bottom-12 right-12 w-32 h-32 border-l-4 border-t-4 border-white/40 transform -rotate-45" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 border-l-2 border-t-2 border-white/20 transform -rotate-45" />
                </div>
              </div>
            </div>

            {/* Circular Badge Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-36 h-36">
                {/* Outer ring with text */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer circle */}
                  <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  
                  {/* Main teal circle */}
                  <circle cx="100" cy="100" r="80" fill="#2d6a6a" stroke="#3d7a7a" strokeWidth="3" />
                  
                  {/* Inner decorative circle */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  
                  {/* Top curved text path */}
                  <defs>
                    <path id="topArc" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
                    <path id="bottomArc" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
                  </defs>
                  
                  {/* Top text */}
                  <text fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="400" letterSpacing="3">
                    <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                      ALPHA BYTE NETWORK
                    </textPath>
                  </text>
                  
                  {/* Bottom text */}
                  <text fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="300" letterSpacing="2">
                    <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                      YOUR TECH ONE NETWORK
                    </textPath>
                  </text>
                  
                  {/* Decorative dots */}
                  <circle cx="30" cy="100" r="3" fill="rgba(255,255,255,0.5)" />
                  <circle cx="170" cy="100" r="3" fill="rgba(255,255,255,0.5)" />
                </svg>
                
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={logo} alt="Alpha Byte Network" className="w-16 h-16 object-contain" />
                </div>
              </div>
            </div>

            {/* Member Number */}
            <div className="absolute top-4 right-4 text-right">
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Member</p>
              <p className="text-lg font-bold text-white">#{String(memberNumber).padStart(4, "0")}</p>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className={`relative w-full aspect-[1.75/1] rounded-xl overflow-hidden shadow-2xl ${showBack ? 'block' : 'hidden'}`}
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Geometric Accents */}
            <div className="absolute inset-0">
              <div className="absolute -bottom-8 -left-8 w-48 h-48">
                <div className="absolute w-full h-full">
                  <div className="absolute bottom-12 left-12 w-32 h-32 border-r-4 border-t-4 border-white/40 transform rotate-45" />
                  <div className="absolute bottom-8 left-8 w-24 h-24 border-r-2 border-t-2 border-white/20 transform rotate-45" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Logo and Name */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 tracking-wide">
                    {firstName.toUpperCase()} {lastName.toUpperCase()}
                  </h2>
                  <p className="text-sm text-white/80 tracking-widest uppercase mt-1">Member</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-xl font-serif">α</span>
                  <div className="w-px h-6 bg-white/30" />
                  <span className="text-amber-400 text-xs tracking-widest">ABN</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white/90">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">Ouarzazate</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">{email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">www.AlphaByteNetwork.com</span>
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-1.5">
                {interests.slice(0, 4).map((interest, index) => (
                  <span
                    key={index}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Alpha Byte Network text on right side */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
                Alpha Byte Network
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">Cliquez sur la carte pour la retourner</p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <Button
          onClick={handleDownload}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6 text-lg transition-all hover:shadow-[0_0_20px_hsl(45,100%,50%,0.3)]"
        >
          <Download className="w-5 h-5 mr-2" />
          Télécharger la carte
        </Button>
        <Button
          onClick={onNewRegistration}
          variant="outline"
          className="flex-1 py-6 text-lg border-white/20 hover:bg-white/5"
        >
          Nouvelle inscription
        </Button>
      </div>
    </div>
  );
}