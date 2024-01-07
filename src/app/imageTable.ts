import { Location } from "./location";

export type ImageCell = {
  location: Location;
  name: string;
  data: string;
};

export type ImageTable = {
  xLabels: string[];
  yLabels: string[];
  table: ImageCell[][][];
};

export const splitLabel = (label: string) => {
  const match = label.match(/^(.*?)(\d+)$/);
  if (!match) {
    return { prefix: label, suffix: "" };
  }
  return { prefix: match[1], suffix: match[2] };
};

export const compareLabels = (aLabel: string, bLabel: string): number => {
  const a = splitLabel(aLabel);
  const b = splitLabel(bLabel);

  const c = a.prefix.localeCompare(b.prefix);
  if (c !== 0) {
    return c;
  }

  return (parseInt(a.prefix) || 0) - (parseInt(b.prefix) || 0);
};

export const sortLabels = (labels: string[]): string[] => {
  return [...labels].sort(compareLabels);
};

export const createImageTableWithCells = (cells: ImageCell[]): ImageTable => {
  const xLabels = sortLabels(Array.from(new Set(cells.map((c) => c.location.x))));
  const yLabels = sortLabels(Array.from(new Set(cells.map((c) => c.location.y))));
  const xLabelToIndexMap: { [label: string]: number } = xLabels.reduce((m, k, i) => ({ ...m, [k]: i }), {});
  const yLabelToIndexMap: { [label: string]: number } = yLabels.reduce((m, k, i) => ({ ...m, [k]: i }), {});

  const table = new Array(yLabels.length);

  for (let i = 0; i < yLabels.length; i++) {
    table[i] = new Array(xLabels.length);
    for (let j = 0; j < xLabels.length; j++) {
      table[i][j] = [];
    }
  }

  for (const cell of cells) {
    const xIndex = xLabelToIndexMap[cell.location.x] ?? 0;
    const yIndex = yLabelToIndexMap[cell.location.y] ?? 0;
    table[yIndex][xIndex].push(cell);
  }

  return {
    xLabels,
    yLabels,
    table,
  };
};
