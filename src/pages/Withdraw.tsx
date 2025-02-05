import { useState } from "react";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PixAccountForm } from "@/components/withdraw/PixAccountForm";
import { SavedPixAccounts } from "@/components/withdraw/SavedPixAccounts";
import { useInvestmentData } from "@/hooks/use-investment-data";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays, addDays } from "date-fns";
import { Lock } from "lucide-react";

const Withdraw = () => {
  const { toast } = useToast();
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const { data: investmentData, refetch: refetchInvestmentData } = useInvestmentData();

  // Calculate next earnings release
  const investmentDate = investmentData?.created_at ? new Date(investmentData.created_at) : new Date();
  const nextReleaseDate = addDays(investmentDate, 10);
  const daysUntilNextRelease = Math.max(0, differenceInDays(nextReleaseDate, new Date()));
  const canWithdrawEarnings = daysUntilNextRelease === 0;

  const handleWithdraw = async () => {
    if (!selectedAccountId || !withdrawalAmount) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma conta e insira um valor",
        variant: "destructive",
      });
      return;
    }

    if (!canWithdrawEarnings) {
      toast({
        title: "Erro",
        description: `Seus rendimentos estarão disponíveis em ${daysUntilNextRelease} ${daysUntilNextRelease === 1 ? 'dia' : 'dias'}`,
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

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado",
          variant: "destructive",
        });
        return;
      }

      // Update investment balance
      const { error: investmentError } = await supabase
        .from('investments')
        .update({
          available_balance: availableBalance - amount
        })
        .eq('user_id', user.id);

      if (investmentError) throw investmentError;

      // Record the withdrawal transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'withdrawal',
          amount: amount,
          description: 'Saque via PIX'
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Sucesso",
        description: `Saque de R$ ${amount.toFixed(2)} realizado com sucesso`,
      });
      
      setWithdrawalAmount("");
      refetchInvestmentData();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Saque</h1>
          
          {/* Available Balance */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-4">Saldo Disponível</h2>
                <p className="text-3xl font-bold text-gray-900">
                  R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
                </p>
              </div>
              {!canWithdrawEarnings && (
                <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
                  <Lock className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm text-yellow-600">
                    Próximo saque em {daysUntilNextRelease} {daysUntilNextRelease === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Add New PIX Account */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Adicionar Nova Conta PIX</h2>
            <PixAccountForm onAccountAdded={refetchInvestmentData} />
          </Card>

          {/* Saved Accounts */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Contas Salvas</h2>
            <SavedPixAccounts
              selectedAccountId={selectedAccountId}
              onSelectAccount={setSelectedAccountId}
              refetchAccounts={refetchInvestmentData}
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
                  disabled={!canWithdrawEarnings}
                />
              </div>

              <Button 
                onClick={handleWithdraw}
                className="w-full"
                disabled={!selectedAccountId || !withdrawalAmount || !canWithdrawEarnings || parseFloat(withdrawalAmount) > (investmentData?.available_balance || 0)}
              >
                {canWithdrawEarnings ? 'Sacar' : `Próximo saque em ${daysUntilNextRelease} ${daysUntilNextRelease === 1 ? 'dia' : 'dias'}`}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Withdraw;