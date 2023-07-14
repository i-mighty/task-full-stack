import {
  addChartToken,
  getTokenObj,
  tokenMap,
} from 'repositories/shareTokenRepository';
import { BadRequestError, UnauthorizedError } from 'utils/errors';
import _ from 'lodash';
import { isBefore } from 'date-fns';

export const validateToken = (token: string, email: string) => {
  const tokenObj = _.get(tokenMap, token);
  if (!tokenObj.emails.includes(email)) {
    throw new UnauthorizedError('Access not granted for this email');
  }
  return;
};

export const checkExpiry = (token: string) => {
  const tokenObj = getTokenObj(token);

  if (!isBefore(new Date(), tokenObj.expiry)) {
    throw new BadRequestError('Token is expired');
  }

  return token;
};

export const getShareToken = (emails: string[]) => {
  return addChartToken(emails);
};
