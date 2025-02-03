import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useInvestmentData } from "@/hooks/use-investment-data";

const INVESTMENT_VALUES = [
  50, 100, 200, 500, 1000, 1500, 3000, 5000, 
  10000, 15000, 30000, 50000
];

const Investment = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<number>(100);
  const { data: investmentData, refetch: refetchInvestmentData } = useInvestmentData();

  const handleInvestment = async () => {
    try {
      if (!selectedValue) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um valor para investir.",
          variant: "destructive",
        });
        return;
      }

      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado.",
          variant: "destructive",
        });
        return;
      }

      // If user already has an investment record, update it
      if (investmentData) {
        const { error } = await supabase
          .from('investments')
          .update({
            total_invested: Number(investmentData.total_invested) + selectedValue,
          })
          .eq('user_id', user.data.user.id);

        if (error) throw error;
      } else {
        // Create new investment record
        const { error } = await supabase
          .from('investments')
          .insert({
            user_id: user.data.user.id,
            total_invested: selectedValue,
            available_balance: 0,
            earnings_balance: 0,
          });

        if (error) throw error;
      }

      await refetchInvestmentData();

      toast({
        title: "Sucesso",
        description: `Investimento de R$ ${selectedValue.toLocaleString('pt-BR')} realizado com sucesso!`,
      });

      // Redirect to home page after successful investment
      navigate('/home');
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar seu investimento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    const nearestValue = INVESTMENT_VALUES.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    setSelectedValue(nearestValue);
  };

  // Calculate slider value as percentage of max value
  const sliderValue = [(selectedValue / 50000) * 100];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Investir</h1>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Selecione o valor do investimento</h2>
            
            <div className="space-y-8">
              <div className="text-center text-3xl font-bold text-primary">
                R$ {selectedValue.toLocaleString('pt-BR')}
              </div>
              
              <Slider
                value={sliderValue}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                className="my-4"
              />
              
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