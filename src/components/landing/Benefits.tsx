
import { Shield, TrendingUp, HeadphonesIcon, Users } from "lucide-react";

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

const Benefits = () => {
  return (
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
  );
};

export default Benefits;
