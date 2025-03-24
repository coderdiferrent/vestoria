
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Hero;
