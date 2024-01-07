"use client";

import { ImageCell } from "./imageTable";
import { createLocationWithFileName } from "./location";
import { readAsDataURL } from "./readAsDataURL";
import { resizeImage } from "./resizeImage";

export const createImageCells = async (files: File[]): Promise<ImageCell[]> => {
  const cells: ImageCell[] = [];

  for (const file of files) {
    try {
      if (!file.type.startsWith("image/")) {
        continue;
      }
      const location = createLocationWithFileName(file.name);
      const data = await resizeImage(await readAsDataURL(file), 1024, 1024);
      const cell: ImageCell = { location, name: file.name, data };
      cells.push(cell);
    } catch (err) {
      console.log(err);
    }
  }

  return cells;
};
