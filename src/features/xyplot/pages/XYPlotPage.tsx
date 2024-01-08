"use client";

import { downloadFile } from "@/features/shared/file/downloadFile";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Container, LinearProgress, Link, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ImageTable, ImageTableCell, createImageTableWithCells } from "../ImageTable";
import { ImageTableComponent } from "../components/ImageTableComponent";
import { MainToolbar } from "../components/MainToolbar";
import { TransformToolbar } from "../components/TransformToolbar";
import { renderImage } from "../renderImage";
import { Progress, createImageTableCells } from "../createImageTableCells";
import { Loading } from "../components/Loading";
import { format } from "date-fns";

export type XYPlotPageProps = {};

export const XYPlotPage = ({}: XYPlotPageProps) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [cells, setCells] = useState<ImageTableCell[]>([]);
  const [table, setTable] = useState<ImageTable | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<Progress | null>(null);

  const onProgress = useCallback((progress: Progress) => {
    setProgress(progress);
  }, []);

  const onDrop = useCallback(
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

  const zoomIn = useCallback(() => {
    transformComponentRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    transformComponentRef.current?.zoomOut();
  }, []);

  const resetTransform = useCallback(() => {
    transformComponentRef.current?.resetTransform();
  }, []);

  const download = useCallback(async () => {
    if (!tableRef.current) {
      return;
    }
    const url = await renderImage(tableRef.current);
    const fileName = "imagexy_" + format(new Date(), "yyyyMMddHHmmss") + ".jpg";
    downloadFile(url, fileName);
  }, []);

  useEffect(() => {
    setTable(cells.length > 0 ? createImageTableWithCells(cells) : null);
  }, [cells]);

  useEffect(() => {
    transformComponentRef.current?.resetTransform();
  }, [table]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => {
            const rootProps = getRootProps();
            const { onClick, ...clickDisabledRootProps } = rootProps;

            return (
              <Box sx={{ height: "100%", width: "100%" }}>
                {loading ? (
                  <Stack alignItems="center" justifyContent="center" sx={{ height: "100%", width: "100%" }}>
                    {progress ? <Loading progress={progress} /> : null}
                  </Stack>
                ) : table ? (
                  <Box sx={{ height: "100%", width: "100%" }} {...clickDisabledRootProps}>
                    <input {...getInputProps()} />
                    <TransformWrapper centerOnInit={true} maxScale={16} minScale={0.5} ref={transformComponentRef}>
                      <TransformComponent wrapperStyle={{ height: "100%", padding: "16px", width: "100%" }}>
                        <Paper>
                          <Box ref={tableRef}>
                            <ImageTableComponent table={table} />
                          </Box>
                        </Paper>
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>
                ) : (
                  <Container maxWidth="md" sx={{ pt: 8 }}>
                    <Stack gap={4}>
                      <Box alignItems="center" justifyContent="center" sx={{ border: "1px dashed rgba(0, 0, 0, 0.3)", borderRadius: "8px", cursor: "pointer", p: 4 }} {...rootProps}>
                        <input {...getInputProps()} />
                        <Stack gap={4}>
                          <Stack alignItems="center">
                            <ImageIcon sx={{ fontSize: "64px", opacity: 0.5 }} />
                            <Typography sx={{ opacity: 0.8 }}>Drop image files</Typography>
                          </Stack>
                          <Stack>
                            <Typography sx={{ fontSize: "80%", opacity: 0.8, textAlign: "center" }}>
                              Supported file name format is <strong>[x_label]_[y_label]_[index].[ext]</strong>.
                            </Typography>
                            <Typography sx={{ fontSize: "80%", opacity: 0.8, textAlign: "center" }}>For example, cfg8_steps20_0001.jpeg.</Typography>
                          </Stack>
                        </Stack>
                      </Box>
                      <Stack alignItems="center">
                        <Link href="https://github.com/drchama/imagexy" target="_blank">
                          <GitHubIcon sx={{ fontSize: "32px" }} />
                        </Link>
                      </Stack>
                    </Stack>
                  </Container>
                )}
              </Box>
            );
          }}
        </Dropzone>
        <Paper sx={{ position: "absolute", left: "24px", top: "24px", zIndex: 1 }}>
          <MainToolbar />
        </Paper>
        <Paper sx={{ position: "absolute", left: "24px", bottom: "24px", zIndex: 1 }}>
          <TransformToolbar zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
        </Paper>
        <Box sx={{ position: "absolute", right: "24px", bottom: "24px", zIndex: 1 }}>
          <Button variant="contained" onClick={download} size="large" startIcon={<DownloadIcon />}>
            Download X/Y plotted Image
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
