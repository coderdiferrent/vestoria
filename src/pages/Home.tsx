import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vestoria</h1>
          <p className="text-xl text-gray-600">Duplique seus ganhos em 40 dias!</p>
        </div>

        {/* Investment Overview */}
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

        {/* Chart */}
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">
                <Wallet className="mr-2 h-4 w-4" />
                Investir
              </Button>
              <Button variant="outline" className="w-full">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Solicitar Saque
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Suporte
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Programa de Indicação</h3>
            <p className="text-gray-600 mb-4">
              Indique amigos e ganhe bônus sobre os investimentos deles!
            </p>
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Convidar Amigos
            </Button>
          </Card>
        </div>
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