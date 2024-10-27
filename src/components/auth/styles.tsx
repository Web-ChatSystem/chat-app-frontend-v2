import { MantineTheme, Sx } from "@mantine/core";

export const CardStyles: Sx = (theme: MantineTheme) => ({
  [`@media (min-width: ${theme.breakpoints.md})`]: {
    width: "50%",
  },
  [`@media (min-width: ${theme.breakpoints.lg})`]: {
    width: "40%",
  },
});
