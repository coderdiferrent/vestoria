import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/home/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useInvestmentData } from "@/hooks/use-investment-data";
import { usePaymentProcessing } from "@/hooks/use-payment-processing";

const INVESTMENT_VALUES = [
  50, 100, 200, 500, 1000, 1500, 3000, 5000, 
  10000, 15000, 30000, 50000
];

const Investment = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<number>(100);
  const [pixData, setPixData] = useState<{ qrcode: string; code: string } | null>(null);
  const [showPixDialog, setShowPixDialog] = useState(false);
  const { data: investmentData, refetch: refetchInvestmentData } = useInvestmentData();
  const { processPayment, isProcessing } = usePaymentProcessing();

  const handleInvestment = async () => {
    try {
      if (!selectedValue) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um valor para investir.",
          variant: "destructive",
        });
        return;
      }

      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado.",
          variant: "destructive",
        });
        return;
      }

      // Process payment and get PIX data
      const paymentResult = await processPayment(selectedValue);
      
      if (paymentResult.qrcode && paymentResult.code) {
        setPixData(paymentResult);
        setShowPixDialog(true);
      }

      // The investment will be created/updated after payment confirmation
      // This will be handled by a webhook in production
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar seu investimento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    const nearestValue = INVESTMENT_VALUES.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    setSelectedValue(nearestValue);
  };

  const sliderValue = [(selectedValue / 50000) * 100];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Investir</h1>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Selecione o valor do investimento</h2>
            
            <div className="space-y-8">
              <div className="text-center text-3xl font-bold text-primary">
                R$ {selectedValue.toLocaleString('pt-BR')}
              </div>
              
              <Slider
                value={sliderValue}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                className="my-4"
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {INVESTMENT_VALUES.map((value) => (
                  <Button
                    key={value}
                    variant={selectedValue === value ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedValue(value)}
                  >
                    R$ {value.toLocaleString('pt-BR')}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full md:w-auto"
                onClick={handleInvestment}
                disabled={!selectedValue || isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Gerar PIX'}
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pagamento PIX</DialogTitle>
          </DialogHeader>
          {pixData && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={pixData.qrcode}
                  alt="QR Code PIX"
                  className="w-64 h-64"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Código PIX (clique para copiar):
                </p>
                <div
                  className="p-3 bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(pixData.code);
                    toast({
                      title: "Código copiado",
                      description: "O código PIX foi copiado para sua área de transferência",
                    });
                  }}
                >
                  <p className="text-sm font-mono break-all">{pixData.code}</p>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>Após o pagamento, seu investimento será processado automaticamente.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investment;