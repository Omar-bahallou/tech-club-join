import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const techInterests = [
  { id: "web", label: "Développement Web" },
  { id: "mobile", label: "Applications Mobiles" },
  { id: "ai", label: "Intelligence Artificielle" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "cybersec", label: "Cybersécurité" },
  { id: "data", label: "Data Science" },
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide").optional().or(z.literal("")),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins un domaine d'intérêt"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interests: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    toast.success("Inscription réussie !", {
      description: "Nous vous contacterons bientôt.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <CheckCircle2 className="w-24 h-24 text-primary relative" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bienvenue au club !
          </h3>
          <p className="text-muted-foreground text-lg">
            Votre inscription a été enregistrée avec succès.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
          variant="outline"
          className="mt-4"
        >
          Nouvelle inscription
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} className="bg-input border-border transition-all focus:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} className="bg-input border-border transition-all focus:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jean.dupont@email.com" {...field} className="bg-input border-border transition-all focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone (optionnel)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} className="bg-input border-border transition-all focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Domaines d'intérêt</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {techInterests.map((interest) => (
                  <FormField
                    key={interest.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(interest.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), interest.id]
                                : field.value?.filter((value) => value !== interest.id) || [];
                              field.onChange(newValue);
                            }}
                            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {interest.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
        >
          S'inscrire au club
        </Button>
      </form>
    </Form>
  );
}
