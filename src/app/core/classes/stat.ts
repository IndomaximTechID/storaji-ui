export class Stat {
  constructor(
    public products?: number,
    public customers?: number,
    public orders?: number,
    public stats?: any
  ) { }
}

export class TopProduct {
  constructor(
    public id?: number,
    public name?: number,
    public stock?: number,
    public orders?: number,
    public sold?: number
  ) { }
}
