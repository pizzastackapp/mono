alter table "public"."orders"
  add constraint "orders_status_fkey"
  foreign key ("status")
  references "public"."order_status"
  ("id") on update restrict on delete restrict;
