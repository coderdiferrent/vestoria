import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  TrendingUp, 
  HeadphonesIcon, 
  Users,
  LogIn,
  UserPlus,
  Wallet,
  ListChecks,
  Trophy,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Landing = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Retorno Garantido",
      description: "Duplique seus investimentos em apenas 40 dias"
    },
    {
      icon: Shield,
      title: "Segurança Máxima",
      description: "Sua segurança é nossa prioridade"
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte 24/7",
      description: "Estamos sempre disponíveis para ajudar"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Faça parte de uma comunidade de investidores"
    }
  ];

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Registre-se e Faça Login",
      description: "Criar uma conta é o primeiro passo. Depois, basta fazer login para acessar sua área exclusiva."
    },
    {
      number: "02",
      icon: Wallet,
      title: "Adicione Fundos",
      description: "Escolha um método de pagamento e adicione fundos à sua conta de forma rápida e segura."
    },
    {
      number: "03",
      icon: ListChecks,
      title: "Selecione um Serviço",
      description: "Escolha os serviços que deseja e prepare-se para receber mais visibilidade e resultados."
    },
    {
      number: "04",
      icon: Trophy,
      title: "Aproveite os Super Resultados",
      description: "Quando seu investimento for realizado, somente aproveitar os rendimentos e acumular o patrimônio."
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      text: "Comecei com R$ 1.000 e em 40 dias já estava com R$ 2.000. Simplesmente incrível!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      name: "Ana Paula",
      text: "A melhor plataforma de investimentos que já utilizei. Suporte excepcional!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    }
  ];

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

  const [transactions] = useState(generateTransactions());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-transition').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center animate-fade-in">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/075d72e8-62cc-4d2f-8bcc-74c56c805993.png" 
            alt="Vestoria Logo" 
            className="h-12" 
          />
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 hover-scale"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Button>
      </header>

      <section className="container mx-auto px-4 py-20 text-center section-transition">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-typewriter">
          Duplique seus ganhos em 40 dias
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Comece agora mesmo a investir na plataforma mais segura e rentável do mercado
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/register")}
          className="text-lg px-8 py-6 hover-scale animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          Comece agora mesmo
        </Button>
      </section>

      <section className="py-20 bg-white section-transition">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra como é fácil começar a usar nossa plataforma e alcançar resultados incríveis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="p-6 bg-white rounded-xl shadow-lg hover-scale transition-shadow duration-300 relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div className="mb-6 text-primary">
                  <step.icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maiores Investidores - Seção com Carrossel */}
      <section className="py-20 bg-gray-50 section-transition">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-yellow-500 font-semibold mb-2 inline-block">INVESTIDOR</span>
            <h2 className="text-4xl font-bold mb-4 text-[#1A1F2C]">Maiores Investidores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossos principais investidores e seus resultados extraordinários
            </p>
          </div>

          <Carousel 
            className="max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true
            }}
          >
            <CarouselContent className="-ml-4">
              {investidoresDestaque.map((investidor, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/4">
                  <Card className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <div className="bg-[#FF5733] w-12 h-12 transform rotate-45 absolute -left-6 -top-6"></div>
                      <div className="p-6">
                        <span className="text-sm font-semibold text-yellow-500 mb-2 block">
                          {investidor.tag}
                        </span>
                        <h3 className="text-xl font-bold mb-3">{investidor.nome}</h3>
                        <p className="text-primary text-lg font-bold">
                          Investiu R$ {investidor.valor.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-0 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      <section className="bg-white py-20 section-transition">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-6 bg-white rounded-lg shadow-lg text-center hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white section-transition">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Últimos Depósitos e Saques</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sem taxas ocultas. Veja as últimas movimentações.
            </p>
          </div>

          <Tabs defaultValue="deposits" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="deposits" className="flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4 text-blue-500" />
                Últimos Depósitos
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="flex items-center gap-2">
                <ArrowDownCircle className="w-4 h-4 text-green-500" />
                Últimos Saques
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="deposits">
              <Carousel
                opts={{
                  align: "start",
                  loop: true
                }}
              >
                <CarouselContent>
                  {transactions.deposits.map((transaction, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="p-4 hover:shadow-md transition-all duration-300">
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
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                  <CarouselNext className="relative static translate-y-0 right-0" />
                </div>
              </Carousel>
            </TabsContent>

            <TabsContent value="withdrawals">
              <Carousel
                opts={{
                  align: "start",
                  loop: true
                }}
              >
                <CarouselContent>
                  {transactions.withdrawals.map((transaction, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="p-4 hover:shadow-md transition-all duration-300">
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
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                  <CarouselNext className="relative static translate-y-0 right-0" />
                </div>
              </Carousel>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 section-transition">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que nossos usuários dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 bg-white rounded-lg shadow-lg hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© 2024 Vestoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slideAndRotate {
          0% {
            transform: perspective(1000px) rotateY(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(360deg);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
