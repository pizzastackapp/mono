CREATE TABLE "public"."orders_menu" ("order_id" uuid NOT NULL, "menu_id" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
