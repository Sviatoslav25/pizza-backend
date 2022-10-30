import { ObjectID } from 'mongodb';
import MongoClientProvider from './MongoClientProvider';

class PizzaService {
  collectionName = 'pizzas';

  getCollection() {
    return MongoClientProvider.db.collection(this.collectionName);
  }

  findPizzaById = async (_id) => {
    return this.getCollection().findOne({ _id: new ObjectID(_id) });
  };

  findAllPizzas = async () => {
    return this.getCollection().find({}).sort({ createdAt: -1 }).toArray();
  };

  insertPizza = async (pizza, userId) => {
    const result = await this.getCollection().insertOne({
      ...pizza,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectID(userId),
    });
    return { ...result, _id: result.insertedId };
  };

  updatePizza = async (pizzaId, pizza) => {
    this.getCollection().updateOne({ _id: new ObjectID(pizzaId) }, { $set: pizza });
    return this.findPizzaById(pizzaId);
  };

  removePizza = async (_id) => {
    this.getCollection().removeOne({ _id: new ObjectID(_id) });
    return true;
  };
}

export default new PizzaService();
