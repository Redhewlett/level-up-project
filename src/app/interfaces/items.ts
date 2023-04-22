export interface Item {
  id: string;
  quantity: number;
  tier: string;
}

export interface Equipment {
  id: string;
  name: string;
  stat: {
    [key: string]: number;
  };
}

export interface Loot {
  tier1: { items: Equipment[]; retailsFor: number };
  tier2: { items: Equipment[]; retailsFor: number };
  tier3: { items: Equipment[]; retailsFor: number };
}
