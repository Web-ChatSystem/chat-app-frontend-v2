import { Avatar, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconDots } from "@tabler/icons-react";

export type Friend = {
  avatar: string;
  name: string;
  id: string;
  email: string;
};

export const ContactItem = (props: { friend: Friend }) => {
  const { friend } = props;
  return (
    <Card p={0} component={Link} to={`/messages/${friend.id}`}>
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
              src={friend.avatar}
              alt={friend.name}
            />
            <Stack>
              <Text fw={600}>{friend.name}</Text>
              <Text>{friend.email}</Text>
            </Stack>
          </Group>
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
        </Group>
      </Box>
    </Card>
  );
};
