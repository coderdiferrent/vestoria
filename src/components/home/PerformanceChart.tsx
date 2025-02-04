import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { useInvestmentData } from '@/hooks/use-investment-data';
import { format, subDays } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

const PerformanceChart = () => {
  const { data: investmentData } = useInvestmentData();

  const generateChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: format(date, 'dd/MM'),
        value: investmentData?.available_balance || 0,
      });
    }
    return data;
  };

  const data = generateChartData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-blue-900/70">Total Investido</h3>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                R$ {investmentData?.total_invested?.toFixed(2) || '0.00'}
              </p>
            </div>
            <button className="text-blue-900/50 hover:text-blue-900">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-blue-900/60">
            Seu capital inicial
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-purple-900/70">Saldo Disponível</h3>
              <p className="text-2xl font-bold text-purple-900 mt-2">
                R$ {investmentData?.available_balance?.toFixed(2) || '0.00'}
              </p>
            </div>
            <button className="text-purple-900/50 hover:text-purple-900">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-purple-900/60">
            Valor atual do investimento
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-green-900/70">Rendimentos</h3>
              <p className="text-2xl font-bold text-green-900 mt-2">
                R$ {investmentData?.earnings_balance?.toFixed(2) || '0.00'}
              </p>
            </div>
            <button className="text-green-900/50 hover:text-green-900">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-green-900/60">
            Lucro acumulado (5% ao dia)
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white rounded-2xl border-none shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Evolução do Investimento</h3>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Últimos 7 dias
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value}`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
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