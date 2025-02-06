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
  ArrowDownCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Landing = () => {
  const navigate = useNavigate();

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
      description: "Quando seu pedido for concluído, você poderá desfrutar de resultados incríveis e impulsionar seu negócio."
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
    { nome: "Maria Luzinara", valor: 10000 },
    { nome: "Pedro Rogério", valor: 15000 },
    { nome: "Araujo Silva", valor: 50000 },
    { nome: "Ana Paula Santos", valor: 25000 },
    { nome: "Carlos Eduardo", valor: 30000 },
    { nome: "Fernanda Lima", valor: 20000 },
    { nome: "Ricardo Almeida", valor: 35000 },
    { nome: "Juliana Costa", valor: 40000 },
    { nome: "Lucas Mendes", valor: 45000 },
    { nome: "Patrícia Souza", valor: 55000 }
  ];

  const generateTransactions = () => {
    const names = [
      "João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", 
      "Carlos Ferreira", "Mariana Lima", "Lucas Souza", "Julia Pereira",
      "Gabriel Rodrigues", "Beatriz Almeida"
    ];
    
    const deposits = Array.from({ length: 5 }, () => ({
      name: names[Math.floor(Math.random() * names.length)],
      amount: Math.floor(Math.random() * 5 + 1) * 1000,
      date: new Date().toLocaleDateString('pt-BR')
    }));

    const withdrawals = Array.from({ length: 5 }, () => ({
      name: names[Math.floor(Math.random() * names.length)],
      amount: Math.floor(Math.random() * 3 + 1) * 1000,
      date: new Date().toLocaleDateString('pt-BR')
    }));

    return { deposits, withdrawals };
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transactions] = useState(generateTransactions());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 4 >= investidoresDestaque.length ? 0 : prevIndex + 4
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleInvestidores = investidoresDestaque.slice(currentIndex, currentIndex + 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
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
          className="flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Duplique seus ganhos em 40 dias
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Comece agora mesmo a investir na plataforma mais segura e rentável do mercado
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/register")}
          className="text-lg px-8 py-6"
        >
          Comece agora mesmo
        </Button>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra como é fácil começar a usar nossa plataforma e alcançar resultados incríveis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
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

      {/* Top Investors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Investidores de Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ajudamos pessoas a mudarem suas vidas através de nossas soluções em investimentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
            {visibleInvestidores.map((investidor, index) => (
              <Card
                key={index}
                className="p-6 bg-white hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">{investidor.nome}</h3>
                <p className="text-primary font-bold">
                  R$ {investidor.valor.toLocaleString('pt-BR')}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Transactions Section */}
      <section className="py-20 bg-white">
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
                <ArrowUpCircle className="w-4 h-4 text-green-500" />
                Últimos Depósitos
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="flex items-center gap-2">
                <ArrowDownCircle className="w-4 h-4 text-red-500" />
                Últimos Saques
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="deposits" className="space-y-4">
              {transactions.deposits.map((transaction, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <p className="text-green-500 font-bold">
                      + R$ {transaction.amount.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-4">
              {transactions.withdrawals.map((transaction, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <p className="text-red-500 font-bold">
                      - R$ {transaction.amount.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que nossos usuários dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 bg-white rounded-lg shadow-lg"
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

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© 2024 Vestoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
