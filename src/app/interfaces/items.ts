export interface Item {
  id: string;
  quantity: number;
}

export interface Equipment {
  id: string;
  name: string;
  stat: {
    // the key should be a map of possible values (attaque defense etc)
    [key: string]: number;
  };
  value: number;
}
