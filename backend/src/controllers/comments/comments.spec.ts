import initialThreadsData from 'stubData/initialComments.json';

import {
  getAllCommentThreads,
  getCommentThread,
  createCommentThread,
  respondToCommentThread,
} from '.';
import { Request, Response } from 'express';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import * as commentService from 'services/comments/commentsService';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { v4 } from 'uuid';
import { Comment } from 'models/Comment';
import * as commentThreadsRepository from 'repositories/commentThreadsRepository';
import { BadRequestError } from 'utils/errors';
import { initialThreads } from 'services/comments/commentsService.spec';

const comment: Comment = {
  userName: 'Josh',
  text: 'Testing',
};
const dataPoint: ChartDataPoint = {
  country: 'ES',
  feature: 'hotdog',
};

jest.mock('repositories/commentThreadsRepository', () => ({
  _esModule: true,
  getAll: jest.fn(() => initialThreads),
  get: jest.fn(() => initialThreads[0]!),
  getByDataPoint: jest.fn(() => initialThreads[0]!),
  createThread: jest.fn(() => ({
    id: v4(),
    chartDataPoint: dataPoint,
    commentsCount: 1,
    comments: [comment],
  })),
  addComment: jest.fn(() => ({
    id: v4(),
    chartDataPoint: dataPoint,
    commentsCount: 2,
    comments: [comment, comment],
  })),
}));
describe('getAllCommentThreads function', () => {
  let mockResponse: MockResponse<Response>;
  let mockRequest = {} as MockRequest<Request>;

  beforeEach(() => {
    mockRequest = createRequest();
    mockResponse = createResponse();
  });

  it('test response status 200', async () => {
    getAllCommentThreads(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toEqual(200);
  });

  it('test response data sent', async () => {
    const result = commentService.getAllCommentThreads();
    getAllCommentThreads(mockRequest, mockResponse);
    expect(mockResponse._getData()).toEqual(result);
  });
});

describe('getCommentThread function', () => {
  let mockResponse: MockResponse<Response>;
  let mockRequest = {} as MockRequest<Request<{ id: string }>>;

  beforeEach(() => {
    const thread = initialThreads[0]!;
    mockRequest = createRequest({ params: { id: thread.id } });
    mockResponse = createResponse();
  });

  it('test response status 200', async () => {
    getCommentThread(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toEqual(200);
  });

  it('test response data sent', async () => {
    getCommentThread(mockRequest, mockResponse);
    expect(mockResponse._getData()).toEqual(initialThreads[0]);
  });

  it('test response error for wrong id sent', async () => {
    (commentThreadsRepository.get as jest.Mock).mockReturnValueOnce(null);
    expect(() => getCommentThread(mockRequest, mockResponse)).toThrowError(
      BadRequestError,
    );
  });
});

describe('createCommentThread function', () => {
  let mockResponse: MockResponse<Response>;
  let mockRequest = {} as MockRequest<Request>;

  beforeEach(() => {
    const thread = initialThreads[0]!;
    mockRequest = createRequest({
      params: { id: thread.id },
      body: { dataPoint, comment },
    });
    mockResponse = createResponse();
  });

  it('test response status 200', async () => {
    createCommentThread(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toEqual(200);
  });

  it('test creates new thread with comment', async () => {
    (commentThreadsRepository.getByDataPoint as jest.Mock).mockReturnValueOnce(
      null,
    );
    createCommentThread(mockRequest, mockResponse);
    expect(mockResponse._getData().commentsCount).toEqual(1);
  });

  it('test adds comment to existing thread', async () => {
    createCommentThread(mockRequest, mockResponse);
    expect(mockResponse._getData().commentsCount).toEqual(2);
  });
});

describe('respondToCommentThread function', () => {
  let mockResponse: MockResponse<Response>;
  let mockRequest = {} as MockRequest<Request<{ id: string }>>;

  beforeEach(() => {
    const thread = initialThreads[0]!;
    mockRequest = createRequest({
      params: { id: thread.id },
      body: { comment },
    });
    mockResponse = createResponse();
  });

  it('test response status 200', async () => {
    respondToCommentThread(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toEqual(200);
  });

  it('test adds comment to existing thread', async () => {
    respondToCommentThread(mockRequest, mockResponse);
    expect(mockResponse._getData().commentsCount).toEqual(2);
  });
});
