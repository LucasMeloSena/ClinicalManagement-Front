import { Dayjs } from "dayjs";
import { z } from "zod";
import { commonSchema } from "../utils/common-zod-schema";
import { BodyBiotype } from "./Client";

export const consultationSchema = z.object({
  date: z.custom<Dayjs>(),
  startAt: z.custom<Dayjs>(),
  endAt: z.custom<Dayjs>(),
  client: commonSchema,
  nutritionist: commonSchema,
  intervalOfDaysToRepeat: z.coerce.number().optional(),
});

const bodyBiotypeSchema = z.object({
  id: z.string(),
  name: z.nativeEnum(BodyBiotype),
});

export const clientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().length(15),
  birthDate: z.custom<Dayjs>(),
  cpf: z.string().length(14),
  bodyBiotype: bodyBiotypeSchema,
});

