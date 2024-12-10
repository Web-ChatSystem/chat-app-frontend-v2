import { ContextStylesParams, CSSObject, MantineTheme } from "@mantine/core";

/**
 * Stricter version of Mantine's ThemeComponent
 * See:
 * - node_modules/@mantine/styles/lib/theme/types/MantineTheme.d.ts
 * - https://mantine.dev/theming/default-props/#usage-with-typescript
 */
export interface ThemeComponent<
  Props extends ContextStylesParams,
  Names extends string,
  Params = unknown,
> {
  defaultProps?: (theme: MantineTheme) => Partial<Props>;
  styles?: (
    theme: MantineTheme,
    params: Partial<Params>,
    context: { variant?: Props["variant"]; size?: Props["size"] },
  ) => Partial<Record<Names, CSSObject>>;
}
