import { z } from "zod";
import { instituteNirfDataTable } from "../db/schema/schema";
// Define the RankInputSchema using Zod
export const RankInputSchema = z.object({
  researchScore: z.number().int().min(0).max(5),
  theoryScore: z.number().int().min(0).max(5),
  campusLifeScore: z.number().int().min(0).max(5),
  internationalExposureScore: z.number().int().min(0).max(3),
  placementRecordScore: z.number().int().min(0).max(3),
  academicScore: z.number().int().min(0).max(3),
  infrastructureScore: z.number().int().min(0).max(3),
  researchOpportunitiesScore: z.number().int().min(0).max(3),
  industryConnectionScore: z.number().int().min(0).max(3),
  costEffectivenessScore: z.number().int().min(0).max(3),
  influenceFactor: z.number().default(0.5),
  city: z.string(),
  state: z.string(),
  rankingType: z.string(),
});
// Dummy JSON data for RankInputSchema
// const dummyRankInput = {
//   "researchScore": 4,
//   "theoryScore": 3,
//   "campusLifeScore": 5,
//   "internationalExposureScore": 2,
//   "placementRecordScore": 3,
//   "academicScore": 2,
//   "infrastructureScore": 3,
//   "researchOpportunitiesScore": 1,
//   "industryConnectionScore": 2,
//   "costEffectivenessScore": 3,
//   "influenceFactor": 0.5,
//   "city": "Chennai",
//   "state": "Tamil Nadu",
//   "rankingType": "Sample Ranking Type"
// };
export type RankInputType = z.infer<typeof RankInputSchema>;

function getIndustryScore(input: RankInputType): number {
  return 5 - input.researchScore;
}

function getPracticalScore(input: RankInputType): number {
  return 5 - input.theoryScore;
}

class WeightsType {
  fsr: number = 0.7;
  ss: number = 0.7;
  fqe: number = 0.7;
  fru: number = 0.7;
  pu: number = 0.7;
  qp: number = 0.7;
  ipr: number = 0.7;
  fppp: number = 0.7;
  gue: number = 0.7;
  gph: number = 0.7;
  rd: number = 0.7;
  wd: number = 0.7;
  escs: number = 0.7;
  pcs: number = 0.7;
  pr: number = 0.7;
}

class NirfScoreType {
  fsr: number = 30.0;
  ss: number = 20.0;
  fqe: number = 20.0;
  fru: number = 30.0;
  pu: number = 35.0;
  qp: number = 35.0;
  ipr: number = 15.0;
  fppp: number = 15.0;
  gue: number = 60.0;
  gph: number = 40.0;
  rd: number = 30.0;
  wd: number = 30.0;
  escs: number = 20.0;
  pcs: number = 20.0;
  pr: number = 100.0;

  get totalScore(): number {
    return Object.values(this).reduce((acc, val) => acc + val, 0);
  }
}

export class RankerService {
  weights: WeightsType;
  rankerInput: RankInputType;

  constructor(rankerInput: RankInputType) {
    this.weights = new WeightsType();
    this.rankerInput = rankerInput;
  }

  normalizeWeights(weights: WeightsType): WeightsType {
    const total = Object.values(weights).reduce((acc, val) => acc + val, 0);
    const normalizedWeights = new WeightsType();
    Object.keys(weights).forEach((key) => {
      (normalizedWeights as any)[key] = (weights as any)[key] / total;
    });
    return normalizedWeights;
  }

  step_4_1(): WeightsType {
    const weights = new WeightsType();
    const researchSum =
      (this.rankerInput.influenceFactor * this.rankerInput.researchScore) / 5;
    weights.pu += researchSum;
    weights.qp += researchSum;
    weights.ipr += researchSum;
    const industrySum =
      (this.rankerInput.influenceFactor * getIndustryScore(this.rankerInput)) /
      5;
    weights.fppp += industrySum;
    weights.pr += industrySum;
    return this.normalizeWeights(weights);
  }

  step_4_2(): WeightsType {
    const weights = new WeightsType();
    const theorySum =
      (this.rankerInput.influenceFactor * this.rankerInput.theoryScore) / 5;
    weights.fqe += theorySum;
    weights.pu += theorySum;
    weights.qp += theorySum;
    weights.gue += theorySum;
    const practicalSum =
      (this.rankerInput.influenceFactor * getPracticalScore(this.rankerInput)) /
      5;
    weights.fsr += practicalSum;
    weights.fru += practicalSum;
    weights.ipr += practicalSum;
    weights.fppp += practicalSum;
    return this.normalizeWeights(weights);
  }

  step_4_3(): WeightsType {
    const weights = new WeightsType();
    const campusSum =
      (this.rankerInput.influenceFactor * this.rankerInput.campusLifeScore) / 5;
    weights.ss += campusSum;
    weights.rd += campusSum;
    weights.wd += campusSum;
    weights.escs += campusSum;
    weights.pcs += campusSum;
    return this.normalizeWeights(weights);
  }

  step_4_4(): WeightsType {
    const weights = new WeightsType();
    const internationalExposureSum =
      (this.rankerInput.influenceFactor *
        this.rankerInput.internationalExposureScore) /
      5;
    weights.fppp += internationalExposureSum;
    weights.rd += internationalExposureSum;
    weights.pr += internationalExposureSum;
    return this.normalizeWeights(weights);
  }

  step_4(): WeightsType {
    const consolidatedWeights = new WeightsType();
    [
      this.step_4_1(),
      this.step_4_2(),
      this.step_4_3(),
      this.step_4_4(),
    ].forEach((step) => {
      Object.keys(consolidatedWeights).forEach((key) => {
        (consolidatedWeights as any)[key] += (step as any)[key] / 4;
      });
    });
    return consolidatedWeights;
  }

  step_4_edulot(
    finalWeights: WeightsType,
    instituteNirfData: typeof instituteNirfDataTable.$inferSelect
  ): NirfScoreType {
    const finalWeightsDict = { ...finalWeights };
    const nirfDefaultScores = new NirfScoreType();
    const finalScores = new NirfScoreType();
    const instituteNirfDataDict = { ...instituteNirfData };

    Object.keys(finalWeightsDict).forEach((key) => {
      (finalScores as any)[key] =
        (instituteNirfDataDict[key] / (nirfDefaultScores as any)[key]) *
        (finalWeightsDict as any)[key] *
        100;
    });

    return finalScores;
  }
  step_5(step4FinalScores: NirfScoreType): NirfScoreType {
    const multiplierTable: Record<number, number> = {
      1: 1.15,
      2: 1.3,
      3: 1.5,
      0: 0,
    };
    const finalScores = new NirfScoreType();

    Object.keys(finalScores).forEach((key) => {
      (finalScores as any)[key] = Math.max(
        (step4FinalScores as any)[key],
        (step4FinalScores as any)[key] *
          multiplierTable[this.rankerInput.placementRecordScore],
        (step4FinalScores as any)[key] *
          multiplierTable[this.rankerInput.academicScore],
        (step4FinalScores as any)[key] *
          multiplierTable[this.rankerInput.infrastructureScore],
        (step4FinalScores as any)[key] *
          multiplierTable[this.rankerInput.researchOpportunitiesScore],
        (step4FinalScores as any)[key] *
          multiplierTable[this.rankerInput.industryConnectionScore]
      );
    });

    return finalScores;
  }

  getRank(instituteData: any): void {
    // Implement rank calculation logic here
  }
}
