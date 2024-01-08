import { useCallback, useState } from "react";
import { format } from "date-fns";
import html2canvas from "html2canvas";

export const downloadFile = (data: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  a.click();
};

const defaultScale = 4;
const defaultQuality = 0.75;

export type RenderedImage = {
  data: string;
  height: number;
  width: number;
};

export const renderImage = async (element: HTMLElement): Promise<RenderedImage> => {
  const canvas = await html2canvas(element, { scale: defaultScale });
  const data = canvas.toDataURL("image/jpeg", defaultQuality);

  return {
    data,
    height: canvas.height,
    width: canvas.width,
  };
};

export type ImageFile = {
  data: string;
  fileName: string;
};

export const createImageFile = async (targetElement: HTMLElement, now: () => number): Promise<ImageFile> => {
  const { data, height, width } = await renderImage(targetElement);
  const dateStr = format(now(), "yyyyMMddHHmmss");
  const fileName = `xy_${dateStr}_${width}x${height}.jpg`;

  return {
    data,
    fileName,
  };
};

export const useDownloadImageFile = (element: () => HTMLElement | null, now: () => number = Date.now) => {
  const [downloading, setDownloading] = useState(false);

  const downloadImageFile = useCallback(async () => {
    if (downloading) {
      return;
    }

    const el = element();
    if (!el) {
      return;
    }

    setDownloading(true);

    try {
      const { data, fileName } = await createImageFile(el, now);
      downloadFile(data, fileName);
    } finally {
      setDownloading(false);
    }
  }, [downloading, element, now]);

  return { downloading, downloadImageFile };
};
