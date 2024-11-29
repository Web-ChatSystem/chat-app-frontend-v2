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

  const submit = async (values: SignInForm) => {
    signIn.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        navigate("/");
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
