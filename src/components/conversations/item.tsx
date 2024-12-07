import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconAlphabetLatin,
  IconDots,
  IconTrashFilled,
  IconUserCircle,
} from "@tabler/icons-react";

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

  const friend = conversation.participants.find(
    (participant) => participant.user.id !== conversation.creatorID,
  )?.user;

  if (!friend) return null;

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

          <Menu shadow="md" withinPortal>
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
              <Menu.Item icon={<IconAlphabetLatin />}>Set nickname</Menu.Item>
              <Menu.Item icon={<IconTrashFilled color="red" />}>
                Delete conversation
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
    </Card>
  );
};
