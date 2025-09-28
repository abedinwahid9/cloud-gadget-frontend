// Slug generator
export const generateSlug = (val: string) =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
