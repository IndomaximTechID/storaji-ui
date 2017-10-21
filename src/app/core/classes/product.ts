export class Product {
  constructor(
    public id?: string,
    public sku: string = null,
    public name: string = '',
    public description: string = null,
    public type_id?: string,
    public type: any = {id: null, name: ''},
    public stock: number = 0,
    public sold: any = {amount: 0},
    public cost: number = null,
    public selling_price: number = null
  ){}
}
