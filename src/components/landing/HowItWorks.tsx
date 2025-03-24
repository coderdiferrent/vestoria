
import { Shield, TrendingUp, HeadphonesIcon, Users, UserPlus, Wallet, ListChecks, Trophy } from "lucide-react";

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

const HowItWorks = () => {
  return (
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
  );
};

export default HowItWorks;
