import { useGetLastWeekOrdersStatisticQuery } from '@app/core/types';
import { FinanceChart } from '@app/modules/dashboard/components/finance-chart/finance-chart.component';
import { NewOrders } from '@app/modules/orders/components/new-orders/new-orders.component';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Loading } from 'react-admin';

export const Dashboard = () => {
  const { data, loading } = useGetLastWeekOrdersStatisticQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Card sx={{ marginTop: '64px' }}>
      <CardContent>
        <Typography variant="h5">Вітаємо в адмінці 🍕 PizzaStack</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Останні нові замовлення</Typography>
                <NewOrders />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  Продажі за останній тиждень
                </Typography>
                <FinanceChart data={data?.last_week_orders ?? []} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
