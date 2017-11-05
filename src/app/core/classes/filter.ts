export class Product {
    constructor(
      public sku: string = null,
      public name: string = null,
      public type: any = null,
      public date_range: DateRange = new DateRange()
    ){}
}

class DateRange {
    constructor(
        public from: string = null,
        public to: string = null
    ){}
}