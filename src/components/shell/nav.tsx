import {
  Button,
  Group,
  Modal,
  Navbar,
  NavbarProps,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ShellFooter } from "./footer";
import {
  IconAddressBook,
  IconMessage,
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
import { TabStyles } from "@/components/shell/styles.tsx";
import { useState } from "react";
import { ContactList } from "@/components/contacts/list.tsx";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { Loader } from "@/components/loader";
import { FriendRequests } from "@/components/friend-requests";
import { ConversationList } from "@/components/conversations/list.tsx";

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const [activeTab, setActiveTab] = useState<string | null>("inbox");
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const self = useGetMe();

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
      <Navbar.Section>
        <Stack py="xs">
          <TextInput placeholder="Search" />
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            unstyled
            styles={TabStyles}
          >
            <Tabs.List>
              <Tabs.Tab value="inbox">
                <Group>
                  <IconMessage />
                  <Text>Inbox</Text>
                </Group>
              </Tabs.Tab>
              <Tabs.Tab value="contacts">
                <Group>
                  <IconAddressBook />
                  <Text>Contacts</Text>
                </Group>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow>
        {self.isError && <div>Error</div>}
        {self.isLoading && <Loader />}
        {self.isSuccess && (
          <Stack>
            {activeTab === "inbox" && (
              <ConversationList userID={self.data.userId} />
            )}
            {activeTab === "contacts" && (
              <ContactList userID={self.data.userId} />
            )}
          </Stack>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
      <Modal
        opened={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
        title="Find new friends"
        size="lg"
      >
        {self.isSuccess && <FriendRequests userID={self.data.userId} />}
      </Modal>
    </Navbar>
  );
};
