export class Customer {
  constructor(
    public id?: string,
    public full_name: string = '',
    public company_name: string = null,
    public email: string = null,
    public address: string = null,
    public postal_code: string = null,
    public city: string = null,
    public country: string = null
  ){}
}
