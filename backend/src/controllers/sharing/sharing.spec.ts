import {
  MockResponse,
  MockRequest,
  createRequest,
  createResponse,
} from 'node-mocks-http';
import { Request, Response } from 'express';

import * as sharingService from 'services/sharing/sharingService';
import { getSharedData } from '.';
import chartData from 'stubData/chartData.json';

describe('getSharedData function', () => {
  let mockResponse: MockResponse<Response>;
  let mockRequest = {} as MockRequest<Request<{ token: string }>>;
  beforeEach(() => {
    mockResponse = createResponse();
  });

  it('test response status 200', async () => {
    getSharedData(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toEqual(200);
  });

  it('test response returns chart data', async () => {
    mockRequest = createRequest({
      params: { token: sharingService.getShareToken(['ja@email.com']) },
      body: { email: 'ja@email.com' },
    });
    getSharedData(mockRequest, mockResponse);
    expect(mockResponse._getData()).toEqual(chartData);
  });
});
