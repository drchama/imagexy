import html2canvas from "html2canvas";

const defaultScale = 4;
const defaultQuality = 0.75;

export const renderImage = async (element: HTMLElement): Promise<string> => {
  const canvas = await html2canvas(element, { scale: defaultScale });
  const url = canvas.toDataURL("image/jpeg", defaultQuality);
  return url;
};
