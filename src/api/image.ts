export function createImageUrl(
  imageName: string,
  options?: { height: number }
) {
  const queryParams = new URLSearchParams();
  const { height } = options ?? {};

  if (height) queryParams.append("h", height.toString());
  return `https://tomtomtom-528952985.imgix.net/${imageName}?${queryParams.toString()}`;
}

export function createAvatarImageUrl(imageName?: string | null) {
  return createImageUrl(imageName ?? "defaultAvatar.webp", {
    height: 50,
  });
}

export function createItemCardImageUrl(imageName?: string | null) {
  return createImageUrl(imageName ?? "image-not-found.webp", {
    height: 200,
  });
}
