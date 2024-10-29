import { Avatar, Button, Group, Select, Stack, Text } from "@mantine/core";
import { useMakeFriendRequest } from "@/server/hooks/useMakeFriendRequest.ts";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Loader } from "@/components/loader";
import React, { forwardRef } from "react";
import { useListUserNotFriend } from "@/server/hooks/useListUserNotFriend.ts";

type UserSelectItem = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  email: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, email, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

type FormValues = {
  friendID: string;
};

export const CreateFriendRequest = (props: { userID: string }) => {
  const { userID } = props;
  const users = useListUserNotFriend({ userID });
  const create = useMakeFriendRequest();
  const form = useForm<FormValues>({
    initialValues: {
      friendID: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(create);
    create.mutate(
      { senderID: userID, receiverID: values.friendID },
      {
        onSuccess: () => {
          form.reset();
          notifications.show({
            title: "Friend request sent",
            message: "Your friend request has been sent",
          });
        },
        onError: () => {
          notifications.show({
            title: "Error",
            message: "Something went wrong",
          });
        },
      },
    );
  };
  return (
    <Stack>
      {users.isError && <div>Error</div>}
      {users.isLoading && <Loader />}
      {users.isSuccess && (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <Select
              itemComponent={SelectItem}
              data={users.data.items.map((user: UserSelectItem) => ({
                value: user.id,
                label: user.name,
                image: user.avatar,
                email: user.email,
              }))}
              searchable
              placeholder="Search for a user"
              withinPortal
              {...form.getInputProps("friendID")}
            />
            <Button
              radius="lg"
              variant="filled"
              type="submit"
              loading={create.isLoading}
            >
              Send request
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
};
