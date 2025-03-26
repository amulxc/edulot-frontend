import { and, eq } from "drizzle-orm";
import { db } from "../../db/index";
import { instituteNirfDataTable, instituteTable } from "../../db/schema/schema";
import { RankerService, RankInputSchema } from "../../services/ranker_service";

defineRouteMeta({
  openAPI: {
    tags: ["Ranker"],
    description: "Rank colleges based on user input",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "state",
              "city",
              "rankingType",
              "researchScore",
              "theoryScore",
              "campusLifeScore",
              "internationalExposureScore",
              "placementRecordScore",
              "academicScore",
              "infrastructureScore",
              "researchOpportunitiesScore",
              "industryConnectionScore",
              "costEffectivenessScore",
              "influenceFactor",
            ],
            properties: {
              state: {
                type: "string",
                default: "Tamil Nadu",
              },
              city: {
                type: "string",
                default: "Chennai",
              },
              rankingType: {
                type: "string",
                default: "EngineeringRanking",
              },
              researchScore: {
                type: "number",
              },
              theoryScore: {
                type: "number",
              },
              campusLifeScore: {
                type: "number",
              },
              internationalExposureScore: {
                type: "number",
              },
              placementRecordScore: {
                type: "number",
              },
              academicScore: {
                type: "number",
              },
              infrastructureScore: {
                type: "number",
              },
              researchOpportunitiesScore: {
                type: "number",
              },
              industryConnectionScore: {
                type: "number",
              },
              costEffectivenessScore: {
                type: "number",
              },
              influenceFactor: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { success, data } = RankInputSchema.safeParse(body);
  if (!success) {
    throw createError({
      status: 400,
      statusMessage: "Invalid input",
    });
  }
  let collegesList = await db
    .select()
    .from(instituteTable)
    .innerJoin(
      instituteNirfDataTable,
      eq(instituteTable.id, instituteNirfDataTable.instituteId)
    )
    .where(
      and(
        eq(instituteTable.state, data.state),
        eq(instituteTable.city, data.city)
      )
    );
  collegesList = collegesList.filter((element) =>
    element.institute_nirf_data.rankingType.includes(data.rankingType)
  );
  const rankerService = new RankerService(data);
  const step4Weights = rankerService.step_4();
  const response = [];
  collegesList.forEach((element) => {
    const step4Scores = rankerService.step_4_edulot(
      step4Weights,
      element.institute_nirf_data
    );
    const step5Score = rankerService.step_5(step4Scores);
    response.push({
      institute: element,
      score: Object.values(step5Score).reduce((a, b) => a + b, 0),
    });
  });
  response.sort((a, b) => b.score - a.score);
  return response;
});
