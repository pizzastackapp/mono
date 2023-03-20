CREATE TABLE "public"."customers" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "phone" text NOT NULL, "address" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
