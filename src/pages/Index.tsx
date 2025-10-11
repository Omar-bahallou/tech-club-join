import RegistrationForm from "@/components/RegistrationForm";
import techHero from "@/assets/tech-hero.jpg";
import { Code2, Users, Rocket } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${techHero})` }}
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Rejoignez-nous</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Club de Technologie
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Explorez, apprenez et innovez avec une communauté passionnée de tech
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="bg-[var(--gradient-card)] p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
              <Code2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Projets Tech</h3>
              <p className="text-muted-foreground">Travaillez sur des projets innovants et développez vos compétences</p>
            </div>
            
            <div className="bg-[var(--gradient-card)] p-6 rounded-xl border border-border hover:border-secondary/50 transition-all hover:shadow-[0_0_20px_hsl(var(--secondary)/0.2)]">
              <Users className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Communauté</h3>
              <p className="text-muted-foreground">Connectez-vous avec des passionnés et partagez vos connaissances</p>
            </div>
            
            <div className="bg-[var(--gradient-card)] p-6 rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)]">
              <Rocket className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">Participez à des hackathons et challenges techniques</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-border shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Inscription
                </h2>
                <p className="text-muted-foreground">
                  Remplissez le formulaire pour rejoindre notre communauté
                </p>
              </div>
              
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Club de Technologie. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
