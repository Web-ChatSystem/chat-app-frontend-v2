import { ActionIcon, Grid, Group, Stack } from "@mantine/core";
import { MessageHeader } from "@/components/messages/header.tsx";
import { Loader } from "@/components/loader";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { useGetConversation } from "@/server/hooks/useGetConversation.ts";
import { MessageEditor } from "../editor";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { MessageList } from "@/components/messages/list.tsx";
import { useCreateMessage } from "@/server/hooks/useCreateMessage.ts";

export const Message = (props: { conversationID: string }) => {
  const { conversationID } = props;

  const self = useGetMe();
  const createMessage = useCreateMessage();

  const conversation = useGetConversation({ id: conversationID });
  const form = useForm({
    initialValues: { message: "" },
  });

  const onSubmit = (values: { message: string }) => {
    createMessage.mutate(
      {
        conversationID,
        body: values.message,
        ownerID: self.data.userId,
      },
      {
        onSuccess: () => {
          console.log("form da reset");
          form.reset();
        },
      },
    );
  };

  return (
    <Stack m={0} p={0}>
      {conversation.isError && <div>error</div>}
      {conversation.isLoading && <Loader />}
      {conversation.isSuccess && self.isSuccess && (
        <>
          <Group m={0} p={0} grow>
            <MessageHeader
              conversationDetail={conversation.data}
              userID={self.data.userId}
            />
          </Group>
          <Stack>
            <MessageList
              userID={self.data.userId}
              conversationID={conversationID}
            />
            <form onSubmit={form.onSubmit(onSubmit)}>
              <Grid gutter={0} align="center" columns={24}>
                <Grid.Col span={23}>
                  <MessageEditor form={form} />
                </Grid.Col>
                <Grid.Col span={1}>
                  <Group position="right">
                    <ActionIcon
                      disabled={!form.isTouched()}
                      size="xl"
                      variant="gradient"
                      type="submit"
                      loading={createMessage.isLoading}
                    >
                      <IconSend />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};
