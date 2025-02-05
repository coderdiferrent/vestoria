import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePaymentProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processPayment = async (amount: number) => {
    setIsProcessing(true);
    try {
      console.log('Initiating payment processing for amount:', amount);
      
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: { amount },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Payment processing response:', data);

      if (!data?.qrcode || !data?.code) {
        console.error('Invalid payment data received:', data);
        throw new Error('Dados inválidos recebidos do processador de pagamento');
      }

      toast({
        title: "PIX gerado com sucesso",
        description: "Escaneie o QR Code ou copie o código PIX para realizar o pagamento",
      });

      return {
        qrcode: data.qrcode,
        code: data.code,
      };
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao gerar o PIX. Por favor, tente novamente.",
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