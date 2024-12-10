import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AuthShell } from "@/components/shell/auth-shell.tsx";
import { CardStyles } from "./styles.tsx";
import { useSignIn } from "@/server/hooks/useSignIn.ts";
import { useState } from "react";

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = (): JSX.Element => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const form = useForm<SignInForm>({
    initialValues: { email: "", password: "" },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Invalid password"),
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Trạng thái lưu thông báo lỗi

  const submit = async (values: SignInForm) => {
    setErrorMessage(null); // Reset lỗi trước khi gửi request
    signIn.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        navigate("/");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        // Kiểm tra lỗi trả về từ server
        if (error.response?.status === 403) {
          setErrorMessage("Email or password is not correct");
        } else if (error.response?.status === 400) {
          setErrorMessage(
            "Password must be longer than or equal to 8 characters",
          );
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      },
    });
  };

  return (
    <Card radius="xl" withBorder padding="lg" shadow="lg" sx={CardStyles}>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <Title>Sign in to your account</Title>
          <TextInput
            label="Email"
            placeholder="test@example.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          {errorMessage && (
            <Text color="red" size="sm">
              {errorMessage}
            </Text>
          )}
          <Button
            radius="xl"
            type="submit"
            variant="filled"
            loading={signIn.isLoading}
          >
            Sign In
          </Button>
          <Text color="dimmed">
            Don't have an account?{" "}
            <Anchor
              variant="link"
              color="blue"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Card>
  );
};

SignIn.Layout = AuthShell;
