import { Product } from './product';

export class OrderDetail {
  constructor(
    public order_id?: string,
    public product_id?: string,
    public amount: number = 0,
    public product: Product = new Product()
  ) { }
}
