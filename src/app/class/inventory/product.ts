import { Category } from "../seller/category";
import { Seller } from "../seller/seller";

export class Product {
  productId: number;
  code: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: Category;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  seller:Seller
}
