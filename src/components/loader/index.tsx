import { LoadingOverlay, Paper } from "@mantine/core";

export const Loader = () => {
  return (
    <Paper pos="relative" h={200}>
      <LoadingOverlay visible overlayBlur={3} />
    </Paper>
  );
};
