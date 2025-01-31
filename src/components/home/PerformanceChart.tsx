import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

const PerformanceChart = () => {
  const { data: investmentData } = useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const data = [
    { date: '01/03', value: 1000 },
    { date: '02/03', value: 1200 },
    { date: '03/03', value: 1400 },
    { date: '04/03', value: 1600 },
    { date: '05/03', value: 1900 },
    { date: '06/03', value: 2200 },
    { date: '07/03', value: 2500 },
  ];

  return (
    <div className="space-y-6">
      {/* Investment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Investido</h3>
          <p className="text-2xl font-bold text-gray-900">
            R$ {investmentData?.total_invested?.toFixed(2) || '0.00'}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Saldo Disponível</h3>
          <p className="text-2xl font-bold text-gray-900">
            R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Rendimentos</h3>
          <p className="text-2xl font-bold text-gray-900">
            R$ {investmentData?.earnings_balance?.toFixed(2) || '0.00'}
          </p>
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4F46E5" 
              fill="#4F46E5" 
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;