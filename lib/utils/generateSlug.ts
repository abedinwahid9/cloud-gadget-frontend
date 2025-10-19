export const generateSlug = (val: string) =>
  val
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
