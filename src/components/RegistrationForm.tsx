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
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import MembershipCard from "./MembershipCard";

const formSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().regex(/^(\+212|0)[67]\d{8}$/, "Numéro de téléphone invalide"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [memberNumber, setMemberNumber] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        'service_a8x88vu',
        'template_lcaeer3',
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        '34mE6w02W-5vKFq5F'
      );

      setSubmittedData(data);
      setMemberNumber(Math.floor(Math.random() * 9000) + 1000);
      setIsSubmitted(true);
      toast.success("Inscription réussie !", {
        description: "Votre carte de membre est prête.",
      });
    } catch (error) {
      console.error("Error sending registration:", error);
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer plus tard.",
      });
    }
  };

  const handleNewRegistration = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    form.reset();
  };

  if (isSubmitted && submittedData) {
    return (
      <MembershipCard
        firstName={submittedData.firstName}
        lastName={submittedData.lastName}
        email={submittedData.email}
        phone={submittedData.phone}
        memberNumber={memberNumber}
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
