import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { date: '01/03', value: 1000 },
  { date: '02/03', value: 1200 },
  { date: '03/03', value: 1400 },
  { date: '04/03', value: 1600 },
  { date: '05/03', value: 1900 },
  { date: '06/03', value: 2200 },
  { date: '07/03', value: 2500 },
];

const PerformanceChart = () => {
  return (
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
  );
};

export default PerformanceChart;