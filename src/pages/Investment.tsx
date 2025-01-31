import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const INVESTMENT_VALUES = [
  50, 100, 200, 500, 1000, 1500, 3000, 5000, 
  10000, 15000, 30000, 50000
];

const Investment = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch current investment data
  const { data: investmentData } = useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  // Mutation to update investment
  const investMutation = useMutation({
    mutationFn: async (amount: number) => {
      const { data: existingData, error: fetchError } = await supabase
        .from('investments')
        .select('*')
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingData) {
        // Update existing investment record
        const { error } = await supabase
          .from('investments')
          .update({
            total_invested: existingData.total_invested + amount,
            available_balance: existingData.available_balance + amount,
          })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (error) throw error;
      } else {
        // Create new investment record
        const { error } = await supabase
          .from('investments')
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            total_invested: amount,
            available_balance: amount,
            earnings_balance: 0,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast({
        title: "Sucesso",
        description: `Investimento de R$ ${selectedValue?.toLocaleString('pt-BR')} realizado com sucesso!`,
      });
      setSelectedValue(null);
    },
    onError: (error) => {
      console.error('Investment error:', error);
      toast({
        title: "Erro",
        description: "Não foi possível realizar o investimento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleInvestment = () => {
    if (!selectedValue) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um valor para investir.",
        variant: "destructive",
      });
      return;
    }

    investMutation.mutate(selectedValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Investir</h1>
            <p className="text-gray-600">
              Selecione o valor que deseja investir
            </p>
          </div>
          
          <Card className="p-6">
            {/* Current Investment Summary */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Resumo dos Investimentos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Investido</p>
                  <p className="text-lg font-semibold">
                    R$ {investmentData?.total_invested?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Saldo Disponível</p>
                  <p className="text-lg font-semibold">
                    R$ {investmentData?.available_balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rendimentos</p>
                  <p className="text-lg font-semibold">
                    R$ {investmentData?.earnings_balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                  </p>
                </div>
              </div>
            </div>

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
                disabled={!selectedValue || investMutation.isPending}
              >
                {investMutation.isPending ? "Processando..." : "Investir Agora"}
              </Button>
            </div>
          </Card>

          {/* Investment Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Os investimentos são processados em até 24 horas úteis</li>
              <li>O valor mínimo para investimento é de R$ 50,00</li>
              <li>Rendimentos são calculados diariamente e creditados mensalmente</li>
              <li>Para saques, utilize a opção "Sacar" no menu principal</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Investment;