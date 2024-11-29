import { Burger, Header, MediaQuery } from "@mantine/core";

interface Props {
  nav: boolean;
  toggleNav: () => void;
}

export const ShellHeader = (props: Props): JSX.Element => {
  const { nav, toggleNav } = props;

  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Header height={{ base: 70, sm: 0 }} p="md">
        <Burger
          opened={nav}
          title={nav ? "Close navigation" : "Open navigation"}
          onClick={toggleNav}
        />
      </Header>
    </MediaQuery>
  );
};
