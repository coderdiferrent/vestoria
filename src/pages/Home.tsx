
import AppHeader from "@/components/home/AppHeader";
import QuickActions from "@/components/home/QuickActions";
import SupportSection from "@/components/home/SupportSection";
import TransactionHistory from "@/components/home/TransactionHistory";
import { ArrowUp, TrendingUp, Users, Rocket, Wallet2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInvestmentData } from "@/hooks/use-investment-data";

const Home = () => {
  const { data: investmentData } = useInvestmentData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Página Inicial
              </h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo à sua central de investimentos
              </p>
            </div>
            <div className="flex gap-4">
              <QuickActions />
            </div>
          </div>

          {/* Investment Summary Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-400 to-blue-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-100">Total Investido</h3>
                  <p className="text-2xl font-bold mt-2">
                    R$ {investmentData?.total_invested?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <ArrowUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-blue-100">
                Seu capital inicial
              </p>
            </Card>
            
            <Card className="p-6 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-400 to-purple-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-purple-100">Saldo Disponível</h3>
                  <p className="text-2xl font-bold mt-2">
                    R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Wallet2 className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-purple-100">
                Rendimentos disponíveis para saque
              </p>
            </Card>
            
            <Card className="p-6 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-400 to-teal-500 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-green-100">Rendimentos Acumulados</h3>
                  <p className="text-2xl font-bold mt-2">
                    R$ {investmentData?.earnings_balance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-green-100">
                Lucro acumulado (5% ao dia)
              </p>
            </Card>
          </section>

          {/* Action Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="p-6 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-300 to-orange-400 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Faça Um Investimento</h3>
                <div className="bg-white/20 p-2 rounded-full">
                  <Rocket className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm mb-4">Comece a multiplicar seu dinheiro hoje mesmo com nossos planos exclusivos.</p>
              <Button variant="secondary" className="bg-white text-orange-500 hover:bg-white/90 shadow-lg" onClick={() => window.location.href = "/investments"}>
                Investir Agora
              </Button>
            </Card>
            
            <Card className="p-6 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Indique e Ganhe</h3>
                <div className="bg-white/20 p-2 rounded-full">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm mb-4">Convide amigos e ganhe bônus por cada novo investimento realizado.</p>
              <Button variant="secondary" className="bg-white text-indigo-500 hover:bg-white/90 shadow-lg" onClick={() => window.location.href = "/referral"}>
                Indicar Amigos
              </Button>
            </Card>
          </section>

          {/* Transaction History */}
          <section className="mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Card className="overflow-hidden border-none rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                <h2 className="text-xl font-bold">Histórico de Transações</h2>
                <p className="text-sm text-indigo-100">Acompanhe todas as suas movimentações</p>
              </div>
              <TransactionHistory />
            </Card>
          </section>

          {/* Support Section */}
          <section className="mt-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Card className="overflow-hidden border-none rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 text-white">
                <h2 className="text-xl font-bold">Precisa de Ajuda?</h2>
                <p className="text-sm text-teal-100">Nossa equipe está pronta para te auxiliar</p>
              </div>
              <div className="p-6">
                <SupportSection />
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
