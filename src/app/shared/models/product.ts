export class Product {
  constructor(
    public id: number = 0,
    public sku: string = null,
    public name: string = null,
    public description: string = null,
    public type: any = {id: null, name: ''},
    public stock: number = null,
    public cost: number = null,
    public selling_price: number = null
  ){}
}
