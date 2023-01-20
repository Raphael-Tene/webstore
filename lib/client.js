// *Using Moongoose client

import mongoose from "mongoose";

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  // @ts-ignore
  return await mongoose.connect(process.env.MongoURI);
}

// *Using mongoClient
// import { MongoClient } from "mongodb";

// export async function productClient() {
//   try {
//     // @ts-ignore
//     const client = await MongoClient.connect(process.env.MongoURI);
//     // @ts-ignore
//     const db = client.db("webstore");
//     const collection = db.collection("products");
//     const products = await collection.find({}).toArray();
//     return products;
//   } catch (error) {
//     if (error) {
//       return;
//     }
//   }
// }

// export async function filterProducts(id) {
//   // @ts-ignore
//   const client = await MongoClient.connect(process.env.MongoURI);
//   // @ts-ignore
//   const db = client.db("webstore");
//   const collection = db.collection("products");
//   const products = await collection.find({ _id: { $in: id } });
//   return products;
// }
