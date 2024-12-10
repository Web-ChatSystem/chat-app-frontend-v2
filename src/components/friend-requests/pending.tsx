import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Loader } from "@/components/loader";
import { useListPendingRequest } from "@/server/hooks/useListPendingRequest.ts";
import moment from "moment";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useAcceptFriendRequest } from "@/server/hooks/useAcceptFriendRequest.ts";
import { useDeclineFriendRequest } from "@/server/hooks/useDeclineFriendRequest.ts";
import { notifications } from "@mantine/notifications";

type Request = {
  createdAt: string;
  id: string;
  sender: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
};
export const PendingRequestsList = (props: { userID: string }) => {
  const { userID } = props;

  const list = useListPendingRequest({ userID });
  const accept = useAcceptFriendRequest();
  const decline = useDeclineFriendRequest();

  const handleAccept = (requestID: string) => {
    accept.mutate(requestID, {
      onSuccess: () => {
        notifications.show({
          title: "Friend request accepted",
          message: "You have a new friend",
        });
      },
    });
  };

  const handleDecline = (requestID: string) => {
    decline.mutate(requestID, {
      onSuccess: () => {
        notifications.show({
          title: "Friend request declined",
          message: "You declined a friend request",
        });
      },
    });
  };

  if (accept.isLoading) return <Loader />;
  if (decline.isLoading) return <Loader />;

  return (
    <Stack>
      {list.isError && <div>Error</div>}
      {list.isLoading && <Loader />}
      {list.isSuccess && (
        <Paper p={0} withBorder sx={{ overflow: "auto" }}>
          <Table>
            <Box
              component="thead"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              })}
            >
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>User</th>
                <th style={{ whiteSpace: "nowrap" }}>Status</th>
                <th style={{ whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </Box>
            <tbody>
              {list.data.items.length === 0 && (
                <tr>
                  <td colSpan={2}>
                    <Text align="center">No requests sent</Text>
                  </td>
                </tr>
              )}
              {list.data.items.map((request: Request) => (
                <tr key={request.id}>
                  <td>
                    <Group noWrap>
                      <Avatar src={request.sender.avatar} />
                      <div>
                        <Text size="sm">{request.sender.username}</Text>
                        <Text size="xs" opacity={0.65}>
                          {request.sender.email}
                        </Text>
                      </div>
                    </Group>
                  </td>
                  <td>
                    <Badge color="orange">
                      pending: {moment(request.createdAt).fromNow()}
                    </Badge>
                  </td>
                  <td>
                    <Group spacing="xs" noWrap>
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
                        onClick={() => {
                          handleAccept(request.id);
                        }}
                      >
                        <IconCheck color="green" />
                      </Button>
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
                        onClick={() => {
                          handleDecline(request.id);
                        }}
                      >
                        <IconX color="red" />
                      </Button>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </Stack>
  );
};
