import { MantineTheme } from "@mantine/core";

// @TODO: Figure out how to have this inside theme
// e.g. theme.other.lightOnly(...)?
export const makeThemeLightOnly = (theme: MantineTheme) => {
  const themeLightOnly = <T>(actual: T): T | undefined => {
    return theme.colorScheme !== "light" ? undefined : actual;
  };
  return themeLightOnly;
};
