import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PixAccount = {
  id: string;
  type: string;
  name: string;
  key: string;
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
};

const validateCPF = (cpf: string) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return value;
};

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const Withdraw = () => {
  const { toast } = useToast();
  const [pixAccounts, setPixAccounts] = useState<PixAccount[]>([]);
  const [newAccount, setNewAccount] = useState({
    type: "",
    name: "",
    key: "",
  });
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

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

  const validatePixKey = (type: string, key: string) => {
    switch (type) {
      case "email":
        return validateEmail(key);
      case "phone":
        return validatePhone(key);
      case "cpf":
        return validateCPF(key);
      case "random":
        return key.length > 0;
      default:
        return false;
    }
  };

  const formatPixKey = (type: string, key: string) => {
    switch (type) {
      case "phone":
        return formatPhone(key);
      case "cpf":
        return formatCPF(key);
      default:
        return key;
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedKey = formatPixKey(newAccount.type, e.target.value);
    setNewAccount({ ...newAccount, key: formattedKey });
  };

  const handleAddAccount = () => {
    if (!newAccount.type || !newAccount.name || !newAccount.key) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (!validatePixKey(newAccount.type, newAccount.key)) {
      toast({
        title: "Erro",
        description: `Formato inválido para ${newAccount.type.toUpperCase()}`,
        variant: "destructive",
      });
      return;
    }

    const account: PixAccount = {
      id: Date.now().toString(),
      ...newAccount,
    };

    setPixAccounts([...pixAccounts, account]);
    setNewAccount({ type: "", name: "", key: "" });
    toast({
      title: "Sucesso",
      description: "Conta PIX adicionada com sucesso",
    });
  };

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
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de PIX
                </label>
                <Select
                  value={newAccount.type}
                  onValueChange={(value) => setNewAccount({ ...newAccount, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de PIX" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="phone">Telefone</SelectItem>
                    <SelectItem value="random">Chave Aleatória</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <Input
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chave PIX
                </label>
                <Input
                  value={newAccount.key}
                  onChange={handleKeyChange}
                  placeholder={
                    newAccount.type === "email" ? "exemplo@email.com" :
                    newAccount.type === "phone" ? "(00) 00000-0000" :
                    newAccount.type === "cpf" ? "000.000.000-00" :
                    "Digite a chave PIX"
                  }
                />
              </div>

              <Button onClick={handleAddAccount} className="w-full">
                Salvar
              </Button>
            </div>
          </Card>

          {/* Saved Accounts */}
          {pixAccounts.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Contas Salvas</h2>
              <div className="space-y-4">
                {pixAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-4 border rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-gray-600">
                        {account.type.toUpperCase()}: {account.key}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedAccountId(account.id)}
                    >
                      Selecionar
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

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