import { Company } from './company';

export class User {
  constructor(
    id: string,
    name: string,
    email: string,
    company?: Company
  ) { }
}
