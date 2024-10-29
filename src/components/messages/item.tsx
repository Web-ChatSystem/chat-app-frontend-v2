import { Message } from "@/components/messages/list.tsx";
import { Avatar, Group, Paper, Stack } from "@mantine/core";
import { forwardRef, Ref } from "react";

const MessageItem = (
  props: {
    message: Message;
    isUser: boolean;
  },
  ref: Ref<HTMLDivElement>,
) => {
  const { message, isUser } = props;
  if (ref) console.log(message);
  return (
    <Stack p="xs" align={isUser ? "flex-end" : "flex-start"} ref={ref}>
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
        </Paper>
      </Group>
    </Stack>
  );
};

export const MessageItemRef = forwardRef(MessageItem);
