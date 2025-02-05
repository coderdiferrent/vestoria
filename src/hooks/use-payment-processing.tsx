import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePaymentProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processPayment = async (amount: number) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: { amount },
      });

      if (error) throw error;

      if (!data.qrcode || !data.code) {
        throw new Error('Dados do PIX não recebidos');
      }

      toast({
        title: "PIX gerado",
        description: "Escaneie o QR Code ou copie o código PIX para realizar o pagamento",
      });

      return data;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao gerar o PIX. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
  };
};