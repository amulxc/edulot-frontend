import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { instituteTable } from "../db/schema/schema";

export class InstituteService {
  constructor() {}
  async getInstituteById(id: string) {
    const response = await db
      .select()
      .from(instituteTable)
      .where(eq(instituteTable.id, id))
      .limit(1);
    if (response.length === 0) {
      return undefined;
    }
    return response[0];
  }
  async getAllInstitutes() {
    return await db.select().from(instituteTable);
  }
  async getInstituteByCity(city: string) {
    return await db
      .select()
      .from(instituteTable)
      .where(eq(instituteTable.city, city));
  }
  async getInstituteByState(state: string) {
    return await db
      .select()
      .from(instituteTable)
      .where(eq(instituteTable.state, state));
  }
  async getInstituteByCityAndState(city: string, state: string) {
    const result = await db
      .select()
      .from(instituteTable)
      .where(
        and(eq(instituteTable.city, city), eq(instituteTable.state, state))
      );
    return result;
  }
  async getAllStatesAndCities() {
    const result = await db
      .selectDistinct({
        city: instituteTable.city,
        state: instituteTable.state,
      })
      .from(instituteTable);
    return result;
  }
}
