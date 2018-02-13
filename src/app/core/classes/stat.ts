export class Stat {
  products: number;
  customers: number;
  orders: number;
  stats: StatDetail = new StatDetail();
  graph: Graph = new Graph();
}

export class StatDetail {
  cost: number;
  profit: number;
  revenue: number;
}

export class Graph {
  current: number[] = [];
  last: number[] = [];
}

export class TopProduct {
  id: number;
  name: number;
  stock: number;
  orders: number;
  sold: number;
}
