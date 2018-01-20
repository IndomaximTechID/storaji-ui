import { Company } from './company';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public old_password?: string,
    public password?: string,
    public company?: Company
  ) { }
}
