
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { useInvestmentData } from '@/hooks/use-investment-data';
import { format, subDays, addDays, differenceInDays } from 'date-fns';
import { Lock } from 'lucide-react';
import { Tooltip as TooltipUI } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const PerformanceChart = () => {
  const { data: investmentData } = useInvestmentData();

  const generateChartData = () => {
    if (!investmentData?.created_at) return [];
    
    const data = [];
    const dailyRate = 0.05; // 5% daily return
    const createdDate = new Date(investmentData.created_at);
    const today = new Date();
    
    // Calculate the number of days since investment was created
    const daysSinceCreation = Math.max(0, differenceInDays(today, createdDate));
    
    // Generate data for each day since creation (or up to 30 days max)
    const daysToShow = Math.min(daysSinceCreation, 30);
    
    for (let i = daysToShow; i >= 0; i--) {
      const date = subDays(today, i);
      const daysFromInvestment = daysSinceCreation - i;
      const baseAmount = investmentData?.total_invested || 0;
      
      // Only calculate earnings based on actual days passed
      const earnings = baseAmount * Math.pow(1 + dailyRate, daysFromInvestment) - baseAmount;

      data.push({
        date: format(date, 'dd/MM'),
        totalValue: Number((baseAmount + earnings).toFixed(2)),
      });
    }
    return data;
  };

  const data = generateChartData();
  
  // Calculate days until next earnings release
  const investmentDate = investmentData?.created_at ? new Date(investmentData.created_at) : new Date();
  const nextReleaseDate = addDays(investmentDate, 10);
  const daysUntilNextRelease = Math.max(0, differenceInDays(nextReleaseDate, new Date()));

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
          </div>
          <div className="mt-2 text-xs text-blue-900/60">
            Seu capital inicial (não resgatável)
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
          </div>
          <div className="mt-2 text-xs text-purple-900/60">
            Rendimentos disponíveis para saque
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-green-900/70">Rendimentos Acumulados</h3>
              <p className="text-2xl font-bold text-green-900 mt-2">
                R$ {investmentData?.earnings_balance?.toFixed(2) || '0.00'}
              </p>
            </div>
            {daysUntilNextRelease > 0 && (
              <TooltipUI>
                <TooltipTrigger>
                  <div className="flex items-center text-green-900/50">
                    <Lock className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    Disponível para saque em {daysUntilNextRelease} {daysUntilNextRelease === 1 ? 'dia' : 'dias'}
                  </p>
                </TooltipContent>
              </TooltipUI>
            )}
          </div>
          <div className="mt-2 text-xs text-green-900/60">
            Lucro acumulado (5% ao dia)
            {daysUntilNextRelease > 0 && (
              <span className="block mt-1">
                Disponível para saque em {daysUntilNextRelease} {daysUntilNextRelease === 1 ? 'dia' : 'dias'}
              </span>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white rounded-2xl border-none shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Evolução do Investimento</h3>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Histórico Real
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              totalValue: { 
                label: "Valor Total",
                theme: { light: "#10B981", dark: "#34D399" }
              }
            }}
          >
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
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
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Area 
                type="monotone" 
                dataKey="totalValue" 
                name="Valor Total"
                stroke="#10B981" 
                fill="url(#colorTotal)"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Dados históricos do seu investimento com rendimento de 5% ao dia
        </div>
      </Card>
    </div>
  );
};

export default PerformanceChart;
