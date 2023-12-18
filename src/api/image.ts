export function createImageUrl(
  imageName: string,
  options?: { height: number }
) {
  const queryParams = new URLSearchParams();
  const { height } = options ?? {};

  if (height) queryParams.append("h", height.toString());
  return `https://tomtomtom-528952985.imgix.net/${imageName}?${queryParams.toString()}`;
}
