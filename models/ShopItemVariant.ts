import { IColor } from "./Color";
import { ISize } from "./Size";

export interface IShopItemVariant {
  id: number;
  shop_item_id: number;
  quantity: number;
  image_url: string;
  color: IColor;
  size: ISize;
}
