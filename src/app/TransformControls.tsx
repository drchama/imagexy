"use client";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Button, IconButton, Stack } from "@mui/material";

export type TransformControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
};

export const TransformControls = ({ zoomIn, zoomOut, resetTransform }: TransformControlsProps) => {
  return (
    <Stack direction="row" gap={0}>
      <IconButton color="primary" size="large" onClick={() => zoomIn()}>
        <ZoomInIcon />
      </IconButton>
      <IconButton color="primary" size="large" onClick={() => zoomOut()}>
        <ZoomOutIcon />
      </IconButton>
      <Button color="primary" onClick={() => resetTransform()} size="small" sx={{ px: 2 }}>
        Reset View
      </Button>
    </Stack>
  );
};
