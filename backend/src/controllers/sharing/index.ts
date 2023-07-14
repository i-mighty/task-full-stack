import { Request, Response } from 'express';
import * as dataService from 'services/data/dataService';
import * as sharingService from 'services/sharing/sharingService';
import { parseItemStrict } from 'utils/parseItems';
import { z } from 'zod';

const GetShareTokenRequest = z.object({
  emails: z.array(z.string()),
});

const GetSharedDataRequest = z.object({
  email: z.string(),
});
export const getShareToken = async (req: Request, res: Response) => {
  const { emails } = parseItemStrict(GetShareTokenRequest, req.body);
  const token = sharingService.getShareToken(emails);

  res.status(200).send({ token });
};

export const checkTokenExpiration = async (
  req: Request<{ token: string }>,
  res: Response,
) => {
  sharingService.checkExpiry(req.params.token);
  res.status(200).send({ expired: false });
};

export const getSharedData = async (
  req: Request<{ token: string }>,
  res: Response,
) => {
  const { email } = parseItemStrict(GetSharedDataRequest, req.body);
  sharingService.validateToken(req.params.token, email);
  const data = dataService.getChartData();
  res.status(200).send(data);
};
