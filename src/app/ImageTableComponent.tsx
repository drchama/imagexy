import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { ImageTable } from "./imageTable";

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
              <TableCell key={xIndex} sx={{ fontWeight: "600", textAlign: "center", textTransform: "uppercase" }}>
                {xLabel}
              </TableCell>
            ))}
          </TableRow>
          {table.yLabels.map((yLabel, yIndex) => (
            <TableRow key={yIndex}>
              <TableCell sx={{ fontWeight: "600", textAlign: "center", textTransform: "uppercase" }}>{yLabel}</TableCell>
              {table.table[yIndex].map((cells, xIndex) => (
                <TableCell key={xIndex}>
                  <Stack>
                    <Stack direction="row">
                      {cells.map((cell, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={cell.name}
                          key={index}
                          src={cell.data}
                          style={{
                            objectFit: "contain",
                            maxHeight: "256px",
                            maxWidth: "256px",
                          }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" sx={{ fontSize: "80%", fontWeight: 600, textTransform: "uppercase" }}>
                      <Box>{table.xLabels[xIndex]}</Box>
                      <Box>/</Box>
                      <Box>{yLabel}</Box>
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
