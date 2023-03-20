CREATE TABLE "public"."orders" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "client_name" text NOT NULL, "client_phone" text NOT NULL, "client_address" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
