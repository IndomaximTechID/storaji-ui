import { Product } from './product';

export class OrderDetail {
  order_id?: string;
  product_id?: string;
  amount: number = 0;
  product: Product = new Product();
}
