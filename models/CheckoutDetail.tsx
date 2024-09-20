import mongoose from "mongoose";

export interface ICheckoutDetail {
    fullname: string;
    email: string;
    phone: string;
    streetAddress: string;
    suburb: string;
    city: string;
    postalCode: string;
}

const ItemSchema = new mongoose.Schema({
    id: String,
    total: Number,
    quantity: Number,
})

const CheckoutDetailSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    streetAddress: String,
    suburb: String,
    city: String,
    postalCode: String,
    items: [ItemSchema],
    total: Number,
})

const CheckoutDetail =
  (mongoose.models && mongoose.models.CheckoutDetail) ||
  mongoose.model("CheckoutDetail", CheckoutDetailSchema);

export default CheckoutDetail;