import { Affix, AppShell, Center, Group } from "@mantine/core";
import { ReactNode } from "react";
import { ColorSchemeSelect } from "@/provider/color-scheme/select";
import { appShellStyles } from "./shell-style.ts";

interface Props {
  children: ReactNode;
}

export const AuthShell = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <AppShell styles={appShellStyles} h="100vh">
      <Affix position={{ top: "12px", right: "12px" }}>
        <Group>
          <ColorSchemeSelect />
        </Group>
      </Affix>
      <Center h="100%">{children}</Center>
    </AppShell>
  );
};
