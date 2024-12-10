import { AuthShell } from "@/components/shell/auth-shell.tsx";
import { useNavigate } from "react-router-dom";
import { isEmail, useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { CardStyles } from "@/components/auth/styles.tsx";
import { RegisterRequest, useRegister } from "@/server/hooks/useRegister.ts";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

type FormValues = RegisterRequest & {
  confirmPassword: string;
};

export const SignUp = (): JSX.Element => {
  const signUp = useRegister();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
      avatar: undefined,
      dob: new Date(),
      gender: "male",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: (password) =>
        password.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (confirmPassword, formValues) =>
        confirmPassword !== formValues.password ? (
          <Text color="red">Passwords do not match</Text>
        ) : null,
    },
  });

  const submit = async (values: FormValues) => {
    signUp.mutate(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        username: values.username,
        avatar: values.avatar,
        dob: values.dob,
        gender: values.gender,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Account created",
            message: "You can now sign in",
          });
          setTimeout(() => {
            navigate("/sign-in");
          }, 3000);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (error.response?.data?.message === "email already exists") {
            form.setFieldError("email", "Email already exists");
          } else {
            notifications.show({
              title: "Registration failed",
              message: "Something went wrong. Please try again.",
              color: "red",
            });
          }
        },
      },
    );
  };

  return (
    <Card radius="xl" withBorder padding="lg" shadow="lg" sx={CardStyles}>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <Title>Sign up with us!</Title>
          <TextInput
            label="Email"
            placeholder="test@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <TextInput label="Name" required {...form.getInputProps("name")} />
          <TextInput
            label="Username"
            required
            {...form.getInputProps("username")}
          />
          <DateInput
            label="Date of birth"
            required
            maxDate={new Date()}
            {...form.getInputProps("dob")}
          />
          <Select
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            label={"Gender"}
            required
            {...form.getInputProps("gender")}
          />
          <Text color="dimmed">
            By signing up, you agree to the Terms and Conditions and Privacy
            Policy.
          </Text>
          <Button
            loading={signUp.isLoading}
            radius="xl"
            type="submit"
            variant="filled"
          >
            Sign Up
          </Button>
          <Text color="dimmed">
            Already have an account?{" "}
            <Anchor
              variant="link"
              color="blue"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Card>
  );
};

SignUp.Layout = AuthShell;
