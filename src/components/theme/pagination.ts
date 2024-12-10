import {
  PaginationProps,
  PaginationStylesNames,
  PaginationStylesParams,
} from "@mantine/core";
import { ThemeComponent } from "./type";
import { makeThemeLightOnly } from "./utils";

export const ThemePagination: ThemeComponent<
  PaginationProps,
  PaginationStylesNames,
  PaginationStylesParams
> = {
  defaultProps: (theme) => {
    const light = makeThemeLightOnly(theme);
    return {
      radius: "xs",
      // There is no "root" in Pagination's StylesApi so we need to use this
      style: {
        background: light(theme.colors.gray[1]),
        padding: theme.spacing.xs,
        borderRadius: theme.defaultRadius,
      },
    };
  },
};
