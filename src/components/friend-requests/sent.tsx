import {
  Avatar,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useListSentRequest } from "@/server/hooks/useListSentRequest.ts";
import { Loader } from "@/components/loader";

type Request = {
  id: string;
  receiver: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
};
export const SentRequestsList = (props: { userID: string }) => {
  const { userID } = props;

  const list = useListSentRequest({ userID });

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
                      <Avatar src={request.receiver.avatar} />
                      <div>
                        <Text size="sm">{request.receiver.username}</Text>
                        <Text size="xs" opacity={0.65}>
                          {request.receiver.email}
                        </Text>
                      </div>
                    </Group>
                  </td>
                  <td>
                    <Badge color="orange">pending</Badge>
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
