import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { useInvestmentData } from '@/hooks/use-investment-data';
import { format, subDays, addDays, differenceInDays } from 'date-fns';
import { MoreHorizontal, Lock } from 'lucide-react';
import { Tooltip as TooltipUI } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

const PerformanceChart = () => {
  const { data: investmentData } = useInvestmentData();

  const generateChartData = () => {
    const data = [];
    const dailyRate = 0.05; // 5% daily return

    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const daysFromInvestment = 6 - i;
      const baseAmount = investmentData?.total_invested || 0;
      
      const earnings = baseAmount * Math.pow(1 + dailyRate, daysFromInvestment) - baseAmount;

      data.push({
        date: format(date, 'dd/MM'),
        earnings: Number(earnings.toFixed(2)),
        totalValue: Number((baseAmount + earnings).toFixed(2)),
      });
    }
    return data;
  };

  const data = generateChartData();
  
  // Calculate days until maturity
  const investmentDate = investmentData?.created_at ? new Date(investmentData.created_at) : new Date();
  const maturityDate = addDays(investmentDate, 10);
  const daysUntilMaturity = Math.max(0, differenceInDays(maturityDate, new Date()));
  const isMatured = daysUntilMaturity === 0;

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
            {!isMatured && (
              <TooltipUI>
                <TooltipTrigger>
                  <div className="flex items-center text-blue-900/50">
                    <Lock className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    Bloqueado por mais {daysUntilMaturity} {daysUntilMaturity === 1 ? 'dia' : 'dias'}
                  </p>
                </TooltipContent>
              </TooltipUI>
            )}
          </div>
          <div className="mt-2 text-xs text-blue-900/60">
            Seu capital inicial
            {!isMatured && (
              <span className="block mt-1">
                Disponível em {daysUntilMaturity} {daysUntilMaturity === 1 ? 'dia' : 'dias'}
              </span>
            )}
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
            {!isMatured && (
              <TooltipUI>
                <TooltipTrigger>
                  <div className="flex items-center text-purple-900/50">
                    <Lock className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    Bloqueado por mais {daysUntilMaturity} {daysUntilMaturity === 1 ? 'dia' : 'dias'}
                  </p>
                </TooltipContent>
              </TooltipUI>
            )}
          </div>
          <div className="mt-2 text-xs text-purple-900/60">
            Valor atual do investimento
            {!isMatured && (
              <span className="block mt-1">
                Disponível em {daysUntilMaturity} {daysUntilMaturity === 1 ? 'dia' : 'dias'}
              </span>
            )}
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
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => {
                  const labels = {
                    earnings: 'Rendimentos',
                    totalValue: 'Valor Total'
                  };
                  return labels[value as keyof typeof labels];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#4F46E5" 
                fill="url(#colorEarnings)"
                strokeWidth={2}
                dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Area 
                type="monotone" 
                dataKey="totalValue" 
                stroke="#10B981" 
                fill="url(#colorTotal)"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceChart;
