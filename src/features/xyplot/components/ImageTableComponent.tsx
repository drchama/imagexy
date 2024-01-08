import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { ImageTable } from "../ImageTable";

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
                {xLabel.raw}
              </TableCell>
            ))}
          </TableRow>
          {table.yLabels.map((yLabel, yIndex) => (
            <TableRow key={yIndex}>
              <TableCell sx={{ fontWeight: "600", textAlign: "center", textTransform: "uppercase" }}>{yLabel.raw}</TableCell>
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
                      <Box>{table.xLabels[xIndex].raw}</Box>
                      <Box>/</Box>
                      <Box>{yLabel.raw}</Box>
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
