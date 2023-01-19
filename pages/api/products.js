import { productClient } from "../../lib/client";

export default async function handler(req, res) {
  const products = await productClient();
  res.json(products);
}
