import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment, Item, Loot } from '../interfaces/items';
import { map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private _items!: Loot;

  public currentItems: Equipment[] = [];

  public get items(): Loot {
    return this._items;
  }

  public set items(value: Loot) {
    this._items = value;
  }

  constructor(private httpClient: HttpClient) {
    this.getItems().subscribe();
    const items = localStorage.getItem('levelUp-items');
    if (items) {
      this.currentItems = JSON.parse(items);
    }
  }

  public getItems() {
    return this.httpClient.get<Loot>('http://localhost:3000/loot').pipe(
      map((data: Loot) => {
        this.items = data;
      })
    );
  }

  public getItem(id: string, tier: string) {
    const allItems = this.items[tier as keyof Loot].items;
    const foundItem = allItems.find((item) => item.id === id);
    return foundItem;
  }

  public setCurrentItems({ id, tier, quantity }: Item) {
    if (this.currentItems.length === 6) return;
    // check if item is already in currentItems
    if (this.currentItems.find((item) => item.id === id)) return;

    const allTiers = Object.keys(this.items);
    const foundTier = allTiers.find((tierName) => tierName === tier);

    if (!foundTier) return;

    const itemsOfCurrentTier = this._items[foundTier as keyof Loot].items;
    const foundItem = itemsOfCurrentTier.find((item) => item.id === id);

    if (!foundItem) return;

    this.currentItems = [...this.currentItems, foundItem];
    localStorage.setItem('levelUp-items', JSON.stringify(this.currentItems));
  }

  public getItemsByTier(tier: string) {
    return this.items[tier as keyof Loot].items;
  }

  public getItemTier(id: string) {
    const allTiers = Object.keys(this.items);
    const foundTier = allTiers.find((tierName) =>
      this.items[tierName as keyof Loot].items.find((item) => item.id === id)
    );
    if (!foundTier) return '';
    return foundTier;
  }

  public rewardTier(adventureLvl: number) {
    switch (true) {
      case adventureLvl <= 6:
        return 'tier1';
      case adventureLvl <= 12:
        return 'tier2';
      default:
        return 'tier3';
    }
  }

  public rewardItem(tier: string) {
    const allItems = this.items[tier as keyof Loot].items;
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
    return { id: randomItem.id, quantity: 1, tier };
  }
}
