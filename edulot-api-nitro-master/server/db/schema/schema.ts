import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  real,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const alembicVersion = pgTable("alembic_version", {
  versionNum: varchar("version_num", { length: 32 }).primaryKey().notNull(),
});

export const instituteTable = pgTable("institute", {
  id: varchar({ length: 21 })
    .primaryKey()
    .$default(() => nanoid()),
  name: varchar().notNull(),
  address: varchar(),
  city: varchar().notNull(),
  state: varchar().notNull(),
  phone: varchar(),
  email: varchar(),
  website: varchar().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull(),
});

export const instituteRelations = relations(instituteTable, ({ one }) => ({
  nirfData: one(instituteNirfDataTable),
}));

export const instituteNirfDataTable = pgTable("institute_nirf_data", {
  id: varchar({ length: 21 })
    .primaryKey()
    .$default(() => nanoid()),
  instituteId: varchar("institute_id", { length: 21 })
    .notNull()
    .references(() => instituteTable.id),
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
  ipr: doublePrecision().notNull(),
  fppp: doublePrecision().notNull(),
  rankingType: varchar("ranking_type").notNull(),
});

export const insituteNirfDataRelations = relations(
  instituteNirfDataTable,
  ({ one }) => ({
    instituteNirfData: one(instituteTable, {
      fields: [instituteNirfDataTable.instituteId],
      references: [instituteTable.id],
    }),
  })
);
