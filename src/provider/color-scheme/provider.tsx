import { ColorScheme, ColorSchemeProvider as RawProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ColorSchemeProvider = (props: Props): JSX.Element => {
  const { children } = props;

  // We don't have a "system" option yet. This is only the initial value.
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const opposite = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(value ?? opposite);
  };

  return (
    <RawProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </RawProvider>
  );
};
