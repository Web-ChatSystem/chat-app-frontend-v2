import {
  Button,
  Group,
  Modal,
  Navbar,
  NavbarProps,
  Title,
} from "@mantine/core";

import {
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
import { useState } from "react";


interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);

  return (
    <Navbar width={{ sm: 400 }} hidden={hidden} hiddenBreakpoint="sm" p="lg">
      <Navbar.Section>
        <Group position="apart">
          <Button
            p={0}
            styles={{
              root: {
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            variant="subtle"
          >
            <IconSettings />
          </Button>
          <Title order={3}>Chat</Title>
          <Button
            p={0}
            styles={{
              root: {
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            variant="subtle"
            onClick={() => setOpenRequestModal(true)}
          >
            <IconUserPlus />
          </Button>
        </Group>
      </Navbar.Section>

      <Modal
        opened={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
        title="Find new friends"
        size="lg"
      >
       
      </Modal>
    </Navbar>
  );
};
