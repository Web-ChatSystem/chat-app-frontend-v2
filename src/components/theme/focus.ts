import { CSSObject, MantineThemeOverride } from "@mantine/core";

export const themeFocusRingStyle: Required<MantineThemeOverride>["focusRingStyles"] =
  {
    inputStyles: (theme) => {
      const { primaryShade, colors, colorScheme } = theme;
      // A bit verbose because "theme.fn" is not available here
      // - https://mantine.dev/theming/theme-object/#focusringstyles
      const shade =
        typeof primaryShade === "object"
          ? primaryShade[colorScheme]
          : primaryShade;
      const color = colors[theme.primaryColor]?.[shade];
      const styles: CSSObject = {
        outline: `solid 1px ${color}`,
        borderColor: color || "",
      };
      return styles;
    },
  };
