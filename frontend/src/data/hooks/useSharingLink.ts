import { useAtom, useSetAtom } from "jotai";
import { sharingLinkAtom, sharingLinkResetAtom } from "../atoms/sharingLink";
import {
  fetchSharingTokenAtom,
  sharingTokenLoadingAtom,
} from "../atoms/sharingToken";

export const useSharingLink = () => {
  const [link] = useAtom(sharingLinkAtom);
  const [loading] = useAtom(sharingTokenLoadingAtom);
  const fetchToken = useSetAtom(fetchSharingTokenAtom);
  const resetToken = useSetAtom(sharingLinkResetAtom);
  return { link, fetchToken, loading, resetToken };
};
