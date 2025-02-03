import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { useInvestmentData } from '@/hooks/use-investment-data';

const PerformanceChart = () => {
  const { data: investmentData } = useInvestmentData();

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600">Total Investido</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {investmentData?.total_invested?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Seu capital inicial
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600">Saldo Disponível</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Valor atual do investimento
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600">Rendimentos</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            R$ {investmentData?.earnings_balance?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Lucro acumulado (5% ao dia)
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução do Investimento</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.375rem'
                }}
                formatter={(value: number) => [`R$ ${value}`, 'Valor']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceChart;