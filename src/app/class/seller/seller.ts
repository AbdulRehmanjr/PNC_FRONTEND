import { Category } from "./category";

export class Seller {
  sellerId: number;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  address: string;
  phone:string;
  category: Category;
  isActive: boolean
  sellerType: string
  maxProducts: number
  currentProducts: number
}
