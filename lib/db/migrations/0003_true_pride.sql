DO $$ BEGIN
 CREATE TYPE "public"."permission_type" AS ENUM('create', 'read', 'delete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(20) NOT NULL,
	"collection_name" varchar(100),
	"read" permission_type[] NOT NULL,
	CONSTRAINT "permissions_role_unique" UNIQUE("role")
);
