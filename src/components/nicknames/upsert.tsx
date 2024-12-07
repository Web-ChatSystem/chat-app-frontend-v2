import { Button, Group } from "@mantine/core";
import { UpsertNicknameForm, UpsertNicknameFormValues } from "./form";
import { useSetNickname } from "@/server/hooks/useSetNickname";

export const UpsertNickname = (props: {
  nickname: string;
  userID: string;
  conversationID: string;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { nickname, userID, conversationID, onCancel, onSuccess } = props;

  const setNickname = useSetNickname();

  const onSubmit = (values: UpsertNicknameFormValues) => {
    setNickname.mutate(
      {
        userID,
        conversationID,
        nickname: values.nickname,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <UpsertNicknameForm
      initialValues={{ nickname: nickname }}
      onSubmit={onSubmit}
    >
      <Group position="right">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="filled" loading={setNickname.isLoading}>
          Save
        </Button>
      </Group>
    </UpsertNicknameForm>
  );
};
