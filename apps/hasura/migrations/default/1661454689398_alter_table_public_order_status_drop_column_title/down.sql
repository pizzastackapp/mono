alter table "public"."order_status" alter column "title" drop not null;
alter table "public"."order_status" add column "title" text;
