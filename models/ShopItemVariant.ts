import { IColor } from "./Color";
import { IShopItem } from "./ShopItem";
import { ISize } from "./Size";

export interface IShopItemVariant {
  id: number;
  shop_item_id: number;
  shop_items: IShopItem;
  quantity: number;
  image_url: string;
  color: IColor;
  size: ISize;
}
