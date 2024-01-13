export type ImageLabel = {
  raw: string;
  prefix: string;
  suffix: string;
};

export const parseImageLabel = (labelStr: string): ImageLabel => {
  const match = labelStr.match(/^(.*?)(\d+\.?\d*)$/);
  if (!match) {
    return { raw: labelStr, prefix: labelStr, suffix: "" };
  }
  return { raw: labelStr, prefix: match[1], suffix: match[2] };
};

export const compareImageLabels = (aLabel: ImageLabel, bLabel: ImageLabel): number => {
  if (aLabel.prefix !== bLabel.prefix) {
    return aLabel.prefix.localeCompare(bLabel.prefix);
  }
  return (parseFloat(aLabel.suffix) || 0) - (parseFloat(bLabel.suffix) || 0);
};

export const sortImageLabels = (labels: ImageLabel[]): ImageLabel[] => {
  return [...labels].sort(compareImageLabels);
};

export const deduplicateImageLabels = (labels: ImageLabel[]): ImageLabel[] => {
  return Object.values(labels.reduce((m, l, i) => ({ ...m, [l.raw]: l }), {}));
};

export type ImageLocation = {
  index: string;
  xLabel: ImageLabel;
  yLabel: ImageLabel;
};

const splitFileName = (fileName: string) => {
  const lastIndex = fileName.lastIndexOf(".");

  if (lastIndex < 0) {
    return { name: fileName, extension: "" };
  }

  return {
    name: fileName.slice(0, lastIndex),
    extension: fileName.slice(lastIndex + 1),
  };
};

export const parseImageLocation = (fileName: string): ImageLocation => {
  const { name } = splitFileName(fileName);
  const nn = name.split(/[_]/);
  if (!nn || nn.length < 3) {
    throw new Error("invalid file name");
  }
  const xLabel = parseImageLabel(nn[0]);
  const yLabel = parseImageLabel(nn[1]);
  return { xLabel, yLabel, index: nn[2] };
};

export const compareImageLocations = (aLocation: ImageLocation, bLocation: ImageLocation): number => {
  const c = compareImageLabels(aLocation.xLabel, bLocation.xLabel);
  if (c !== 0) {
    return c;
  }

  const d = compareImageLabels(aLocation.yLabel, bLocation.yLabel);
  if (d !== 0) {
    return d;
  }

  return (parseInt(aLocation.index) || 0) - (parseInt(bLocation.index) || 0);
};

export type ImageTableCell = {
  location: ImageLocation;
  fileName: string;
  data: string;
};

export const compareImageTableCells = (aCell: ImageTableCell, bCell: ImageTableCell): number => {
  return compareImageLocations(aCell.location, bCell.location);
};

export const sortImageTableCells = (cells: ImageTableCell[]): ImageTableCell[] => {
  return [...cells].sort(compareImageTableCells);
};

export type ImageTable = {
  xLabels: ImageLabel[];
  yLabels: ImageLabel[];
  table: ImageTableCell[][][];
};

export const createImageTableWithCells = (cells: ImageTableCell[]): ImageTable => {
  const xLabels = sortImageLabels(deduplicateImageLabels(cells.map((c) => c.location.xLabel)));
  const yLabels = sortImageLabels(deduplicateImageLabels(cells.map((c) => c.location.yLabel)));
  const xIndexByLabel: { [k: string]: number } = xLabels.reduce((m, l, i) => ({ ...m, [l.raw]: i }), {});
  const yIndexByLabel: { [k: string]: number } = yLabels.reduce((m, l, i) => ({ ...m, [l.raw]: i }), {});

  const table = new Array(yLabels.length);

  for (let i = 0; i < yLabels.length; i++) {
    table[i] = new Array(xLabels.length);
    for (let j = 0; j < xLabels.length; j++) {
      table[i][j] = [];
    }
  }

  for (const cell of cells) {
    const xIndex = xIndexByLabel[cell.location.xLabel.raw] ?? 0;
    const yIndex = yIndexByLabel[cell.location.yLabel.raw] ?? 0;
    table[yIndex][xIndex].push(cell);
  }

  for (let i = 0; i < yLabels.length; i++) {
    for (let j = 0; j < xLabels.length; j++) {
      table[i][j] = sortImageTableCells(table[i][j]);
    }
  }

  return { xLabels, yLabels, table };
};
