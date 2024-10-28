import { MantineTheme, Sx } from "@mantine/core";

export const CardStyles: Sx = (theme: MantineTheme) => ({
  // Căn giữa theo chiều ngang và chiều dọc
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Chiều cao toàn màn hình

  // Responsive cho kích thước của Card
  [`@media (min-width: ${theme.breakpoints.md})`]: {
    width: "50%",
  },
  [`@media (min-width:  ${theme.breakpoints.lg})`]: {
    width: "40%",
  },

  // Đảm bảo card có kích thước hợp lý trên màn hình nhỏ
  width: "90%", // Mặc định cho các màn hình nhỏ
});
