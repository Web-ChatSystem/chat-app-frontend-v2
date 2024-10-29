import { ConversationItem } from "@/components/conversations/item.tsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Modal,
  Stack,
  Text,
  Menu,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconUserCircle,
  IconAlphabetLatin,
  IconTrashFilled,
} from "@tabler/icons-react";
import { UpsertNickname } from "../nicknames/upsert";

export const MessageHeader = (props: {
  conversationDetail: ConversationItem;
  userID: string;
}) => {
  const { conversationDetail, userID } = props;

  const friend = conversationDetail.participants.find(
    (participant) => participant.user.id !== userID,
  )?.user;

  const [openedSetNicknameModal, { toggle: toggleSetNicknameModal }] =
    useDisclosure();

  if (!friend) return null;

  return (
    <Card p={0}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
        })}
      >
        <Group position="apart">
          <Group>
            <Avatar
              size="lg"
              radius="xl"
              src={friend.avatar}
              alt={friend.username}
            />
            <Stack>
              <Text fw={600}>
                {friend.nickname ? friend.nickname : friend.username}
              </Text>
            </Stack>
          </Group>
          <Menu shadow="md" withinPortal position="bottom-end">
            <Menu.Target>
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
                <IconDots />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
              <Menu.Item
                icon={<IconAlphabetLatin />}
                onClick={toggleSetNicknameModal}
              >
                Set nickname
              </Menu.Item>
              <Menu.Item icon={<IconTrashFilled color="red" />}>
                Delete conversation
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
      <Modal
        opened={openedSetNicknameModal}
        onClose={toggleSetNicknameModal}
        title={
          <Title order={2}>
            Set nickname for{" "}
            {friend.nickname ? friend.nickname : friend.username}
          </Title>
        }
        size="auto"
      >
        <UpsertNickname
          nickname={friend.nickname ? friend.nickname : ""}
          userID={friend.id}
          conversationID={conversationDetail.id}
          onCancel={toggleSetNicknameModal}
          onSuccess={toggleSetNicknameModal}
        />
      </Modal>
    </Card>
  );
};
