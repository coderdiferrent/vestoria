
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useInvestmentData } from "@/hooks/use-investment-data";
import type { UseEmblaCarouselType } from "embla-carousel-react";

const investidoresDestaque = [
  { nome: "Maria Luzinara", valor: 10000, tag: "INVESTIDOR" },
  { nome: "Pedro Rogério", valor: 15000, tag: "INVESTIDOR" },
  { nome: "Araujo Silva", valor: 50000, tag: "INVESTIDOR" },
  { nome: "Ana Paula Santos", valor: 30000, tag: "INVESTIDOR" },
  { nome: "Carlos Eduardo", valor: 30000, tag: "INVESTIDOR" },
  { nome: "Fernanda Lima", valor: 15000, tag: "INVESTIDOR" },
  { nome: "Ricardo Almeida", valor: 30000, tag: "INVESTIDOR" },
  { nome: "Juliana Costa", valor: 50000, tag: "INVESTIDOR" },
  { nome: "Lucas Mendes", valor: 10000, tag: "INVESTIDOR" },
  { nome: "Patrícia Souza", valor: 15000, tag: "INVESTIDOR" }
];

const TopInvestorsCarousel = () => {
  const { data: investmentData } = useInvestmentData();
  const api = useRef<UseEmblaCarouselType[1] | null>(null);

  // Auto-play effect that advances the carousel every 1 second
  useEffect(() => {
    if (!api.current) return;

    const interval = setInterval(() => {
      if (api.current) {
        api.current.scrollNext();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const setApi = (newApi: UseEmblaCarouselType[1]) => {
    api.current = newApi;
  };

  return (
    <div className="bg-[#1A1F2C] rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <span className="text-[#6d6dff] font-semibold mb-2 inline-block">INVESTIDOR</span>
        <h2 className="text-2xl font-bold mb-3 text-white">Maiores Investidores</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Conheça nossos principais investidores e seus resultados extraordinários
        </p>
      </div>

      <Carousel 
        className="mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-4">
          {investidoresDestaque.map((investidor, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/4 lg:basis-1/5">
              <Card className="bg-[#222222] border-gray-700 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="bg-[#6d6dff] w-12 h-12 transform rotate-45 absolute -left-6 -top-6"></div>
                  <div className="p-6">
                    <span className="text-sm font-semibold text-[#6d6dff] mb-2 block">
                      {investidor.tag}
                    </span>
                    <h3 className="text-xl font-bold mb-3 text-white">{investidor.nome}</h3>
                    <p className="text-green-400 text-lg font-bold">
                      Investiu R$ {investidor.valor.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 text-white bg-[#333333]/80 hover:bg-[#333333] border-none" />
        <CarouselNext className="right-0 text-white bg-[#333333]/80 hover:bg-[#333333] border-none" />
      </Carousel>
    </div>
  );
};

export default TopInvestorsCarousel;
