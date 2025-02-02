import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

type PixAccount = {
  id: string;
  type: string;
  name: string;
  key: string;
};

interface SavedPixAccountsProps {
  selectedAccountId: string;
  onSelectAccount: (id: string) => void;
  refetchAccounts: () => void;
}

export const SavedPixAccounts = ({ 
  selectedAccountId, 
  onSelectAccount,
  refetchAccounts
}: SavedPixAccountsProps) => {
  const { toast } = useToast();

  const { data: pixAccounts } = useQuery({
    queryKey: ['pix_accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pix_accounts')
        .select('*');
      
      if (error) throw error;
      return data as PixAccount[];
    },
  });

  const handleDeleteAccount = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('pix_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Conta PIX removida com sucesso",
      });
      refetchAccounts();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!pixAccounts?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {pixAccounts.map((account) => (
        <div
          key={account.id}
          className="p-4 border rounded-lg flex items-center justify-between"
        >
          <div>
            <p className="font-medium">{account.name}</p>
            <p className="text-sm text-gray-600">
              {account.type.toUpperCase()}: {account.key}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedAccountId === account.id ? "default" : "outline"}
              onClick={() => onSelectAccount(account.id)}
            >
              {selectedAccountId === account.id ? "Selecionada" : "Selecionar"}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteAccount(account.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};