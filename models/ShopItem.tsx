import mongoose from "mongoose";

export interface IShopItem {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  quantity: number;
}

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
