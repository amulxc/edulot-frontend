import { db } from "~/db";
import { instituteNirfDataTable, instituteTable } from "~/db/schema/schema";

export default defineEventHandler(async (event) => {
  const results = await db
    .selectDistinct({
      rankingType: instituteNirfDataTable.rankingType,
    })
    .from(instituteNirfDataTable);
  const rankingTypeSet = new Set();
  results.forEach((e) => {
    const temp = e.rankingType.split(";");
    temp.forEach((e) => {
      rankingTypeSet.add(e);
    });
  });
  return Array.from(rankingTypeSet);
});
