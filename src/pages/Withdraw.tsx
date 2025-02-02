import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PixAccountForm } from "@/components/withdraw/PixAccountForm";
import { SavedPixAccounts } from "@/components/withdraw/SavedPixAccounts";

const Withdraw = () => {
  const { toast } = useToast();
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  // Mock data for testing - this would normally come from the database
  const mockInvestmentData = {
    available_balance: 1000.00,
  };

  // Fetch available balance
  const { data: investmentData } = useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      // Use mock data for testing if no real data exists
      return data || mockInvestmentData;
    },
  });

  const { refetch: refetchPixAccounts } = useQuery({
    queryKey: ['pix_accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pix_accounts')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  const handleWithdraw = () => {
    if (!selectedAccountId || !withdrawalAmount) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma conta e insira um valor",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawalAmount);
    const availableBalance = investmentData?.available_balance || 0;

    if (amount > availableBalance) {
      toast({
        title: "Erro",
        description: "Saldo insuficiente para realizar o saque",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement withdrawal logic
    toast({
      title: "Sucesso",
      description: `Saque de R$ ${withdrawalAmount} solicitado com sucesso`,
    });
    setWithdrawalAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Saque</h1>
          
          {/* Available Balance */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Saldo Disponível</h2>
            <p className="text-3xl font-bold text-gray-900">
              R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
            </p>
          </Card>

          {/* Add New PIX Account */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Adicionar Nova Conta PIX</h2>
            <PixAccountForm onAccountAdded={refetchPixAccounts} />
          </Card>

          {/* Saved Accounts */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Contas Salvas</h2>
            <SavedPixAccounts
              selectedAccountId={selectedAccountId}
              onSelectAccount={setSelectedAccountId}
              refetchAccounts={refetchPixAccounts}
            />
          </Card>

          {/* Withdrawal Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Realizar Saque</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor do Saque
                </label>
                <Input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="Digite o valor do saque"
                  max={investmentData?.available_balance || 0}
                />
              </div>

              <Button 
                onClick={handleWithdraw}
                className="w-full"
                disabled={!selectedAccountId || !withdrawalAmount || parseFloat(withdrawalAmount) > (investmentData?.available_balance || 0)}
              >
                Sacar
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Withdraw;