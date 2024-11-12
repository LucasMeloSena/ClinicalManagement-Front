import { DeepMap, DeepPartial, FieldValues } from "react-hook-form";

export function dirtyValues<T extends FieldValues>(
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>,
  data: T,
): Partial<T> & { id?: T["id"] } {
  const dirtyData: Partial<T> & { id?: T["id"] } = {};

  if ("id" in data) {
    dirtyData.id = data.id;
  }

  for (const key in dirtyFields) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      dirtyData[key as keyof T] = data[key];
    }
  }
  return dirtyData;
}
