import { Button, CircularProgress, Divider, IconButton, Link, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

export type MainToolbarProps = {
  downloading: boolean;
  downloadImageFile: () => void;
  openImageFiles: () => void;
};

export const MainToolbar = ({ downloading, downloadImageFile, openImageFiles }: MainToolbarProps) => {
  return (
    <Toolbar variant="dense" disableGutters>
      <Typography color="inherit" sx={{ fontWeight: 800, px: 2, textTransform: "uppercase" }}>
        ImageXY
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Button onClick={openImageFiles} startIcon={<OpenInBrowserIcon />} sx={{ px: 2 }}>
        Open
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button onClick={downloadImageFile} startIcon={downloading ? <CircularProgress size="12px" /> : <DownloadIcon />} sx={{ px: 2 }}>
        Download
      </Button>
      <Divider orientation="vertical" flexItem />
      <Link href="https://github.com/drchama/imagexy" sx={{ px: 0.5 }} target="_blank">
        <IconButton color="primary">
          <GitHubIcon />
        </IconButton>
      </Link>
    </Toolbar>
  );
};
