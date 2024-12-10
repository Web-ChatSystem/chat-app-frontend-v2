export interface ThemeOtherShadows {
  controlShadows: { md: string; lg: string };
  insetShadows: { md: string };
}

export const themeOtherShadows: ThemeOtherShadows = {
  controlShadows: {
    md: "0 1px 2px rgba(0, 0, 0, 0.1)",
    lg: "0 1px 2px rgba(0, 0, 0, 0.25)",
  },
  insetShadows: {
    md: "inset 0 1px 1px rgba(0, 0, 0, 0.05)",
  },
};
