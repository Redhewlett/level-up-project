import { Items } from './equipments';
export interface Users {
  id: string;
  name: string;
  xp: number;
  gold: number;
  items?: Items;
}
