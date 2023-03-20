CREATE TABLE "public"."order_status" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text NOT NULL, "title" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
