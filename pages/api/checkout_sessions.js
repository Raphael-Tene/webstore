import { initMongoose } from "../../lib/client";
import Order from "../../models/orders";
import Product from "../../models/storeProducts";
// @ts-ignore
const stripe = require("stripe")(process.env.SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  if (req.method === "POST") {
    const { email, name, city, address } = req.body;
    const productsIds = req.body.products?.split(",");
    const uniqIds = [...new Set(productsIds)];

    const products = await Product?.find({ _id: { $in: uniqIds } }).exec();

    let line_items = [];
    for (let productId of uniqIds) {
      const quantity = productsIds.filter((id) => productId)?.length;
      const product = products.find((p) => p._id.toString() === productId);
      line_items.push({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: product.description,
            // images: [product.picture],
          },
        },
      });
    }

    //   saving order to our database

    const order = await Order.create({
      products: line_items,
      name: name,
      email: email,
      city: city,
      address: address,

      paid: 0,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      metadata: { orderId: order?._id.toString() },
    });

    res.redirect(303, session.url);
  }
}
