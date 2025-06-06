
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, sanitizeCPF, sanitizePhone } from "@/utils/security";
import AppHeader from "@/components/home/AppHeader";
import SecurityWrapper from "@/components/SecurityWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      return profile;
    },
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Sanitize all profile data
      const sanitizedData = {
        first_name: sanitizeInput(profile?.first_name || ""),
        last_name: sanitizeInput(profile?.last_name || ""),
        phone: sanitizePhone(profile?.phone || ""),
        cpf: sanitizeCPF(profile?.cpf || ""),
        birth_date: profile?.birth_date,
      };

      const { error } = await supabase
        .from("profiles")
        .update(sanitizedData)
        .eq("id", user.id);

      if (error) throw error;

      await refetch();
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Erro interno do sistema",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced password validation
    if (newPassword.length < 8) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(newPassword)) {
      toast({
        title: "Erro",
        description: "A senha deve conter pelo menos uma letra maiúscula, minúscula, número e caractere especial",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (newPassword === oldPassword) {
      toast({
        title: "Erro",
        description: "A nova senha deve ser diferente da senha atual",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        if (error.message.includes("same_password")) {
          throw new Error("A nova senha deve ser diferente da senha atual");
        }
        throw error;
      }

      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error('Password change error:', error);
      toast({
        title: "Erro ao alterar senha",
        description: "Erro interno do sistema",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SecurityWrapper requireAuth>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Configurações</h1>
            
            <Tabs defaultValue="profile">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="profile" className="flex-1">
                  Editar Perfil
                </TabsTrigger>
                <TabsTrigger value="password" className="flex-1">
                  Alterar Senha
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="p-6">
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nome
                      </label>
                      <Input
                        value={profile?.first_name || ""}
                        onChange={(e) => profile && (profile.first_name = sanitizeInput(e.target.value))}
                        placeholder="Seu nome"
                        maxLength={50}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Sobrenome
                      </label>
                      <Input
                        value={profile?.last_name || ""}
                        onChange={(e) => profile && (profile.last_name = sanitizeInput(e.target.value))}
                        placeholder="Seu sobrenome"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Telefone
                      </label>
                      <Input
                        value={profile?.phone || ""}
                        onChange={(e) => profile && (profile.phone = sanitizePhone(e.target.value))}
                        placeholder="Seu telefone"
                        type="tel"
                        maxLength={15}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CPF
                      </label>
                      <Input
                        value={profile?.cpf || ""}
                        onChange={(e) => profile && (profile.cpf = sanitizeCPF(e.target.value))}
                        placeholder="Seu CPF"
                        maxLength={14}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Data de Nascimento
                      </label>
                      <Input
                        value={profile?.birth_date || ""}
                        onChange={(e) => profile && (profile.birth_date = e.target.value)}
                        placeholder="Sua data de nascimento"
                        type="date"
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar"}
                    </Button>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card className="p-6">
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Senha Atual
                      </label>
                      <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                        maxLength={128}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nova Senha
                      </label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite a nova senha"
                        maxLength={128}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Mínimo 8 caracteres com letra maiúscula, minúscula, número e caractere especial
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirmar Nova Senha
                      </label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme a nova senha"
                        maxLength={128}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Alterando..." : "Alterar Senha"}
                    </Button>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SecurityWrapper>
  );
};

export default Settings;
