import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Button, IconButton, Toolbar } from "@mui/material";

export type TransformToolbarProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
};

export const TransformToolbar = ({ zoomIn, zoomOut, resetTransform }: TransformToolbarProps) => {
  return (
    <Toolbar disableGutters={true} variant="dense">
      <IconButton color="primary" size="large" onClick={() => zoomIn()}>
        <ZoomInIcon />
      </IconButton>
      <IconButton color="primary" size="large" onClick={() => zoomOut()}>
        <ZoomOutIcon />
      </IconButton>
      <Button color="primary" onClick={() => resetTransform()} size="small" sx={{ px: 2 }}>
        Reset View
      </Button>
    </Toolbar>
  );
};
