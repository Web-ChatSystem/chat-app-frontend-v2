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
  IconVideo,
} from "@tabler/icons-react";
import { UpsertNickname } from "../nicknames/upsert";
import { useSocket } from "@/provider/socketProvider";
import { useEffect, useRef } from "react";
import { useGetUserDetail } from "@/server/hooks/useGetUserDetail";

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

  const participants = conversationDetail.participants.filter(
    (participant) => participant.user.id !== userID,
  );

  let friendId = friend?.id;
  if (friendId == undefined) friendId = "";
  const friendDetail = useGetUserDetail(friendId);
  console.log("DETAIL", friendId, friendDetail.data);

  const [openedSetNicknameModal, { toggle: toggleSetNicknameModal }] =
    useDisclosure();

  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure();

  if (!friend) return null;
  const callPopupRef = useRef<Window | null>(null);

  const call = () => {
    callPopupRef.current = window.open(
      "/videocalls/" + conversationDetail.id + "?type=1",
      "_blank",
      "width=800,height=600",
    );
  };

  const closePopup = () => {
    if (callPopupRef.current && !callPopupRef.current.closed) {
      callPopupRef.current.close();
      callPopupRef.current = null;
      console.log("Cửa sổ pop-up đã được đóng.");
    }
  };

  const userProfileContent = (
    <Box>
      <Group>
        <Avatar
          size="xl"
          src={friend.avatar}
          alt={friend.username}
          radius="xl"
        />
        <Stack spacing="xs">
          <Title order={3}>{friend.nickname || friend.username}</Title>
          <Text color="dimmed">
            Email: {friendDetail?.data?.email || "Không có thông tin"}
          </Text>
          <Text color="dimmed">
            Name: {friendDetail?.data?.name || "Không có thông tin"}
          </Text>
        </Stack>
      </Group>
    </Box>
  );

  const groupProfileContent = (
    <Box>
      <Stack spacing="xs">
        {participants.map((participant) => (
          <Card key={participant.user.id} shadow="sm" p="md" withBorder>
            <Group position="apart">
              <Group>
                <Avatar
                  size="lg"
                  src={participant.user.avatar}
                  alt={participant.user.username}
                  radius="xl"
                />
                <Stack spacing={0}>
                  <Text fw={600}>
                    {participant.user.nickname || participant.user.username}
                  </Text>
                </Stack>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>
    </Box>
  );

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
              src={isIndividual ? friend?.avatar : conversationDetail.image}
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
              <Menu.Item icon={<IconUserCircle />} onClick={openProfileModal}>
                View Detail
              </Menu.Item>
              <Menu.Item
                icon={<IconAlphabetLatin />}
                onClick={toggleSetNicknameModal}
              >
                Set nickname
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
      <Modal
        opened={openedProfileModal}
        onClose={closeProfileModal}
        title={
          <Title order={2}>
            {isIndividual ? "Thông tin người dùng" : "Thông tin nhóm"}
          </Title>
        }
        size="md"
      >
        {isIndividual ? userProfileContent : groupProfileContent}
      </Modal>
    </Card>
  );
};
