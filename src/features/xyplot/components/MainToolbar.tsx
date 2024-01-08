import { Toolbar, Typography } from "@mui/material";

export const MainToolbar = () => {
  return (
    <Toolbar variant="dense">
      <Typography color="inherit" sx={{ fontWeight: 800, textTransform: "uppercase" }}>
        ImageXY
      </Typography>
    </Toolbar>
  );
};
