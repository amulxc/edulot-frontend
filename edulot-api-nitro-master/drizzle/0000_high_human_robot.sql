-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "alembic_version" (
	"version_num" varchar(32) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institute" (
	"name" varchar NOT NULL,
	"address" varchar,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"phone" varchar,
	"email" varchar,
	"website" varchar NOT NULL,
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institute_nirf_data" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"institute_id" varchar(21) NOT NULL,
	"ss" double precision NOT NULL,
	"fsr" double precision NOT NULL,
	"fqe" double precision NOT NULL,
	"fru" double precision NOT NULL,
	"pu" double precision NOT NULL,
	"qp" double precision NOT NULL,
	"gph" double precision NOT NULL,
	"gue" double precision NOT NULL,
	"ms" double precision NOT NULL,
	"rd" double precision NOT NULL,
	"wd" double precision NOT NULL,
	"escs" double precision NOT NULL,
	"pcs" double precision NOT NULL,
	"pr" double precision NOT NULL,
	"tlr" double precision NOT NULL,
	"rp" double precision NOT NULL,
	"go" double precision NOT NULL,
	"oi" double precision NOT NULL,
	"ranking_type" varchar NOT NULL,
	"ipr" double precision NOT NULL,
	"fppp" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "institute_nirf_data" ADD CONSTRAINT "institute_nirf_data_institute_id_institute_id_fk" FOREIGN KEY ("institute_id") REFERENCES "public"."institute"("id") ON DELETE no action ON UPDATE no action;
*/