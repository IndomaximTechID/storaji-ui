import { Customer } from './customer';
import { OrderDetail } from './order-detail';

export class Order {
  id?: string;
  customer_id?: string;
  customer: Customer = new Customer();
  order_detail: OrderDetail = new OrderDetail();
  created_at?: Date;
  updated_at?: Date;
}
