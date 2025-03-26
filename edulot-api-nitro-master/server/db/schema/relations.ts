import { relations } from "drizzle-orm/relations";
import { institute, instituteNirfData } from "./schema";

export const instituteNirfDataRelations = relations(instituteNirfData, ({one}) => ({
	institute: one(institute, {
		fields: [instituteNirfData.instituteId],
		references: [institute.id]
	}),
}));

export const instituteRelations = relations(institute, ({many}) => ({
	instituteNirfData: many(instituteNirfData),
}));