import { z } from "zod";

export const commonSchema = z.object({
  id: z.string(),
  name: z.string(),
});
