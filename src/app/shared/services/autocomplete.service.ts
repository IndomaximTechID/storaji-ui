import { Injectable } from '@angular/core';

@Injectable()
export class AutoCompleteService {
  public data: any[];

  constructor() { }

  filter(source: any[], event: any): void{
    this.data = [];
    for(let i = 0; i < source.length; i++) {
            const item: any = source[i];
            if(item.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.data.push(item);
            }
        }
  }

}
