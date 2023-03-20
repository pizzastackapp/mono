alter table "public"."orders_menu"
  add constraint "orders_menu_order_id_fkey"
  foreign key ("order_id")
  references "public"."orders"
  ("id") on update restrict on delete cascade;
