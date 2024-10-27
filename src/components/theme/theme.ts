import { MantineTheme, MantineThemeOverride } from "@mantine/core";

import { ThemeBadge } from "./badge";
import { ThemeButton } from "./button";
import { ThemeCheckbox } from "./checkbox";
import { themeFocusRingStyle } from "./focus";
import { ThemeInput } from "./input";
import { ThemePagination } from "./pagination";
import { themeOtherShadows, ThemeOtherShadows } from "./shadows";

declare module "@mantine/core" {
  export interface MantineThemeOther extends ThemeOtherShadows {}
}

export const theme: MantineThemeOverride = {
  defaultRadius: "xs",
  components: {
    Badge: ThemeBadge,
    Button: ThemeButton,
    Checkbox: ThemeCheckbox,
    Input: ThemeInput,
    Pagination: ThemePagination,
    // Force type due to incompatible "size"
    // See: https://github.com/mantinedev/mantine/issues/3759
  } as MantineTheme["components"],
  cursorType: "pointer",
  focusRing: "auto",
  focusRingStyles: themeFocusRingStyle,
  // Some parts of Mantine support extension (like color).
  // For others, it's better to use "other" to extend. See:
  // - https://mantine.dev/theming/theme-object/#other
  // - https://github.com/mantinedev/mantine/discussions/2288#discussioncomment-3917760
  other: {
    ...themeOtherShadows,
  },
};
