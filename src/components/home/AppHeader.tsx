import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Home, LineChart, Wallet2, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const AppHeader = () => {
  const { toast } = useToast();

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
    { path: "/home", label: "Dashboard", icon: Home },
    { path: "/investments", label: "Investimentos", icon: LineChart },
    { path: "/withdraw", label: "Saque", icon: Wallet2 },
    { path: "/referral", label: "Indicação", icon: Users },
    { path: "/settings", label: "Configurações", icon: Settings },
    { path: "/support", label: "Suporte", icon: HelpCircle },
  ];

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="border-b border-white/10">
          <Link to="/home" className="flex items-center justify-center h-16">
            <span className="text-2xl font-bold text-white">Vestoria</span>
          </Link>
        </SidebarHeader>
        
        <SidebarContent className="py-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className="text-white hover:bg-white/10"
                >
                  <Link to={item.path}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-white/10">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Sair"
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppHeader;