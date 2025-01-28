import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  BarChart,
  Settings,
  Users,
  Wallet,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  MessageSquare,
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
  const navigate = useNavigate();
  const accountBalance = 5000; // Example balance

  const handleWithdrawal = (amount: number) => {
    if (amount > accountBalance) {
      toast.error("Saldo insuficiente para saque");
      return;
    }
    if (amount <= 0) {
      toast.error("Digite um valor válido para saque");
      return;
    }
    toast.success("Solicitação de saque enviada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <BarChart className="w-4 h-4" />
                    <span>Visão Geral</span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Investimentos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <Wallet className="w-4 h-4" />
                    <span>Novo Investimento</span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Suporte</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    <span>Central de Ajuda</span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

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
                  <h3 className="text-lg font-semibold">Rendimento Atual</h3>
                  <ArrowUpRight className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">R$ 750,00</p>
                <p className="text-sm text-gray-500">30 dias restantes</p>
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
                  Saldo disponível: R$ {accountBalance.toFixed(2)}
                </p>
                <Input
                  type="number"
                  placeholder="Digite o valor para saque"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value > accountBalance) {
                      toast.error("Valor maior que o saldo disponível");
                    }
                  }}
                />
                <Button
                  className="w-full"
                  onClick={() => {
                    const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                    handleWithdrawal(parseFloat(input.value));
                  }}
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
                <Input readOnly value="https://vestoria.com/ref/123456" />
                <Button className="w-full">Copiar Link de Indicação</Button>
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

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Contato
                  </a>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
