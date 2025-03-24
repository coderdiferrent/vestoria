
import { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
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
    <section className="py-20 bg-white section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Últimos Depósitos e Saques</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sem taxas ocultas. Veja as últimas movimentações.
          </p>
        </div>

        <Tabs 
          defaultValue="deposits" 
          className="max-w-4xl mx-auto"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="deposits" className="flex items-center gap-2">
              <ArrowUpCircle className={cn(
                "w-4 h-4", 
                activeTab === "deposits" ? "text-blue-500" : "text-gray-500"
              )} />
              Últimos Depósitos
            </TabsTrigger>
            <TabsTrigger value="withdrawals" className="flex items-center gap-2">
              <ArrowDownCircle className={cn(
                "w-4 h-4", 
                activeTab === "withdrawals" ? "text-green-500" : "text-gray-500"
              )} />
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
                    <Card className="p-4 hover:shadow-md transition-all duration-300 h-full">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <p className="text-blue-500 font-bold">
                          + R$ {transaction.amount.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                <CarouselNext className="relative static translate-y-0 right-0" />
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
                    <Card className="p-4 hover:shadow-md transition-all duration-300 h-full">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <p className="text-green-500 font-bold">
                          - R$ {transaction.amount.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                <CarouselNext className="relative static translate-y-0 right-0" />
              </div>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RecentTransactions;
