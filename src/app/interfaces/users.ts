import { Item } from './items';
export interface Users {
  id: string;
  name: string;
  xp: number;
  gold: number;
  items: Item[];
}

export interface UserStats {
  attaque: number;
  defense: number;
  critRate: number;
  critDamage: number;
  hP: number;
}
