import { Group, Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { IconList, IconUserSearch } from "@tabler/icons-react";
import { CreateFriendRequest } from "@/components/friend-requests/create.tsx";
import { PendingRequestsList } from "@/components/friend-requests/pending.tsx";
import { SentRequestsList } from "@/components/friend-requests/sent.tsx";

export const FriendRequests = (props: { userID: string }) => {
  const { userID } = props;
  const [activeTab, setActiveTab] = useState<string | null>("create");
  return (
    <Stack>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="create">
            <Group>
              <IconUserSearch />
              <Text>Make new friend</Text>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="list-sent">
            <Group>
              <IconList />
              <Text>Sent requests</Text>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="list-pending">
            <Group>
              <IconList />
              <Text>Pending requests</Text>
            </Group>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "create" && <CreateFriendRequest userID={userID} />}
      {activeTab === "list-sent" && <SentRequestsList userID={userID} />}
      {activeTab === "list-pending" && <PendingRequestsList userID={userID} />}
    </Stack>
  );
};
