import { useState } from "react";
import {
  TextInput,
  Button,
  Container,
  Title,
  Paper,
  Text,
  Group,
  PinInput,
  Loader,
  Alert,
  Flex,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
import { sendOtp, verifyOtp } from "./Login.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  // Mutation for sending OTP
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      setOtpSent(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setToken(data.data.token, mobileNumber);
      navigate("/dashboard/search-document");
    },
  });

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      return;
    }
    sendOtpMutation.mutate(mobileNumber);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      return;
    }
    verifyOtpMutation.mutate({ mobileNumber, otp });
  };

  return (
    <Container size="xs" mt={180}>
      <Title ta="center" mb={30}>
        Document Management System
      </Title>

      <Paper radius="md" p="xl" withBorder>
        <Title order={3} ta="center" mb={20}>
          {otpSent ? "Verify OTP" : "Login with OTP"}
        </Title>

        {!otpSent ? (
          <>
            <TextInput
              label="Mobile Number"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength={10}
              mb="md"
              required
            />

            {sendOtpMutation.isError && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
                mb="md"
              >
                Failed to send OTP. Please check your mobile number and try
                again.
              </Alert>
            )}

            <Button
              fullWidth
              onClick={handleSendOtp}
              disabled={!mobileNumber || mobileNumber.length !== 10}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <Text mb="xs" ta="center" c="gray">
              We've sent an OTP to {mobileNumber}
            </Text>
            <Flex
              gap="md"
              justify="center"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Group mb="md">
                <PinInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  type="number"
                  size="lg"
                />
              </Group>
            </Flex>

            {timer > 0 ? (
              <Text size="sm" c="dimmed" ta="center" mb="md">
                Resend OTP in {timer} seconds
              </Text>
            ) : (
              <Button
                variant="subtle"
                compact
                onClick={handleSendOtp}
                mx="auto"
                display="block"
                mb="md"
              >
                Resend OTP
              </Button>
            )}

            {verifyOtpMutation.isError && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
                mb="md"
              >
                Invalid OTP. Please try again.
              </Alert>
            )}

            <Button
              fullWidth
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length !== 6}
            >
              Verify & Login
            </Button>

            <Button
              variant="subtle"
              fullWidth
              mt="xs"
              onClick={() => setOtpSent(false)}
            >
              Change Mobile Number
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
