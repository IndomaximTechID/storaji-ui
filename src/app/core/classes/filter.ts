class DateRange {
  from: string = null;
  to: string = null;
}

export class BaseFilter {
  date_range: DateRange = new DateRange();
}

export class ProductFilter extends BaseFilter {
  sku: string = null;
  name: string = null;
  type: any = null;
}

export class CustomerFilter extends BaseFilter {
  name: string = null;
  company: string = null;
  city: string = null;
  country: string = null;
}

export class OrderFilter extends BaseFilter {
  id: string = null;
  product: string = null;
  customer: string = null;
}
