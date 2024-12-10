import { Stack, Text } from "@mantine/core";
import { ConversationItem } from "@/components/conversations/item.tsx";
import { Loader } from "@/components/loader";
import { useListConversation } from "@/server/hooks/useListConversation.ts";

export const ConversationList = (props: { userID: string }) => {
  const { userID } = props;
  const conversations = useListConversation({ userID });
  console.log("CAC DOAN HOI THOAI", conversations?.data?.items);
  return (
    <Stack>
      {conversations.isError && <div>error</div>}
      {conversations.isLoading && <Loader />}
      {conversations.isSuccess && conversations.data.totalItems > 0 ? (
        conversations.data.items.map((conversation: ConversationItem) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))
      ) : (
        <Text pt="xl" align="center">
          No conversations yet
        </Text>
      )}
    </Stack>
  );
};
