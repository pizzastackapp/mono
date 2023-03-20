import { theme } from '@app/core/theme';
import { FinanceChart } from '@app/modules/dashboard/components/finance-chart/finance-chart.component';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'react-admin';

export default {
  title: 'Dashboard/Finance chart',
  component: FinanceChart,
} as ComponentMeta<typeof FinanceChart>;

const Template: ComponentStory<typeof FinanceChart> = (args) => (
  <ThemeProvider theme={theme}>
    <FinanceChart {...args} />
  </ThemeProvider>
);

export const View = Template.bind({});
View.args = {
  data: [
    {
      count: 3,
      date: '2022-08-29',
      sum: 892,
    },
    {
      count: 9,
      date: '2022-08-30',
      sum: 2735,
    },
    {
      count: 7,
      date: '2022-08-31',
      sum: 1864,
    },
    {
      count: 1,
      date: '2022-09-01',
      sum: 241,
    },
    {
      count: 6,
      date: '2022-09-02',
      sum: 1710,
    },
    {
      count: 8,
      date: '2022-09-03',
      sum: 2331,
    },
    {
      count: 45,
      date: '2022-09-04',
      sum: 13464,
    },
  ],
};
