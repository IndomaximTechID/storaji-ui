import { Company } from './company';

export class User {
  id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  company?: Company;
}
