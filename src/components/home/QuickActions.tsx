import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, Users } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button 
        className="flex items-center gap-2" 
        onClick={() => window.location.href = '/investments'}
      >
        <ArrowUpRight className="w-4 h-4" />
        Investir
      </Button>
      <Button 
        className="flex items-center gap-2"
        onClick={() => window.location.href = '/withdraw'}
      >
        <Wallet className="w-4 h-4" />
        Sacar
      </Button>
      <Button 
        className="flex items-center gap-2"
        onClick={() => window.location.href = '/referral'}
      >
        <Users className="w-4 h-4" />
        Indicar
      </Button>
    </div>
  );
};

export default QuickActions;