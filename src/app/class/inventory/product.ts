import { Category } from "../seller/category";
import { Seller } from "../seller/seller";

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
