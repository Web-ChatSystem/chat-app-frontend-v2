import { AppShell } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { ReactNode } from "react";
import { ShellHeader } from "./header";
import { ShellNav } from "./nav";
import { appShellStyles } from "@/components/shell/shell-style.ts";

interface Props {
  children: ReactNode;
}

export const Shell = (props: Props): JSX.Element => {
  const { children } = props;
  const [nav, toggleNav] = useToggle();

  return (
    <AppShell
      styles={appShellStyles}
      header={<ShellHeader nav={nav} toggleNav={toggleNav} />}
      navbar={<ShellNav hidden={!nav} />}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
