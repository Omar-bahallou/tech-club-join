import { useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import logo from "@/assets/alpha-byte-logo.png";

interface MembershipCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberNumber: number;
  onNewRegistration: () => void;
}

export default function MembershipCard ({
  firstName,
  lastName,
  email,
  phone,
  memberNumber,
  onNewRegistration,
}: MembershipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
    });
    
    const link = document.createElement("a");
    link.download = `carte-membre-${firstName}-${lastName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div
        ref={cardRef}
        className="relative w-full max-w-md aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Card content */}
        <div className="relative h-full p-6 flex flex-col justify-between text-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <img src={logo} alt="Club Logo" className="w-16 h-16 object-contain" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider opacity-80">Carte Membre</p>
              <p className="text-2xl font-bold">#{String(memberNumber).padStart(4, "0")}</p>
            </div>
          </div>

          {/* Member info */}
          <div className="space-y-1">
            <p className="text-2xl font-bold tracking-wide">
              {firstName} {lastName}
            </p>
            <p className="text-sm opacity-90">{email}</p>
            <p className="text-sm opacity-90">{phone}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-xs opacity-70">Alpha Byte Club</p>
            <p className="text-xs opacity-70">
              {new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button
          onClick={handleDownload}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
        >
          <Download className="w-5 h-5 mr-2" />
          Télécharger la carte
        </Button>
        <Button
          onClick={onNewRegistration}
          variant="outline"
          className="flex-1 py-6 text-lg"
        >
          Nouvelle inscription
        </Button>
      </div>
    </div>
  );
}
