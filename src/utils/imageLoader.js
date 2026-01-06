export function getImage(fileName) {
  return new URL(`../assets/images/${fileName}`, import.meta.url).href;
}
