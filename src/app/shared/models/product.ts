export class Product {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public description: string,
    public type_id: string,
    public stock: number,
    public cost: number,
    public selling_price: number
  ){}
}
