
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const UserReviewForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    review: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.review) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback. Sua avaliação foi registrada com sucesso.",
    });
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      review: ""
    });
    
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 section-transition">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">
                Deixe sua avaliação
              </CardTitle>
              <p className="text-gray-600">
                Conte-nos sobre sua experiência com nossa plataforma
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Digite seu email"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review">Sua Avaliação</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => handleInputChange("review", e.target.value)}
                    placeholder="Conte-nos sobre sua experiência com nossa plataforma..."
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserReviewForm;
