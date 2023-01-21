import { initMongoose } from "../../lib/client";
import { buffer } from "micro";
import Order from "../../models/orders";
// @ts-ignore
const stripe = require("stripe")(process.env.SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const signingSecret = process.env.signingSecret;
  const payload = await buffer(req);
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(payload, sig, signingSecret);

  if (event?.type === "checkout.session.completed") {
    const metadata = event?.data?.object?.metadata;
    const paymentStatus = metadata?.payment_status;
    if (metadata?.order_id && paymentStatus === "paid") {
      {
        await Order?.findById(metadata.orderId, { paid: 1 });
      }
    }
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
