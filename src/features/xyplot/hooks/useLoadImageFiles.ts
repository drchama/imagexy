import { useCallback, useEffect, useState } from "react";
import { ImageTable, ImageTableCell, createImageTableWithCells, parseImageLocation } from "./ImageTable";
import { resizeImage } from "@/features/shared/image/resizeImage";

export const readAsDataURL = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") {
        reject("result type is not string");
        return;
      }
      resolve(reader.result);
    });

    reader.addEventListener("error", () => {
      reject(reader.error);
    });

    reader.readAsDataURL(file);
  });
};

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

export const useLoadImageFiles = () => {
  const [cells, setCells] = useState<ImageTableCell[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [table, setTable] = useState<ImageTable | null>(null);

  const onProgress = useCallback((progress: Progress) => {
    setProgress(progress);
  }, []);

  const loadImageFiles = useCallback(
    async (files: File[]) => {
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        const cells = await createImageTableCells(files, onProgress);
        setCells(cells);
      } finally {
        setLoading(false);
      }
    },
    [loading, onProgress]
  );

  useEffect(() => {
    setTable(cells.length > 0 ? createImageTableWithCells(cells) : null);
  }, [cells]);

  return { cells, loadImageFiles, loading, progress, table };
};
