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

const CheckoutDetailSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    streetAddress: String,
    suburb: String,
    city: String,
    postalCode: String,
})

const CheckoutDetail =
  (mongoose.models && mongoose.models.CheckoutDetail) ||
  mongoose.model("CheckoutDetail", CheckoutDetailSchema);

export default CheckoutDetail;