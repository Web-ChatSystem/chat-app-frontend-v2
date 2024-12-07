import { Modal, Button, Group, Text, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoneCall, IconPhoneOff } from "@tabler/icons-react";

interface IncomingCallPopupProps {
  callerName: string;
  callerAvatar?: string;
  onAnswer: () => void;
  onDecline: () => void;
}

export function IncomingVideoCall({
  callerName,
  callerAvatar,
  onAnswer,
  onDecline,
}: IncomingCallPopupProps) {
  const [opened, { close }] = useDisclosure(true);

  const handleAnswer = () => {
    onAnswer();
    close();
  };

  const handleDecline = () => {
    onDecline();
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Incoming Call" centered>
      <Group position="center" mb="md">
        <Avatar src={callerAvatar} size="xl" radius="xl" />
        <Text size="lg" weight={500}>
          {callerName} is calling...
        </Text>
      </Group>
      <Group position="center" grow>
        <Button
          leftIcon={<IconPhoneCall size="1.2rem" />}
          color="teal"
          onClick={handleAnswer}
        >
          Answer
        </Button>
        <Button
          leftIcon={<IconPhoneOff size="1.2rem" />}
          color="red"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </Group>
    </Modal>
  );
}
