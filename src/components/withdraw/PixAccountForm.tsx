import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
};

const validateCPF = (cpf: string) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return value;
};

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const PixAccountForm = ({ onAccountAdded }: { onAccountAdded: () => void }) => {
  const { toast } = useToast();
  const [newAccount, setNewAccount] = useState({
    type: "",
    name: "",
    key: "",
  });

  const validatePixKey = (type: string, key: string) => {
    switch (type) {
      case "email":
        return validateEmail(key);
      case "phone":
        return validatePhone(key);
      case "cpf":
        return validateCPF(key);
      case "random":
        return key.length > 0;
      default:
        return false;
    }
  };

  const formatPixKey = (type: string, key: string) => {
    switch (type) {
      case "phone":
        return formatPhone(key);
      case "cpf":
        return formatCPF(key);
      default:
        return key;
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedKey = formatPixKey(newAccount.type, e.target.value);
    setNewAccount({ ...newAccount, key: formattedKey });
  };

  const handleAddAccount = async () => {
    if (!newAccount.type || !newAccount.name || !newAccount.key) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (!validatePixKey(newAccount.type, newAccount.key)) {
      toast({
        title: "Erro",
        description: `Formato inválido para ${newAccount.type.toUpperCase()}`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('pix_accounts')
        .insert([newAccount]);

      if (error) throw error;

      setNewAccount({ type: "", name: "", key: "" });
      toast({
        title: "Sucesso",
        description: "Conta PIX adicionada com sucesso",
      });
      onAccountAdded();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de PIX
        </label>
        <Select
          value={newAccount.type}
          onValueChange={(value) => setNewAccount({ ...newAccount, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de PIX" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">E-mail</SelectItem>
            <SelectItem value="cpf">CPF</SelectItem>
            <SelectItem value="phone">Telefone</SelectItem>
            <SelectItem value="random">Chave Aleatória</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo
        </label>
        <Input
          value={newAccount.name}
          onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
          placeholder="Digite o nome completo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chave PIX
        </label>
        <Input
          value={newAccount.key}
          onChange={handleKeyChange}
          placeholder={
            newAccount.type === "email" ? "exemplo@email.com" :
            newAccount.type === "phone" ? "(00) 00000-0000" :
            newAccount.type === "cpf" ? "000.000.000-00" :
            "Digite a chave PIX"
          }
        />
      </div>

      <Button onClick={handleAddAccount} className="w-full">
        Salvar
      </Button>
    </div>
  );
};