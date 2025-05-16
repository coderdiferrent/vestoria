
import { useState, useEffect } from "react";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ReferralLevels = [
  { level: 1, commission: "10%" },
  { level: 2, commission: "1%" },
  { level: 3, commission: "1%" },
];

const Referral = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          return;
        }

        // Fetch user's referral code
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('referral_code')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        if (profileData?.referral_code) {
          setReferralCode(profileData.referral_code);
          setReferralLink(`${window.location.origin}/register?ref=${profileData.referral_code}`);
        }

        // Fetch referral statistics
        const { data: referralsData } = await supabase
          .from('referrals')
          .select('referred_id')
          .eq('referrer_id', user.id);
          
        const totalReferrals = referralsData?.length || 0;

        // Fetch earnings from commissions
        const { data: commissionsData } = await supabase
          .from('referral_commissions')
          .select('amount')
          .eq('referral_id', referralsData?.map(r => r.id));

        const totalEarnings = commissionsData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

        setReferralStats({
          totalReferrals,
          activeReferrals: totalReferrals, // For now, all referrals are considered active
          totalEarnings,
        });
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Link copiado para a área de transferência",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Programa de Indicação</h1>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Total de Indicados</h3>
                  <p className="text-3xl font-bold">{referralStats.totalReferrals}</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Indicados Ativos</h3>
                  <p className="text-3xl font-bold">{referralStats.activeReferrals}</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Ganhos Totais</h3>
                  <p className="text-3xl font-bold">R$ {referralStats.totalEarnings.toFixed(2)}</p>
                </Card>
              </div>

              {/* Commission Levels */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Tabela de Comissões</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ReferralLevels.map((level) => (
                    <div
                      key={level.level}
                      className="p-4 border rounded-lg text-center"
                    >
                      <h3 className="font-semibold mb-2">Nível {level.level}</h3>
                      <p className="text-2xl font-bold text-primary">
                        {level.commission}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Referral Link and Code */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Seu Link de Indicação</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                    />
                    <Button onClick={() => copyToClipboard(referralLink)}>
                      Copiar Link
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={referralCode}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                    />
                    <Button onClick={() => copyToClipboard(referralCode)}>
                      Copiar Código
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Detailed Information Tabs */}
              <Card className="p-6">
                <Tabs defaultValue="earnings">
                  <TabsList className="w-full">
                    <TabsTrigger value="earnings" className="flex-1">
                      Ganhos
                    </TabsTrigger>
                    <TabsTrigger value="registered" className="flex-1">
                      Cadastrados
                    </TabsTrigger>
                    <TabsTrigger value="active" className="flex-1">
                      Ativos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="earnings" className="mt-6">
                    <div className="text-center text-gray-600">
                      {referralStats.totalEarnings > 0 
                        ? `Você já ganhou R$ ${referralStats.totalEarnings.toFixed(2)} em comissões!`
                        : "Nenhum ganho registrado ainda"}
                    </div>
                  </TabsContent>

                  <TabsContent value="registered" className="mt-6">
                    <div className="text-center text-gray-600">
                      {referralStats.totalReferrals > 0 
                        ? `Você já indicou ${referralStats.totalReferrals} pessoas!`
                        : "Nenhum usuário cadastrado ainda"}
                    </div>
                  </TabsContent>

                  <TabsContent value="active" className="mt-6">
                    <div className="text-center text-gray-600">
                      {referralStats.activeReferrals > 0 
                        ? `Você tem ${referralStats.activeReferrals} indicados ativos!`
                        : "Nenhum usuário ativo ainda"}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Referral;
