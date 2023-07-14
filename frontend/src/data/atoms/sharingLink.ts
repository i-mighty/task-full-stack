import { atom } from "jotai";
import { sharingTokenAtom } from "./sharingToken";

export const sharingLinkAtom = atom<string | null>((get) => {
  const token = get(sharingTokenAtom);
  if (token) {
    return `${window.location.host}/share/chart/${token}`;
  } else {
    return null;
  }
});

export const sharingLinkResetAtom = atom(null, (_get, set) => {
  set(sharingTokenAtom, null);
});
