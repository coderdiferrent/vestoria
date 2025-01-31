import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  TrendingUp, 
  HeadphonesIcon, 
  Users,
  LogIn
} from "lucide-react";

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

  const testimonials = [
    {
      name: "Carlos Silva",
      text: "Comecei com R$ 1.000 e em 40 dias já estava com R$ 2.000. Simplesmente incrível!"
    },
    {
      name: "Ana Paula",
      text: "A melhor plataforma de investimentos que já utilizei. Suporte excepcional!"
    }
  ];

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
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
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