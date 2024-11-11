import { z } from "zod";

export const commonSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export const nutritionistSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
})
