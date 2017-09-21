import { Injectable } from "@angular/core";

declare var Notyf: any;

@Injectable()
export class Globals {
  notyf = new Notyf({delay: 4000});
  webtitle: string = 'NG4 Inventory';
}
