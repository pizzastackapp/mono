import { FinanceChartTooltip } from '@app/modules/dashboard/components/finance-chart-toolip/finance-chart-tooltip.component';
import { FC } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface FinanceChartProps {
  data: any[];
}

export const FinanceChart: FC<FinanceChartProps> = ({ data }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip content={<FinanceChartTooltip />} />
      <Bar dataKey="sum" fill="#fbbf24" />
    </BarChart>
  );
};
