import { Paper, Stack } from "@mantine/core";
import { useListFriends } from "@/server/hooks/useListFriends.ts";
import { Loader } from "@/components/loader";
import { ContactItem, Friend } from "@/components/contacts/item.tsx";

export const ContactList = (props: { userID: string }) => {
  const { userID } = props;
  const list = useListFriends({ userID });

  return (
    <Stack>
      {list.isError && <div>Error</div>}
      {list.isLoading && <Loader />}
      {list.isSuccess && (
        <Paper>
          <Stack spacing={0}>
            {list.data.items.map((friend: Friend) => (
              <ContactItem key={friend.id} friend={friend} />
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};
