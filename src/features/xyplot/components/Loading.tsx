import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import { Progress } from "../createImageTableCells";
import { useMemo } from "react";
export type LoadingProps = {
  progress: Progress;
};

export const Loading = ({ progress }: LoadingProps) => {
  const progressValue = useMemo(() => {
    return progress ? Math.floor((progress.value * 100) / progress.max) : 0;
  }, [progress]);

  return (
    <Container maxWidth="md">
      <Stack alignItems="center" gap={1}>
        <LinearProgress variant="determinate" value={progressValue} sx={{ width: "100%" }} />
        <Typography fontWeight={600}>Loading {progress?.currentFile?.name}</Typography>
      </Stack>
    </Container>
  );
};
