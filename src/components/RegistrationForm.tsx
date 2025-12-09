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
import emailjs from "@emailjs/browser";
import { supabase } from "@/integrations/supabase/client";
import MembershipCard from "./MembershipCard";

const INTEREST_OPTIONS = [
  { id: "web", label: "Développement Web" },
  { id: "mobile", label: "Développement Mobile" },
  { id: "ai", label: "Intelligence Artificielle" },
  { id: "cybersecurity", label: "Cybersécurité" },
  { id: "data", label: "Data Science" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "iot", label: "IoT & Embarqué" },
  { id: "design", label: "UI/UX Design" },
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().regex(/^(\+212|0)[67]\d{8}$/, "Numéro de téléphone invalide"),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins un domaine d'intérêt"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [memberNumber, setMemberNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Save to Supabase database
      const { data: member, error } = await supabase
        .from('members')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          interests: data.interests.map(id => 
            INTEREST_OPTIONS.find(opt => opt.id === id)?.label || id
          ),
        } as any)
        .select('member_number')
        .single();

      if (error) throw error;

      // Send email notification
      await emailjs.send(
        'service_a8x88vu',
        'template_lcaeer3',
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          interests: data.interests.map(id => 
            INTEREST_OPTIONS.find(opt => opt.id === id)?.label || id
          ).join(", "),
        },
        '34mE6w02W-5vKFq5F'
      );

      setSubmittedData(data);
      setMemberNumber(member.member_number);
      setIsSubmitted(true);
      toast.success("Inscription réussie !", {
        description: "Votre carte de membre est prête.",
      });
    } catch (error) {
      console.error("Error sending registration:", error);
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRegistration = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    form.reset();
  };

  const getInterestLabels = (ids: string[]) => {
    return ids.map(id => INTEREST_OPTIONS.find(opt => opt.id === id)?.label || id);
  };

  if (isSubmitted && submittedData) {
    return (
      <MembershipCard
        firstName={submittedData.firstName}
        lastName={submittedData.lastName}
        email={submittedData.email}
        phone={submittedData.phone}
        memberNumber={memberNumber}
        interests={getInterestLabels(submittedData.interests)}
        onNewRegistration={handleNewRegistration}
      />
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
                  <Input placeholder="Omar" {...field} className="bg-input border-border transition-all focus:border-primary" />
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
                  <Input placeholder="Bahallou" {...field} className="bg-input border-border transition-all focus:border-primary" />
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
                <Input type="email" placeholder="omar@email.com" {...field} className="bg-input border-border transition-all focus:border-primary" />
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
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+212 612345678" {...field} className="bg-input border-border transition-all focus:border-primary" />
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
              <FormLabel>Domaines d'intérêt * (sélectionnez au moins un)</FormLabel>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {INTEREST_OPTIONS.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== option.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {option.label}
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
