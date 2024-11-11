import { Client } from "./Client";
import { Nutritionist } from "./Nutritionist";

export interface Consultation {
  _id: string;
  client: Client;
  nutritionist: Nutritionist;
  startAt: Date;
  endAt: Date;
}
