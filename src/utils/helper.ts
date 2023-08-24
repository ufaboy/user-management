function getImageUrl(image: Blob) {
  return window.URL.createObjectURL(image);
}

export { getImageUrl };
