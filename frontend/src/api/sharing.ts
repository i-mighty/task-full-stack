import { API_URL } from "../constants/api";
import { ChartData } from "../data/models/ChartData";
import { handleErrors } from "./handleErrors";
export interface GetTokenPayload {
  emails: string[];
}
export const fetchSharingToken = async (
  payload: GetTokenPayload
): Promise<{ token: string }> => {
  const response = await fetch(`${API_URL}/share`, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });

  try {
  } catch (error) {}
  await handleErrors(response);

  return await response.json();
};

export const verifyTokenExpiry = async (
  token: string
): Promise<{ expired: boolean }> => {
  const response = await fetch(`${API_URL}/check_expiry/${token}`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchSharedChartData = async (
  token: string,
  email: string
): Promise<ChartData> => {
  const response = await fetch(`${API_URL}/chart/shared/${token}`, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email }),
  });
  await handleErrors(response);

  return await response.json();
};
