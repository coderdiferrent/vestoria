
import { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const generateTransactions = () => {
  const depositNames = [
    "João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", 
    "Carlos Ferreira", "Mariana Lima", "Lucas Souza", "Julia Pereira",
    "Gabriel Rodrigues", "Beatriz Almeida", "Rafael Costa", "Camila Santos",
    "Fernando Silva", "Isabella Lima", "Thiago Oliveira"
  ];

  const withdrawalNames = [
    "Roberto Alves", "Patricia Lima", "Diego Santos", "Carla Silva",
    "Marcelo Costa", "Amanda Oliveira", "Bruno Ferreira", "Larissa Souza",
    "Ricardo Pereira", "Vanessa Lima", "Paulo Santos", "Bianca Silva",
    "Gustavo Costa", "Carolina Lima", "Leonardo Oliveira"
  ];
  
  const possibleAmounts = [50, 100, 200, 500, 1000, 10000];
  
  const deposits = Array.from({ length: 15 }, (_, index) => ({
    name: depositNames[index],
    amount: index === 0 ? 10000 : possibleAmounts[Math.floor(Math.random() * (possibleAmounts.length - 1))],
    date: new Date().toLocaleDateString('pt-BR')
  }));

  const withdrawals = Array.from({ length: 15 }, (_, index) => ({
    name: withdrawalNames[index],
    amount: index === 0 ? 10000 : possibleAmounts[Math.floor(Math.random() * (possibleAmounts.length - 1))],
    date: new Date().toLocaleDateString('pt-BR')
  }));

  return { deposits, withdrawals };
};

const RecentTransactions = () => {
  const [transactions] = useState(generateTransactions());
  const [activeTab, setActiveTab] = useState("deposits");

  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50 section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 bg-blue-100 px-4 py-1 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Movimentações Recentes</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Últimos Depósitos e Saques
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sem taxas ocultas. Veja as últimas movimentações em nossa plataforma.
          </p>
        </div>

        <Tabs 
          defaultValue="deposits" 
          className="max-w-4xl mx-auto"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-blue-100 rounded-xl shadow-sm p-1">
            <TabsTrigger 
              value="deposits" 
              className={cn(
                "flex items-center gap-2 rounded-lg transition-all duration-300",
                activeTab === "deposits" 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" 
                  : "text-gray-600 hover:bg-blue-50"
              )}
            >
              <ArrowUpCircle className="w-4 h-4" />
              Últimos Depósitos
            </TabsTrigger>
            <TabsTrigger 
              value="withdrawals" 
              className={cn(
                "flex items-center gap-2 rounded-lg transition-all duration-300",
                activeTab === "withdrawals" 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" 
                  : "text-gray-600 hover:bg-purple-50"
              )}
            >
              <ArrowDownCircle className="w-4 h-4" />
              Últimos Saques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposits">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {transactions.deposits.map((transaction, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 h-full bg-white border-blue-100 hover:border-blue-300 rounded-xl overflow-hidden group">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
                          <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                          <p className="text-blue-600 font-bold">
                            + R$ {transaction.amount.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static translate-y-0 left-0 mr-2 bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300" />
                <CarouselNext className="relative static translate-y-0 right-0 bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300" />
              </div>
            </Carousel>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {transactions.withdrawals.map((transaction, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 h-full bg-white border-purple-100 hover:border-purple-300 rounded-xl overflow-hidden group">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="flex items-center bg-purple-50 px-3 py-1.5 rounded-full">
                          <ArrowDownCircle className="w-4 h-4 text-purple-500 mr-1" />
                          <p className="text-purple-600 font-bold">
                            - R$ {transaction.amount.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static translate-y-0 left-0 mr-2 bg-white border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300" />
                <CarouselNext className="relative static translate-y-0 right-0 bg-white border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300" />
              </div>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RecentTransactions;
