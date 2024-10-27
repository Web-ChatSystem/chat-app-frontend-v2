import { BadgeProps, BadgeStylesNames, BadgeStylesParams } from "@mantine/core";
import { ThemeComponent } from "./type";

export const ThemeBadge: ThemeComponent<
  BadgeProps,
  BadgeStylesNames,
  BadgeStylesParams
> = {
  defaultProps: () => ({
    variant: "dot",
    size: "lg",
  }),
};
