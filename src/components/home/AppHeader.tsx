import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/075d72e8-62cc-4d2f-8bcc-74c56c805993.png" 
            alt="Vestoria Logo" 
            className="h-12"
          />
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/home"
              >
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/investments"
              >
                Investimentos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/withdraw"
              >
                Saque
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/referral"
              >
                Indicação
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/settings"
              >
                Configurações
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn("px-4 py-2 hover:bg-gray-100 rounded-md")}
                href="/support"
              >
                Suporte
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default AppHeader;