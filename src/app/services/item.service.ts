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
  }

  public getItems() {
    return this.httpClient.get<Loot>('http://localhost:3000/loot').pipe(
      map((data: Loot) => {
        this.items = data;
      })
    );
  }

  public setCurrentItems({ id, tier }: Item) {
    if (this.currentItems.length === 6) return;

    const allTiers = Object.keys(this.items);
    const foundTier = allTiers.find((tierName) => tierName === tier);

    if (!foundTier) return;

    const itemsOfCurrentTier = this._items[foundTier as keyof Loot].items;
    const foundItem = itemsOfCurrentTier.find((item) => item.id === id);

    if (!foundItem) return;

    this.currentItems = [...this.currentItems, foundItem];
  }
}
