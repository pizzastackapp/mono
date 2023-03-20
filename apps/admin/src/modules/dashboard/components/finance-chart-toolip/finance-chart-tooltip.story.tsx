import { theme } from '@app/core/theme';
import { FinanceChartTooltip } from '@app/modules/dashboard/components/finance-chart-toolip/finance-chart-tooltip.component';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'react-admin';

export default {
  title: 'Dashboard/Finance chart tooltip',
  component: FinanceChartTooltip,
} as ComponentMeta<typeof FinanceChartTooltip>;

const Template: ComponentStory<typeof FinanceChartTooltip> = (args) => (
  <ThemeProvider theme={theme}>
    <FinanceChartTooltip {...args} />
  </ThemeProvider>
);

export const View = Template.bind({});
View.args = {
  active: true,
  payload: [
    {
      payload: {
        count: 3,
        date: '2022-08-29',
        sum: 892,
      },
    },
  ],
};
