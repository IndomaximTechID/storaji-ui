import { CompanyType } from './company_type';

export class Company {
  id?: string;
  name: string = '';
  type_id?: string;
  type?: CompanyType;
}
