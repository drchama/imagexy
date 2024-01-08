import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ImageTable } from "../hooks/ImageTable";
import { ReactNode } from "react";

export type ImageTableAxisLabelProps = {
  children?: ReactNode;
};

export const ImageTableAxisLabel = ({ children }: ImageTableAxisLabelProps) => {
  return (
    <Typography fontSize="120%" fontWeight={800} textTransform="uppercase">
      {children}
    </Typography>
  );
};

export type ImageTableCellLabelProps = {
  children?: ReactNode;
};

export const ImageTableCellLabel = ({ children }: ImageTableCellLabelProps) => {
  return (
    <Typography fontWeight={600} textTransform="uppercase">
      {children}
    </Typography>
  );
};

export type ImageTableComponentProps = {
  table: ImageTable;
};

export const ImageTableComponent = ({ table }: ImageTableComponentProps) => {
  return (
    <TableContainer component={Box}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            {table.xLabels.map((xLabel, xIndex) => (
              <TableCell key={xIndex} sx={{ textAlign: "center" }}>
                <ImageTableAxisLabel>{xLabel.raw}</ImageTableAxisLabel>
              </TableCell>
            ))}
          </TableRow>
          {table.yLabels.map((yLabel, yIndex) => (
            <TableRow key={yIndex}>
              <TableCell sx={{ textAlign: "center" }}>
                <ImageTableAxisLabel>{yLabel.raw}</ImageTableAxisLabel>
              </TableCell>
              {table.table[yIndex].map((cells, xIndex) => (
                <TableCell key={xIndex}>
                  <Stack>
                    <Stack direction="row">
                      {cells.map((cell, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={cell.fileName}
                          key={index}
                          src={cell.data}
                          style={{
                            objectFit: "contain",
                            maxHeight: "196px",
                            maxWidth: "196px",
                          }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                      <ImageTableCellLabel>
                        {table.xLabels[xIndex].raw}/{yLabel.raw}
                      </ImageTableCellLabel>
                    </Stack>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
