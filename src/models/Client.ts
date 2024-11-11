export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  cpf: string;
  bodyBiotype: BodyBiotype;
}

export enum BodyBiotype {
  Ectomorfo = "Ectomorfo",
  Mesomorfo = "Mesomorfo",
  Endomorfo = "Endomorfo",
}
