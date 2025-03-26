import { pgTable, varchar, timestamp, foreignKey, doublePrecision } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const alembicVersion = pgTable("alembic_version", {
	versionNum: varchar("version_num", { length: 32 }).primaryKey().notNull(),
});

export const institute = pgTable("institute", {
	name: varchar().notNull(),
	address: varchar(),
	city: varchar().notNull(),
	state: varchar().notNull(),
	phone: varchar(),
	email: varchar(),
	website: varchar().notNull(),
	id: varchar({ length: 21 }).primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
});

export const instituteNirfData = pgTable("institute_nirf_data", {
	id: varchar({ length: 21 }).primaryKey().notNull(),
	instituteId: varchar("institute_id", { length: 21 }).notNull(),
	ss: doublePrecision().notNull(),
	fsr: doublePrecision().notNull(),
	fqe: doublePrecision().notNull(),
	fru: doublePrecision().notNull(),
	pu: doublePrecision().notNull(),
	qp: doublePrecision().notNull(),
	gph: doublePrecision().notNull(),
	gue: doublePrecision().notNull(),
	ms: doublePrecision().notNull(),
	rd: doublePrecision().notNull(),
	wd: doublePrecision().notNull(),
	escs: doublePrecision().notNull(),
	pcs: doublePrecision().notNull(),
	pr: doublePrecision().notNull(),
	tlr: doublePrecision().notNull(),
	rp: doublePrecision().notNull(),
	go: doublePrecision().notNull(),
	oi: doublePrecision().notNull(),
	rankingType: varchar("ranking_type").notNull(),
	ipr: doublePrecision().notNull(),
	fppp: doublePrecision().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.instituteId],
			foreignColumns: [institute.id],
			name: "institute_nirf_data_institute_id_institute_id_fk"
		}),
]);
