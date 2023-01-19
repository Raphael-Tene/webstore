import { filterProducts, productClient } from "../../lib/client";

export default async function handler(req, res) {
  const products = await productClient();

  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    const cartProducts = await filterProducts(idsArray);
    res.json(cartProducts);
  } else {
    res.json(products);
  }
}
