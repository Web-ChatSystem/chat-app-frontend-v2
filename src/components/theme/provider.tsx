import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { ReactNode } from "react";
import { theme } from "./theme";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = (props: Props): JSX.Element => {
  const { children } = props;

  const { colorScheme } = useMantineColorScheme();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ ...theme, colorScheme }}
    >
      {children}
    </MantineProvider>
  );
};
