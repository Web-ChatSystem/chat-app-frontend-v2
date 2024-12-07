import { Message } from "@/components/messages/list.tsx";
import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";
import { forwardRef, Ref } from "react";
import dayjs from "dayjs";
const MessageItem = (
  props: {
    message: Message;
    isUser: boolean;
  },
  ref: Ref<HTMLDivElement>,
) => {
  const { message, isUser } = props;
  const formatMessageTime = (createdAt: string) => {
    const messageDate = dayjs(createdAt);
    const today = dayjs();

    if (messageDate.isSame(today, "day")) {
      return `Hôm nay - ${messageDate.format("HH:mm")}`;
    } else {
      return messageDate.format("DD/MM/YYYY - HH:mm");
    }
  };

  const formattedTime = formatMessageTime(message.createdAt);

  if (ref) console.log(message);
  return (
    <Stack p="xs" align={isUser ? "flex-end" : "flex-start"} ref={ref}>
      {!isUser && (
        <Text size="sm" color="dimmed" ml={75} mb={-10}>
          {message.owner.username}
        </Text>
      )}
      <Group>
        {!isUser && (
          <Avatar
            src={message.owner.avatar}
            alt={message.owner.username}
            radius="xl"
            size="lg"
          />
        )}
        <Paper
          radius="xl"
          p="xs"
          sx={(theme) => ({
            width: "fit-content",
            maxWidth: "400px",
            backgroundColor: isUser
              ? theme.colors.blue[5]
              : theme.colors.gray[0],
            color: isUser ? "#FFF" : theme.colors.gray[8],
          })}
          withBorder
        >
          <div
            style={{
              margin: 0,
              padding: 0,
            }}
            dangerouslySetInnerHTML={{ __html: message.body }}
          />
          <Text
            size="xs"
            color={isUser ? "white" : "dimmed"}
            mt={4}
            align={"left"}
            style={{ width: "100%" }}
          >
            {formattedTime}
          </Text>
        </Paper>
      </Group>
    </Stack>
  );
};

export const MessageItemRef = forwardRef(MessageItem);
