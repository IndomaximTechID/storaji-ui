export class Product {
    constructor(
      public sku: string = null,
      public name: string = null,
      public type: any = null,
      public date_range: DateRange = new DateRange()
    ){}
}

export class Customer {
    constructor(
        public name: string = null,
        public company: string = null,
        public city: string = null,
        public country: string = null,
        public date_range: DateRange = new DateRange()
    ){}
}

class DateRange {
    constructor(
        public from: string = null,
        public to: string = null
    ){}
}