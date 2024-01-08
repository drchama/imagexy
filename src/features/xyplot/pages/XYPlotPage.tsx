"use client";

import ImageIcon from "@mui/icons-material/Image";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import Dropzone from "react-dropzone";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ImageTableComponent } from "../components/ImageTableComponent";
import { Loading } from "../components/Loading";
import { MainToolbar } from "../components/MainToolbar";
import { TransformToolbar } from "../components/TransformToolbar";
import { useDownloadImageFile } from "../hooks/useDownloadImageFile";
import { useLoadImageFiles } from "../hooks/useLoadImageFiles";

export type XYPlotPageProps = {};

export const XYPlotPage = ({}: XYPlotPageProps) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const { loading, loadImageFiles, progress, table } = useLoadImageFiles();

  const onDrop = useCallback(
    async (files: File[]) => {
      loadImageFiles(files);
    },
    [loadImageFiles]
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

  const { downloading, downloadImageFile } = useDownloadImageFile(() => tableRef.current);

  const resetAndDownload = useCallback(() => {
    transformComponentRef.current?.resetTransform(0, "linear");
    setTimeout(() => {
      downloadImageFile();
    }, 0);
  }, [downloadImageFile]);

  useEffect(() => {
    transformComponentRef.current?.resetTransform();
  }, [table]);

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, open }) => {
        const rootProps = getRootProps();
        const { onClick, ...clickDisabledRootProps } = rootProps;
        const inputProps = getInputProps();

        return (
          <Box sx={{ height: "100vh" }}>
            <Box sx={{ height: "100%", width: "100%" }}>
              {loading ? (
                <Stack alignItems="center" justifyContent="center" sx={{ height: "100%", width: "100%" }}>
                  {progress ? <Loading progress={progress} /> : null}
                </Stack>
              ) : table ? (
                <Box sx={{ height: "100%", width: "100%" }} {...clickDisabledRootProps}>
                  <input {...inputProps} />
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
                <Box sx={{ height: "100%", pt: 8, width: "100%" }} {...clickDisabledRootProps}>
                  <Container maxWidth="md">
                    <Stack gap={4}>
                      <Box alignItems="center" justifyContent="center" sx={{ border: "1px dashed rgba(0, 0, 0, 0.3)", borderRadius: "8px", cursor: "pointer", p: 4 }} onClick={onClick}>
                        <input {...inputProps} />
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
                    </Stack>
                  </Container>
                </Box>
              )}
            </Box>
            <Paper sx={{ position: "absolute", left: "24px", top: "24px", zIndex: 1 }}>
              <MainToolbar downloading={downloading} downloadImageFile={resetAndDownload} openImageFiles={open} />
            </Paper>
            <Paper sx={{ position: "absolute", left: "24px", bottom: "24px", zIndex: 1 }}>
              <TransformToolbar zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
            </Paper>
          </Box>
        );
      }}
    </Dropzone>
  );
};
