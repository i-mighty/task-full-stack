import { Button, Code, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useSharingLink } from "../../data/hooks/useSharingLink";
import { SideMenu } from "./SideMenu";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { EmailChipInput } from "../EmaiChipInput";

interface ShareMenuProps {
  show: boolean;
}

export const ShareMenu = ({ show }: ShareMenuProps) => {
  const { link, fetchToken, loading, resetToken } = useSharingLink();
  const [copied, setCopied] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const copyLink = () => {
    if (!link) return;

    try {
      copyToClipboard(link);
    } catch (error) {
      console.error(error);
    }
    setCopied(true);
  };

  const emailsSubmit = () => {
    fetchToken({ emails });
  };

  useEffect(() => {
    setCopied(false);
  }, [show]);
  return (
    <SideMenu show={show}>
      <Heading size="md" pb={3}>
        {!link ? "Share with" : "Your share link"}
      </Heading>
      {!link ? (
        <Stack gap={5}>
          <Text>
            Provide the email address of users to share the chart with
          </Text>
          <EmailChipInput onEmailsChange={setEmails} />
          <Button
            isLoading={loading}
            disabled={!emails.length}
            colorScheme="teal"
            type="submit"
            onClick={emailsSubmit}
          >
            Continue
          </Button>
        </Stack>
      ) : (
        <Stack gap={5}>
          <Code
            p="8px"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            cursor="pointer"
            onClick={copyLink}
          >
            <Link maxWidth="100%">{link}</Link>
            {copied ? <CheckIcon color="green" /> : <CopyIcon />}
          </Code>
          <Button onClick={resetToken} mt={4} colorScheme="teal" type="submit">
            Reset token
          </Button>
        </Stack>
      )}
    </SideMenu>
  );
};
