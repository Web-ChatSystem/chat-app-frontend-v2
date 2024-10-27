import {
  CheckboxProps,
  CheckboxStylesNames,
  CheckboxStylesParams,
} from "@mantine/core";
import { ThemeComponent } from "./type";
import { makeThemeLightOnly } from "./utils";

export const ThemeCheckbox: ThemeComponent<
  CheckboxProps,
  CheckboxStylesNames,
  CheckboxStylesParams
> = {
  defaultProps: () => ({}),
  styles: (theme, params) => {
    const light = makeThemeLightOnly(theme);
    const colorKey = params.color ?? theme.primaryColor;
    return {
      input: {
        backgroundColor: light(theme.colors.gray[0]) || "",
        boxShadow: light(theme.other.insetShadows.md) || "",
        ":checked": {
          borderColor: light(theme.colors[colorKey]?.[9]) || "",
          boxShadow: light(theme.other.controlShadows.lg) || "",
        },
      },
      // @TODO: Do ":active" style at wrapper or root so it applies when press
      // on label as well
    };
  },
};
