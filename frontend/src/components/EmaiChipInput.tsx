import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

/**
 * Represents an email added to the list. Highlighted with a close button for removal.
 */
export const Chip = (props: {
  email: string;
  onCloseClick: (email: string) => void;
}) => {
  const { email, onCloseClick } = props;
  return (
    <Tag key={email} borderRadius="full" variant="solid" colorScheme="green">
      <TagLabel>{email}</TagLabel>
      <TagCloseButton
        onClick={() => {
          onCloseClick(email);
        }}
      />
    </Tag>
  );
};

/**
 * A horizontal stack of chips. Like a Pringles can on its side.
 */
export const ChipList = (props: {
  emails: string[];
  onCloseClick: (email: string) => void;
}) => {
  const { emails = [], onCloseClick } = props;
  return (
    <Wrap spacing={1} mb={3}>
      {emails.map((email) => (
        <Chip email={email} key={email} onCloseClick={onCloseClick} />
      ))}
    </Wrap>
  );
};

/**
 * Form field wrapper.
 */
export const ChipEmailInput = ({ ...rest }) => (
  <Box>
    <Input type="email" {...rest} />
  </Box>
);

/**
 * Contains presentation, logic and state for inputting emails and having them saved as chips.
 */
export const EmailChipInput = (props: {
  initialEmails?: string[];
  onEmailsChange?: (emails: string[]) => void;
}) => {
  const { initialEmails = [], onEmailsChange } = props;
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState(initialEmails);

  // Checks whether we've added this email already.
  const emailChipExists = (email: string) => emails.includes(email);

  // Add an email to the list, if it's valid and isn't already there.
  const addEmails = (emailsToAdd: string[]) => {
    const validatedEmails = emailsToAdd
      .map((e: string) => e.trim())
      .filter(
        (email: string) => isValidEmail(email) && !emailChipExists(email)
      );

    const newEmails = [...emails, ...validatedEmails];

    setEmails(newEmails);
    onEmailsChange && onEmailsChange(newEmails);
    setInputValue("");
  };

  // Remove an email from the list.
  const removeEmail = (email: string) => {
    const index = emails.findIndex((e) => e === email);
    if (index !== -1) {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      onEmailsChange && onEmailsChange(newEmails);
      setEmails(newEmails);
    }
  };

  // Save input field contents in state when changed.
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  // Validate and add the email if we press tab, enter or comma.
  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      addEmails([inputValue]);
    }
  };

  // Split and add emails when pasting.
  const handlePaste = (e: {
    preventDefault: () => void;
    clipboardData: { getData: (arg0: string) => any };
  }) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");
    const pastedEmails = pastedData.split(",");
    addEmails(pastedEmails);
  };

  const handleCloseClick = (email: any) => {
    removeEmail(email);
  };

  return (
    <>
      <ChipList emails={emails} onCloseClick={handleCloseClick} />

      <ChipEmailInput
        placeholder="Enter emails (separated by comma ',')"
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
      />
    </>
  );
};
