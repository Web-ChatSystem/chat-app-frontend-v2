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
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconUserCircle,
  IconAlphabetLatin,
  IconTrashFilled,
  IconVideo,
} from "@tabler/icons-react";
import { UpsertNickname } from "../nicknames/upsert";
import { useSocket } from "@/provider/socketProvider";
import { useEffect, useRef } from "react";

export const MessageHeader = (props: {
  conversationDetail: ConversationItem;
  userID: string;
}) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("call_declined", () => {
        closePopup();
        alert("Cuộc gọi đã bị từ chối.");
      });
      return () => {
        socket.off("call_declined");
      };
    }
  }, [socket]);

  const { conversationDetail, userID } = props;

  const isIndividual = conversationDetail.type === "individual";

  const friend = conversationDetail.participants.find(
    (participant) => participant.user.id !== userID,
  )?.user;

  const [openedSetNicknameModal, { toggle: toggleSetNicknameModal }] =
    useDisclosure();

  if (!friend) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const callPopupRef = useRef<Window | null>(null);

  const call = () => {
    callPopupRef.current = window.open(
      "/videocalls/" + conversationDetail.id + "?type=1",
      "_blank",
      "width=800,height=600",
    );
  };

  // Hàm đóng cửa sổ pop-up
  const closePopup = () => {
    if (callPopupRef.current && !callPopupRef.current.closed) {
      callPopupRef.current.close();
      callPopupRef.current = null;
      console.log("Cửa sổ pop-up đã được đóng.");
    }
  };

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
              src={
                isIndividual ? friend?.avatar : conversationDetail.image // Avatar nhóm.
              }
              alt={isIndividual ? friend?.username : conversationDetail.name}
            />
            <Stack>
              <Text fw={600}>
                {isIndividual
                  ? friend?.nickname || friend?.username
                  : conversationDetail.name}
              </Text>
            </Stack>
            {isIndividual && (
              <ActionIcon
                variant="light"
                component="button"
                onClick={(e) => {
                  e.preventDefault();
                  call();
                }}
              >
                <IconVideo size={20} />
              </ActionIcon>
            )}
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
