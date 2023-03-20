CREATE TABLE "public"."settings" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "drinks_category" uuid NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
