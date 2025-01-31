import { useState } from "react";
import { Check, Copy } from "lucide-react";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Referral = () => {
  const [copied, setCopied] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
  });

  const referralLink = `https://vestoria.com/register?ref=${user?.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Sucesso",
        description: "Link copiado para a área de transferência!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Programa de Indicação</h1>
            <p className="text-gray-600">
              Indique amigos e ganhe bônus em seus investimentos
            </p>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Seu Link de Indicação</h2>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <code className="flex-1 text-sm break-all">{referralLink}</code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Como Funciona</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Compartilhe</h3>
                  <p className="text-gray-600 text-sm">
                    Envie seu link de indicação para amigos
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Investimento</h3>
                  <p className="text-gray-600 text-sm">
                    Seus amigos realizam o primeiro investimento
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Bônus</h3>
                  <p className="text-gray-600 text-sm">
                    Receba 5% do primeiro investimento como bônus
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Termos e Condições</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>O bônus é calculado sobre o primeiro investimento do indicado</li>
              <li>O valor mínimo de investimento para ganhar o bônus é R$ 100,00</li>
              <li>O bônus é creditado em até 7 dias úteis após o investimento</li>
              <li>O programa pode ser alterado ou encerrado a qualquer momento</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Referral;