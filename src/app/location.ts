export type Location = {
  index: string;
  x: string;
  y: string;
};

export const createLocationWithFileName = (fileName: string): Location => {
  const nn = fileName.split(".")[0]?.split("_");
  if (!nn || nn.length < 3) {
    throw new Error("invalid file name");
  }
  return { x: nn[0], y: nn[1], index: nn[2] };
};
