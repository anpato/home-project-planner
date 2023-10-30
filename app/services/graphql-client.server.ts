import {
  GraphQLClient,
  type ResponseMiddleware,
  type RequestMiddleware
} from 'graphql-request';

const responseMiddleware: ResponseMiddleware = async (res) => {
  return res;
};

const requestMiddleware: RequestMiddleware = async (request) => {
  return request;
};

export const gqlClient = new GraphQLClient(
  'https://spacex-production.up.railway.app/',
  { requestMiddleware, responseMiddleware }
);
