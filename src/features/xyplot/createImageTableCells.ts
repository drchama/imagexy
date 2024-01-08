import { ImageTableCell, parseImageLocation } from "./ImageTable";
import { readAsDataURL } from "./readAsDataURL";
import { resizeImage } from "../shared/image/resizeImage";

export const defaultMaxImageSize = {
  height: 1024,
  width: 1024,
};

export type Progress = {
  currentFile: File | null;
  max: number;
  value: number;
};

export type ProgressHandler = (progress: Progress) => void;

export const createImageTableCells = async (files: File[], onProgress: ProgressHandler): Promise<ImageTableCell[]> => {
  const cells: ImageTableCell[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      onProgress({ currentFile: file, max: files.length, value: i });

      if (!file.type.startsWith("image/")) {
        continue;
      }
      const location = parseImageLocation(file.name);
      const data = await resizeImage(await readAsDataURL(file), defaultMaxImageSize.width, defaultMaxImageSize.height);
      const cell: ImageTableCell = { location, fileName: file.name, data };
      cells.push(cell);
    } catch (err) {
      console.log(err);
    }
  }

  return cells;
};
