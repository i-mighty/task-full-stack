import { checkExpiry, getShareToken, validateToken } from './sharingService';
import { NotFoundError } from 'utils/errors';

describe('SharingService', () => {
  let email: string;
  beforeAll(() => {
    email = 'test@gmail.com';
  });
  it('should generate and return a token for', () => {
    const token = getShareToken([email]);
    expect(token).toBeTruthy();
  });
  it('should successfully validate token', function () {
    const token = getShareToken([email]);
    expect(() => validateToken(token, email)).not.toThrowError();
  });

  it('should check expiry for token', () => {
    const token = getShareToken([email]);
    expect(() => checkExpiry(token)).not.toThrowError();
  });

  it('should throw 404 error if token is invalid', function () {
    expect(() => checkExpiry('bad_token')).toThrowError();
  });
});
