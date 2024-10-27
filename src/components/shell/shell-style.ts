import { AppShellProps } from "@mantine/core";

export const appShellStyles: Required<AppShellProps>["styles"] = (theme) => {
  const { colorScheme, colors } = theme;
  return {
    main: {
      background: colorScheme === "dark" ? colors.dark[8] : colors.gray[0],
      overflowX: "hidden",
    },
  };
};
