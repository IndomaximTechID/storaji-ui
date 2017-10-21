import { CompanyType } from "./company_type";

export class Company {
  constructor(
    public id?: string,
    public name: string = '',
    public type_id?: string,
    public type?: CompanyType
  ){}
}
