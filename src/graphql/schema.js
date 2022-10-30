import { gql } from 'apollo-server-express';
import { typeDefs as authTypeDefs, resolvers as authResolvers } from './schemas/auth';
import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './schemas/profile';
import { typeDefs as pizzaDefs, resolvers as pizzaResolvers } from './schemas/pizza';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;

export const typeDefs = [rootTypeDefs, authTypeDefs, profileTypeDefs, pizzaDefs];
export const resolvers = [authResolvers, profileResolvers, pizzaResolvers];
