import { atom } from "jotai";
import {
  GetTokenPayload,
  fetchSharingToken,
  verifyTokenExpiry,
} from "../../api/sharing";

export const sharingTokenAtom = atom<string | null>(null);
export const sharingTokenLoadingAtom = atom<boolean>(false);

export const sharedTokenExpiry = atom<boolean | null>(null);
export const tokenExpiryAtom = atom(null, async (get, set, token: string) => {
  try {
    const { expired } = await verifyTokenExpiry(token);
    set(sharedTokenExpiry, expired);
  } catch (error) {
    if ((error as Error).message === "Token is expired") {
      set(sharedTokenExpiry, true);
    }
  }
});

export const fetchSharingTokenAtom = atom(
  null,
  async (get, set, emails: GetTokenPayload) => {
    set(sharingTokenLoadingAtom, true);
    const { token } = await fetchSharingToken(emails);
    set(sharingTokenAtom, token);
    set(sharingTokenLoadingAtom, false);
  }
);
