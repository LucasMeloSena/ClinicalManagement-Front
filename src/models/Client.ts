export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  cpf: string;
  bodyBiotype: BodyBiotype;
  deletedAt?: Date;
}

export enum BodyBiotype {
  Ectomorfo = "Ectomorfo",
  Mesomorfo = "Mesomorfo",
  Endomorfo = "Endomorfo",
}

export const bodyBiotypeOptions = [
  { id: "1", name: BodyBiotype.Ectomorfo },
  { id: "2", name: BodyBiotype.Endomorfo },
  { id: "3", name: BodyBiotype.Mesomorfo },
];
