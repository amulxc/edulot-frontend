import { InstituteService } from "../../services/institute_service";

defineRouteMeta({
  openAPI: {
    description: "Get all states and cities",
    tags: ["Location"],
  },
});

export default defineEventHandler(async (event) => {
  const instituteService = new InstituteService();
  const dbRepesponse = await instituteService.getAllStatesAndCities();
  const states = new Set(dbRepesponse.map((item) => item.state));
  const result: {
    [key: string]: string[];
  } = {};
  states.forEach((state) => {
    result[state] = dbRepesponse
      .filter((item) => item.state === state)
      .map((item) => item.city);
  });
  return result;
});
