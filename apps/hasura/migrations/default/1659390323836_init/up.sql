SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.menu (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    image text NOT NULL,
    weight numeric NOT NULL,
    title text NOT NULL,
    ingredients text NOT NULL,
    price numeric NOT NULL
);
ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
