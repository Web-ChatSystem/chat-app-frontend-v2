import { InputProps, InputStylesNames, InputStylesParams } from "@mantine/core";
import { ThemeComponent } from "./type";
import { makeThemeLightOnly } from "./utils";

export const ThemeInput: ThemeComponent<
  InputProps,
  InputStylesNames,
  InputStylesParams
> = {
  defaultProps: () => ({
    // Avoid Mantine defaults to "filled" in dark mode
    // - https://mantine.dev/core/text-input/?t=props
    variant: "default",
  }),
  styles: (theme) => {
    const light = makeThemeLightOnly(theme);
    return {
      input: {
        boxShadow: light(theme.other.insetShadows.md) || "none",
        backgroundColor: light(theme.colors.gray[0]) || "",
        ":focus": { backgroundColor: light(theme.white) || "" },
      },
    };
  },
};
