import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    products: Object,
    email: String,
    address: String,
    name: String,
    city: String,
    paid: { Number, defaultValue: 0 },
  },
  { timestamps: true }
);

// if an order schema does not exist, create one
const Order = models?.Order || model("Order", OrderSchema);

export default Order;
