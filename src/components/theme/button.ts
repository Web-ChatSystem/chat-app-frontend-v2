import {
  ButtonProps,
  ButtonStylesNames,
  ButtonStylesParams,
} from "@mantine/core";
import { ThemeComponent } from "./type";
import { makeThemeLightOnly } from "./utils";

export const ThemeButton: ThemeComponent<
  ButtonProps,
  ButtonStylesNames,
  ButtonStylesParams
> = {
  defaultProps: () => ({
    variant: "default",
  }),
  styles: (theme, params, context) => {
    const light = makeThemeLightOnly(theme);
    const isFilled = context.variant === "filled";
    const isDefault = context.variant === "default";
    const color = theme.colors[params.color ?? theme.primaryColor];
    const gray = theme.colors.gray;
    const shadows = theme.other.controlShadows;

    return {
      root: {
        borderColor: light(isFilled ? color?.[9] : undefined) || "",
        backgroundColor: light(isDefault ? gray[0] : undefined) || "",
        ":hover": {
          backgroundColor: light(isDefault ? gray[1] : undefined) || "",
        },
        boxShadow: light(isFilled ? shadows.lg : shadows.md) || "none",
        ":active": { boxShadow: light("none") || "none" },
      },
    };
  },
};
