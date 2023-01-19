import { MongoClient } from "mongodb";

export async function productClient() {
  try {
    // @ts-ignore
    const client = await MongoClient.connect(process.env.MongoURI);
    // @ts-ignore
    const db = client.db("webstore");
    const collection = db.collection("products");
    const products = await collection.find({}).toArray();
    return products;
  } catch (error) {
    if (error) {
      return;
    }
  }
}
