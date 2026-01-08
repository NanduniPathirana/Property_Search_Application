// Import all images at build time (Vite requirement)
const images = import.meta.glob('../assets/images/*', {
  eager: true,
  import: 'default'
});

export function getImage(imageName) {
  if (!imageName) return '';

  const imagePath = `../assets/images/${imageName}`;
  return images[imagePath] || '';
}
