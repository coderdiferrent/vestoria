import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  BarChart,
  Settings,
  Users,
  Wallet,
  HelpCircle,
  ArrowUpRight,
  Mail,
  MessageSquare,
  Copy,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", amount: 1000 },
  { name: "Fev", amount: 2000 },
  { name: "Mar", amount: 3000 },
  { name: "Abr", amount: 4000 },
  { name: "Mai", amount: 5000 },
];

const Home = () => {
  const [availableBalance, setAvailableBalance] = useState(5000); // Example initial balance
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > availableBalance) {
      toast.error("Saldo insuficiente para saque");
      return;
    }
    if (amount <= 0) {
      toast.error("Digite um valor válido para saque");
      return;
    }
    setAvailableBalance(prev => prev - amount);
    toast.success("Solicitação de saque enviada com sucesso!");
    setWithdrawAmount("");
  };

  const handleCopyReferralLink = () => {
    const referralLink = "https://vestoria.com/ref/123456"; // Example referral link
    navigator.clipboard.writeText(referralLink)
      .then(() => toast.success("Link de indicação copiado!"))
      .catch(() => toast.error("Erro ao copiar link"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vestoria</h1>
          <p className="text-xl text-gray-600">Duplique seus ganhos em 40 dias!</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-6 gap-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invest" className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Investir
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Saque
            </TabsTrigger>
            <TabsTrigger value="referral" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Indicação
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Suporte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Investido</h3>
                  <ArrowUpRight className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">R$ 5.000,00</p>
                <p className="text-sm text-gray-500">+15% este mês</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Saldo Disponível</h3>
                  <Wallet className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">R$ {availableBalance.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Disponível para saque</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total de Indicações</h3>
                  <Users className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-gray-500">+3 esta semana</p>
              </Card>
            </div>
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Evolução do Investimento</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#4F46E5"
                      fill="#4F46E5"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="invest">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Fazer Novo Investimento</h3>
              <div className="space-y-4">
                <Input type="number" placeholder="Digite o valor do investimento" />
                <Button className="w-full">Investir Agora</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Solicitar Saque</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Saldo disponível: R$ {availableBalance.toFixed(2)}
                </p>
                <Input
                  type="number"
                  placeholder="Digite o valor para saque"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <Button
                  className="w-full"
                  onClick={handleWithdrawal}
                >
                  Solicitar Saque
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="referral">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Programa de Indicação</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value="https://vestoria.com/ref/123456"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleCopyReferralLink}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Link
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configurações da Conta</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full">
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full">
                  Preferências de Notificação
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:suporte@vestoria.com" className="text-primary hover:underline">
                    suporte@vestoria.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <a href="https://t.me/vestoria" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Telegram: @vestoria
                  </a>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      const supportTab = document.querySelector('[value="support"]');
                      if (supportTab instanceof HTMLElement) {
                        supportTab.click();
                      }
                    }}
                    className="text-gray-600 hover:text-primary"
                  >
                    Central de Ajuda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const supportTab = document.querySelector('[value="support"]');
                      if (supportTab instanceof HTMLElement) {
                        supportTab.click();
                      }
                    }}
                    className="text-gray-600 hover:text-primary"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  Twitter
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600">© 2024 Vestoria. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;