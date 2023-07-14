import { useAtom, useSetAtom } from "jotai";
import { sharedTokenExpiry, tokenExpiryAtom } from "../atoms/sharingToken";
import { useEffect } from "react";

export const useLinkExpired = (token: string) => {
  const [expired] = useAtom(sharedTokenExpiry);
  const queryExpiry = useSetAtom(tokenExpiryAtom);

  useEffect(() => {
    queryExpiry(token);
  }, [queryExpiry, token]);
  return { expired };
};
