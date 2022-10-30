/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-server-express';
import BasketService from '../../services/BasketService';
import PizzaService from '../../services/PizzaService';
import isAuthorizedUser from '../isAuthorizedUser';

export const typeDefs = gql`
  type Pizza {
    _id: ID!
    name: String
    img: String!
    description: String!
    price: Float!
  }

  type Basket {
    _id: ID!
    pizzaName: String!
    price: Float!
    pizzaId: ID!
    description: String!
    img: String!
  }

  input PizzaCreateInput {
    name: String!
    description: String!
    img: String!
    price: Float!
  }

  input PizzaUpdateInput {
    name: String
    description: String
    img: String
    price: Float
  }

  extend type Query {
    pizzas: [Pizza]!
    pizza(_id: ID!): Pizza!
    pizzasInBasket: [Basket]
  }

  extend type Mutation {
    createPizza(input: PizzaCreateInput): Pizza!
    updatePizza(pizzaId: ID!, input: PizzaUpdateInput): Pizza!
    removePizza(pizzaId: ID!): Boolean!
    addToBasket(pizzaId: ID!): ID!
    removePizzaFromBasket(basketId: ID!): Boolean!
    removeBasketByUserId: Boolean!
  }
`;

export const resolvers = {
  Query: {
    pizzas: async (root, params, context) => {
      isAuthorizedUser(context);
      return PizzaService.findAllPizzas();
    },
    pizza: async (root, { _id }, context) => {
      isAuthorizedUser(context);
      return PizzaService.findPizzaById(_id);
    },
    pizzasInBasket: async (root, params, context) => {
      isAuthorizedUser(context);
      return BasketService.getPizzasByUserId(context.userId);
    },
  },

  Mutation: {
    createPizza: async (root, { input }, context) => {
      isAuthorizedUser(context);
      return PizzaService.insertPizza(input, context.userId);
    },
    updatePizza: async (root, { pizzaId, input }, context) => {
      isAuthorizedUser(context);
      return PizzaService.updatePizza(pizzaId, input);
    },
    removePizza: async (root, { pizzaId }, context) => {
      isAuthorizedUser(context);
      return PizzaService.removePizza(pizzaId);
    },
    addToBasket: async (root, { pizzaId }, context) => {
      isAuthorizedUser(context);
      return BasketService.insertToBasket(pizzaId, context.userId);
    },
    removePizzaFromBasket: async (root, { basketId }, context) => {
      isAuthorizedUser(context);
      return BasketService.removePizzaFromBasket(basketId);
    },
    removeBasketByUserId: async (root, params, context) => {
      isAuthorizedUser(context);
      return BasketService.removeAllBasketByUserId(context.userId);
    },
  },
};
