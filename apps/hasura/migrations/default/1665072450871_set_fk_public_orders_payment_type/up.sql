alter table "public"."orders"
  add constraint "orders_payment_type_fkey"
  foreign key ("payment_type")
  references "public"."payment_types"
  ("id") on update restrict on delete restrict;
