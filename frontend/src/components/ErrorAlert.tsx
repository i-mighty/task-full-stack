import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
}
export const ErrorAlert = ({ title, description }: Props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
