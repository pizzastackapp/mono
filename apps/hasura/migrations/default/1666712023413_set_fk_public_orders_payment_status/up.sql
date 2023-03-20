alter table "public"."orders"
  add constraint "orders_payment_status_fkey"
  foreign key ("payment_status")
  references "public"."payment_status"
  ("id") on update restrict on delete restrict;
