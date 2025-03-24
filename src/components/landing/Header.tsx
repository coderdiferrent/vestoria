
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Header;
