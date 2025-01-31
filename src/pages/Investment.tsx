import { useState } from "react";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const INVESTMENT_VALUES = [
  50, 100, 200, 500, 1000, 1500, 3000, 5000, 
  10000, 15000, 30000, 50000
];

const Investment = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleInvestment = () => {
    if (!selectedValue) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um valor para investir.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement investment logic
    toast({
      title: "Sucesso",
      description: `Investimento de R$ ${selectedValue.toLocaleString('pt-BR')} realizado com sucesso!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Investir</h1>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Selecione o valor do investimento</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INVESTMENT_VALUES.map((value) => (
                <Button
                  key={value}
                  variant={selectedValue === value ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedValue(value)}
                >
                  R$ {value.toLocaleString('pt-BR')}
                </Button>
              ))}
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full md:w-auto"
                onClick={handleInvestment}
                disabled={!selectedValue}
              >
                Investir Agora
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Investment;