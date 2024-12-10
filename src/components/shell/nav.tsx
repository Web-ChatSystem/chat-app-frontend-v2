import {
  Button,
  Group,
  Modal,
  Navbar,
  NavbarProps,
  PasswordInput,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ShellFooter } from "./footer";
import {
  IconAddressBook,
  IconMessage,
  IconSettings,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";
import { TabStyles } from "@/components/shell/styles.tsx";
import { useEffect, useState } from "react";
import { ContactList } from "@/components/contacts/list.tsx";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { Loader } from "@/components/loader";
import { FriendRequests } from "@/components/friend-requests";
import { ConversationList } from "@/components/conversations/list.tsx";
import { useListFriends } from "@/server/hooks/useListFriends";
import { Friend } from "../contacts/item";
import { useCreateConversation } from "@/server/hooks/useCreateConversation";
import { useGetUserDetail } from "@/server/hooks/useGetUserDetail";
import { useUpdateUser } from "@/server/hooks/useUpdateUser";

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const [activeTab, setActiveTab] = useState<string | null>("inbox");
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<Friend[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const createConversation = useCreateConversation(); // Hook tạo nhóm
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    username: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const self = useGetMe();
  const realname = useGetUserDetail(self?.data?.userId);
  const updateUser = useUpdateUser(self?.data?.userId || "");
  //console.log("realname", realname.data);
  const handleSubmit = () => {
    const { name, avatar } = formData;
    // Thực hiện API call để cập nhật thông tin người dùng
    console.log("Submitting form data:", formData);
    updateUser.mutate(
      { name, avatar, dob: realname?.data?.dob, gender: realname?.data?.gender },
      {
        onSuccess: () => {
          console.log("Cập nhật thành công!");
          setOpenSettingsModal(false);
        },
        onError: (error) => {
          console.error("Lỗi cập nhật:", error);
        },
      }
    );
    // Sau khi cập nhật thành công, đóng modal
    setOpenSettingsModal(false);
  };

  useEffect(() => {
    if (self.isSuccess && !formData.name) {
      setFormData({
        name: realname?.data?.name || "",
        avatar: self.data.avatar || "",
        email: self.data.email || "",
        username: self.data.username || "",
      });
    }
  }, [formData.name, realname?.data?.name, self]);
  console.log(self?.data?.userId);
  const friendQuery = useListFriends({ userID: self?.data?.userId });
  const friendsList = friendQuery.data?.items;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  // Chọn người dùng vào nhóm
  const handleSelectUser = (user: Friend) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Xóa người dùng khỏi danh sách đã chọn
  const handleRemoveUser = (user: Friend) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  // Tạo nhóm
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert("Vui lòng nhập tên nhóm.");
      return;
    }
    if (selectedUsers.length === 0) {
      alert("Vui lòng chọn ít nhất một thành viên.");
      return;
    }

    const participantIDs = selectedUsers.map((user) => user.id);
    participantIDs.push(self.data.userId);

    createConversation.mutate({
      name: groupName,
      type: "group",
      creatorID: self.data.userId,
      participantIDs,
    });

    console.log("Tạo nhóm:", groupName, "Với các thành viên:", selectedUsers);
    setOpenGroupModal(false);
    setSelectedUsers([]);
    setGroupName("");
  };

  return (
    <Navbar width={{ sm: 400 }} hidden={hidden} hiddenBreakpoint="sm" p="lg">
      <Navbar.Section>
        <Group position="apart">
          <Button
            onClick={() => setOpenSettingsModal(true)}
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
            <IconSettings />
          </Button>
          <Title order={3}>Chat</Title>
          <Group>
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
              onClick={() => setOpenGroupModal(true)} // Mở modal tạo nhóm
            >
              <IconUsersGroup />
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
              onClick={() => setOpenRequestModal(true)}
            >
              <IconUserPlus />
            </Button>
          </Group>
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Stack py="xs">
          <TextInput placeholder="Search" />
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            unstyled
            styles={TabStyles}
          >
            <Tabs.List>
              <Tabs.Tab value="inbox">
                <Group>
                  <IconMessage />
                  <Text>Inbox</Text>
                </Group>
              </Tabs.Tab>
              <Tabs.Tab value="contacts">
                <Group>
                  <IconAddressBook />
                  <Text>Contacts</Text>
                </Group>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow>
        {self.isError && <div>Error</div>}
        {self.isLoading && <Loader />}
        {self.isSuccess && (
          <Stack>
            {activeTab === "inbox" && (
              <div
                style={{
                  maxHeight: "700px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                <ConversationList userID={self.data.userId} />
              </div>
            )}
            {activeTab === "contacts" && (
              <ContactList userID={self.data.userId} />
            )}
          </Stack>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
      <Modal
        opened={openGroupModal}
        onClose={() => setOpenGroupModal(false)}
        title="Tạo nhóm chat"
        size="lg"
      >
        <Tabs defaultValue="select-users">
          <Tabs.List>
            <Tabs.Tab value="select-users">Chọn người dùng</Tabs.Tab>
            <Tabs.Tab value="selected-users">Đã chọn</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="select-users" pt="md">
            <TextInput
              placeholder="Tìm kiếm người dùng"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Stack mt="md">
              {friendsList?.map((friend: Friend) => {
                const isSelected = selectedUsers.some(
                  (u) => u.id === friend.id,
                );
                return (
                  <Group key={friend.id} position="apart">
                    <Text>{friend.name}</Text>
                    <Button
                      onClick={() =>
                        isSelected
                          ? handleRemoveUser(friend)
                          : handleSelectUser(friend)
                      }
                    >
                      {isSelected ? "Đã chọn" : "Chọn"}
                    </Button>
                  </Group>
                );
              })}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="selected-users" pt="md">
            <TextInput
              placeholder="Tên nhóm"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <Text>{`Số lượng thành viên đã chọn: ${selectedUsers.length}`}</Text>
            <Stack mt="md">
              {selectedUsers.map((user) => (
                <Group key={user.id} position="apart">
                  <Text>{user.name}</Text>
                  <Button color="red" onClick={() => handleRemoveUser(user)}>
                    Gỡ
                  </Button>
                </Group>
              ))}
            </Stack>
            <Button mt="lg" fullWidth onClick={handleCreateGroup}>
              Tạo nhóm
            </Button>
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Modal
        opened={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
        title="Find new friends"
        size="lg"
      >
        {self.isSuccess && <FriendRequests userID={self.data.userId} />}
      </Modal>

      <Modal
        opened={openSettingsModal}
        onClose={() => setOpenSettingsModal(false)}
        title="Cài đặt người dùng"
        size="lg"
      >
        {self.isLoading && <Loader />}
        {self.isSuccess && (
          <Stack>
            <TextInput
              label="Tên"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <TextInput
              label="Avatar (URL)"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
            />
            <TextInput
              label="Email"
              value={formData.email}
              readOnly
            />
            <TextInput
              label="Username"
              value={formData.username}
              readOnly
            />
            <Group position="right">
              <Button color="blue" onClick={handleSubmit}>
                Cập nhật
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Navbar>
  );
};