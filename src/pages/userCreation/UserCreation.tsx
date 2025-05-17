import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { IconUser, IconLock, IconUserPlus } from "@tabler/icons-react";

export const UserCreation = () => {
  const isLargeScreen = useMediaQuery("(min-width: 750px)");

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setUserName("");
      setPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      withBorder
      style={{
        width: isLargeScreen ? "70%" : "90%",
        margin: isLargeScreen ? "" : "0 auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          {success && (
            <Text color="green" align="center" mb="md">
              User created successfully!
            </Text>
          )}

          {error && (
            <Text color="red" align="center" mb="md">
              {error}
            </Text>
          )}

          <TextInput
            required
            label="Username"
            placeholder="Enter username"
            icon={<IconUser size={16} />}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Enter password"
            icon={<IconLock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={<IconLock size={16} />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Group position="right" mt="md">
            <Button
              type="submit"
              loading={loading}
            >
              Create User
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};
