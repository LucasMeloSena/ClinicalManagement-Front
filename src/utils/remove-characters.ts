export function removeSpecialCharacters(content: string) {
  return content.replace(/[().\s-]/g, "");
}
