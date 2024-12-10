import {
  Box,
  Center,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun, Icon as TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

interface LabelProps {
  Icon: TablerIcon;
  children: ReactNode;
}

const Label = (props: LabelProps): JSX.Element => {
  const { Icon, children } = props;
  return (
    <Center>
      <Icon size={16} />
      <Box ml={10}>{children}</Box>
    </Center>
  );
};

const Light = (): JSX.Element => {
  return <Label Icon={IconSun}>Light</Label>;
};

const Dark = (): JSX.Element => {
  return <Label Icon={IconMoon}>Dark</Label>;
};

export const ColorSchemeSelect = (): JSX.Element => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      data={[
        { value: "light", label: <Light /> },
        { value: "dark", label: <Dark /> },
      ]}
      value={colorScheme}
      onChange={(value: "light" | "dark") => toggleColorScheme(value)}
      fullWidth
    />
  );
};
