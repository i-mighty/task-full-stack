import { v4 } from 'uuid';
import { add } from 'date-fns';
import _ from 'lodash';
import { NotFoundError } from 'utils/errors';
const shareToken = v4();

export const tokenMap: {
  [key: string]: {
    emails: string[];
    expiry: Date;
  };
} = {};

export const getToken = () => shareToken;

export const getTokenObj = (token: string) => {
  const tokenObj = _.get(tokenMap, token);
  if (tokenObj) {
    return tokenObj;
  } else {
    throw new NotFoundError('Token was not found');
  }
};

export const addChartToken = (emails: string[]) => {
  const token = v4();
  tokenMap[token] = {
    emails,
    expiry: add(new Date(), { minutes: 10 }),
  };

  return token;
};
