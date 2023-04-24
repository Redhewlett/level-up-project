export interface Equipments {
  id: number;
  name: string;
}


export interface Item {
  id: number,
  quantity: number,
  wearing: boolean
}

export interface Items extends Array<Item>{}
