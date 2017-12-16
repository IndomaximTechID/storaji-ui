import { Customer } from './customer';
import { OrderDetail } from './order-detail';

export class Order {
  constructor(
    public id?: string,
    public customer_id?: string,
    public customer: Customer = new Customer(),
    public order_detail: OrderDetail = new OrderDetail(),
    public created_at?: Date,
    public updated_at?: Date
  ) { }
}
