import { ObjectID } from 'mongodb';
import MongoClientProvider from './MongoClientProvider';
import PizzaService from './PizzaService';

class BasketService {
  collectionName = 'baskets';

  getCollection() {
    return MongoClientProvider.db.collection(this.collectionName);
  }

  insertToBasket = async (pizzaId, userId) => {
    const pizza = await PizzaService.findPizzaById(pizzaId);
    const result = await this.getCollection().insertOne({
      userId: new ObjectID(userId),
      pizzaName: pizza.name,
      price: pizza.price,
      description: pizza.description,
      img: pizza.img,
      pizzaId,
    });
    return result.insertedId;
  };

  getPizzasByUserId = async (userId) => {
    const result = await this.getCollection()
      .find({ userId: new ObjectID(userId) })
      .toArray();
    return result;
  };

  removePizzaFromBasket = async (basketId) => {
    this.getCollection().deleteOne({ _id: new ObjectID(basketId) });
    return true;
  };

  removeAllBasketByUserId = async (userId) => {
    this.getCollection().remove({ userId: new ObjectID(userId) });
    return true;
  };
}

export default new BasketService();
