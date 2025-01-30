import { Card } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";

const SupportSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Suporte</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">E-mail</h3>
          </div>
          <p className="text-gray-600">
            <a href="mailto:suporte@vestoria.com" className="text-primary hover:underline">
              suporte@vestoria.com
            </a>
          </p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Telegram</h3>
          </div>
          <p className="text-gray-600">
            <a href="https://t.me/vestoria" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              @vestoria
            </a>
          </p>
        </Card>
      </div>
      
      <p className="text-center text-gray-600 mt-6">
        Ainda precisa de ajuda? <a href="/support" className="text-primary hover:underline">Entre em contato conosco</a>
      </p>
    </div>
  );
};

export default SupportSection;