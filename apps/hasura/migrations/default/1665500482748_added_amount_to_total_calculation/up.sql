CREATE OR REPLACE FUNCTION sum_by_order(orders_row orders)
RETURNS NUMERIC AS $$
  SELECT SUM(m.price * om.amount)
  FROM orders_menu as om 
  JOIN menu as m ON om.menu_id=m.id
  WHERE order_id='0a8f31ad-0dc7-4a3e-b217-1ccb91939224'
$$ LANGUAGE sql STABLE;
