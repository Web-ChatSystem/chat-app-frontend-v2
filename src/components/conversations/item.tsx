import { Avatar, Box, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconUserCircle, IconUsers } from "@tabler/icons-react";
import { useGetMe } from "@/server/hooks/useGetMe";

export type ConversationItem = {
  id: string;
  name: string;
  type: string;
  creatorID: string;
  image: string;
  participants: {
    user: {
      id: string;
      username: string;
      avatar: string;
      nickname: string;
    };
  }[];
};

export const ConversationItem = (props: { conversation: ConversationItem }) => {
  const { conversation } = props;
  const self = useGetMe();

  const friend = conversation.participants.find(
    (participant) => participant.user.id !== self.data.userId,
  )?.user;

  if (!friend) return null;
  console.log("FRIEND", friend, conversation.creatorID);
  const isIndividual = conversation.type === "individual";

  return (
    <Card p={0} component={Link} to={`/messages/${conversation.id}`}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
            margin: 0,
          },
        })}
      >
        <Group position="apart">
          <Group>
            <Avatar
              size="lg"
              radius="xl"
              src={isIndividual ? friend?.avatar : conversation.image}
              alt={isIndividual ? friend?.username : conversation.name}
            />
            <Stack>
              <Text fw={600}>
                {isIndividual
                  ? friend?.nickname || friend?.username
                  : conversation.name}
              </Text>
            </Stack>
          </Group>
          {isIndividual ? (
            <IconUserCircle size={17} />
          ) : (
            <IconUsers size={17} />
          )}
        </Group>
      </Box>
    </Card>
  );
};
