import mongoose from "mongoose";

const ShopItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageURL: String,
  quantity: Number,
})

const ShopItem =
  (mongoose.models && mongoose.models.ShopItem) ||
  mongoose.model("ShopItem", ShopItemSchema);

export default ShopItem;
