import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all investments
    const { data: investments, error: fetchError } = await supabaseClient
      .from('investments')
      .select('*')

    if (fetchError) {
      throw fetchError
    }

    console.log('Found investments:', investments)

    // Update each investment with 5% earnings
    for (const investment of investments) {
      const totalInvested = Number(investment.total_invested)
      const dailyEarnings = totalInvested * 0.05 // 5% increase
      const newEarningsBalance = Number(investment.earnings_balance) + dailyEarnings
      const newAvailableBalance = Number(investment.available_balance) + dailyEarnings

      const { error: updateError } = await supabaseClient
        .from('investments')
        .update({
          earnings_balance: newEarningsBalance,
          available_balance: newAvailableBalance,
        })
        .eq('id', investment.id)

      if (updateError) {
        console.error('Error updating investment:', updateError)
        throw updateError
      }

      console.log(`Updated investment ${investment.id} with new earnings: ${dailyEarnings}`)
    }

    return new Response(
      JSON.stringify({ message: 'Investment earnings updated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})