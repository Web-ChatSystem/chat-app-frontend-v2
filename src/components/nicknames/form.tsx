import { Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import React from "react";

export type UpsertNicknameFormValues = {
  nickname: string;
};

export const UpsertNicknameForm = (props: {
  children: React.ReactNode;
  onSubmit: (values: { nickname: string }) => void;
  initialValues: UpsertNicknameFormValues;
}) => {
  const { children, onSubmit, initialValues } = props;

  const form = useForm<UpsertNicknameFormValues>({
    initialValues: { nickname: initialValues.nickname },
    validate: {
      nickname: isNotEmpty("Required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          required
          label={"Nickname"}
          {...form.getInputProps("nickname")}
        />
        {children}
      </Stack>
    </form>
  );
};
