import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount } = await req.json();
    const secretKey = Deno.env.get('ZYON_PAY_SECRET_KEY');
    
    if (!secretKey) {
      throw new Error('ZYON PAY secret key not configured');
    }

    console.log('Processing payment for amount:', amount);

    // Generate PIX payment with ZYON PAY API
    const paymentResponse = await fetch('https://api.zyonpay.com/v1/pix', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: amount,
        description: `Investimento de R$ ${amount.toFixed(2)}`,
        expires_in: 3600, // 1 hour expiration
        type: 'pix',
        callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pix-webhook`,
      }),
    });

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json();
      console.error('ZYON PAY API error:', errorData);
      throw new Error(`Failed to generate PIX payment: ${JSON.stringify(errorData)}`);
    }

    const paymentData = await paymentResponse.json();
    console.log('Payment data received:', paymentData);

    if (!paymentData.qr_code || !paymentData.copy_paste) {
      console.error('Invalid payment data received:', paymentData);
      throw new Error('Invalid payment data received from ZYON PAY');
    }

    return new Response(
      JSON.stringify({
        qrcode: paymentData.qr_code,
        code: paymentData.copy_paste,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Payment processing error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});