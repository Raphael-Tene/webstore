import { initMongoose } from "../../lib/client";
import Product from "../../models/storeProducts";

// using mongoose client
export default async function handler(req, res) {
  await initMongoose();
  const { ids } = req.query;

  if (ids) {
    console.log(ids.split(","));
    res.json(await Product.find({ _id: { $in: ids.split(",") } }));
  } else {
    res.json(await Product.find({}).exec());
  }
}
