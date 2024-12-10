import { Paper } from "@mantine/core";
import { useListMessage } from "@/server/hooks/useListMessage.ts";
import { Loader } from "@/components/loader";
import { MessageItemRef } from "@/components/messages/item.tsx";
import { useEffect, useRef } from "react";

export type Message = {
  id: string;
  body: string;
  conversationID: string;
  attachment: string;
  owner: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};
export const MessageList = (props: {
  userID: string | undefined;
  conversationID: string;
}) => {
  const { userID, conversationID } = props;

  const messages = useListMessage({ conversationID });
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <Paper
      withBorder
      mih={"calc(100vh - 260px)"}
      mah={"calc(100vh - 260px)"}
      style={{
        overflowY: "auto",
      }}
    >
      {messages.isError && <div>error</div>}
      {messages.isLoading && <Loader />}
      {messages.isSuccess &&
        userID &&
        messages.data.items.map((message: Message) => (
          <MessageItemRef
            ref={
              message.id ===
              messages.data.items[messages.data.totalItems - 1].id
                ? lastMessageRef
                : null
            }
            key={message.id}
            message={message}
            isUser={message.owner.id === userID}
          />
        ))}
    </Paper>
  );
};
