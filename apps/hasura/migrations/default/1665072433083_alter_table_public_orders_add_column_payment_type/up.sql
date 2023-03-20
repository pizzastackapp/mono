alter table "public"."orders" add column "payment_type" text
 not null default 'CASH';
