CREATE FUNCTION sum_by_order(orders_row orders)
RETURNS NUMERIC AS $$
  SELECT SUM(m.price)
  FROM orders_menu as om 
  JOIN menu as m ON om.menu_id=m.id
  WHERE order_id=orders_row.id
$$ LANGUAGE sql STABLE;
