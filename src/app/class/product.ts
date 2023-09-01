import { Category } from "./category";
import { Seller } from "./seller";

export class Product {
  productId: string;
  code: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  category: Category;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  seller:Seller
}
