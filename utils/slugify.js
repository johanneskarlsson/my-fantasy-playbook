export const slugify = (string) => {
  return string.replace(/\s/g, "-").toLowerCase();
};
