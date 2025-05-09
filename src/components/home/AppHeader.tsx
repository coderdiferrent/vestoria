import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Home, LineChart, Wallet2, Users, Settings, HelpCircle, Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const AppHeader = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      window.location.href = "/login";
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { path: "/home", label: "Página Inicial", icon: Home },
    { path: "/investments", label: "Investimentos", icon: LineChart },
    { path: "/withdraw", label: "Saque", icon: Wallet2 },
    { path: "/referral", label: "Indicação", icon: Users },
    { path: "/settings", label: "Configurações", icon: Settings },
    { path: "/support", label: "Suporte", icon: HelpCircle },
  ];

  const renderMenuItems = () => (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center gap-2 md:gap-4'}`}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            } ${isMobile ? 'w-full' : ''}`}
          >
            <Icon className="w-4 h-4 mr-2" />
            <span className="text-sm">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/home" className="text-2xl font-bold text-primary">
              Vestoria
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-4">
                  {renderMenuItems()}
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full mt-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col md:flex-row items-center justify-between py-4 space-y-4 md:space-y-0">
          <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vestoria
          </Link>

          {renderMenuItems()}

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full md:w-auto"
          >
            Sair
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
