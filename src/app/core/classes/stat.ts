export class Stat {
  constructor(
    public products?: number,
    public customers?: number,
    public orders?: number,
    public stats?: any,
    public graph: Graph = new Graph()
  ) { }
}

export class Graph {
  constructor(
    public current: number[] = [],
    public last: number[] = []
  ) {}
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
