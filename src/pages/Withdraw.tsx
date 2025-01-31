import { useState } from "react";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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

  const handleAddAccount = () => {
    if (!newAccount.type || !newAccount.name || !newAccount.key) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
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
                  onChange={(e) => setNewAccount({ ...newAccount, key: e.target.value })}
                  placeholder="Digite a chave PIX"
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
                />
              </div>

              <Button 
                onClick={handleWithdraw}
                className="w-full"
                disabled={!selectedAccountId || !withdrawalAmount}
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