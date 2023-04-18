import { Injectable } from '@angular/core';
import { Adventures } from '../interfaces/adventures';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  public adventures: Adventures[] = [];

  public currentAdventure: Adventures | null = null;

  public currentXpRange: { min: number; max: number } = { min: 0, max: 0 };
  public currentGoldRange: { min: number; max: number } = { min: 0, max: 0 };

  constructor(private httpClient: HttpClient) {}

  public getAdventures(): Observable<Adventures[]> {
    if (!this.adventures.length) {
      return this.httpClient
        .get<Adventures[]>('http://localhost:3000/adventures')
        .pipe(
          map((data: Adventures[]) => {
            this.adventures = data;
            return data;
          })
        );
    } else {
      return new Observable<Adventures[]>((observer) => {
        observer.next(this.adventures);
      });
    }
  }

  private getAdventureByName(name: string) {
    if (this.adventures.find((adventure) => adventure.name === name)) {
      return this.adventures.find((adventure) => adventure.name === name);
    }
    return null;
  }

  public setCurrentAdventure(adventure: string) {
    const adventureFound = this.getAdventureByName(adventure);
    if (adventureFound) {
      this.currentAdventure = adventureFound;
      this.computeAverageXp(adventureFound.xp);
      this.computeAverageGold(adventureFound.gold);
    }
  }
  // you can win xp between adventure.xp / 2 and adventure.xp
  private computeAverageXp(xp: number) {
    this.currentXpRange = { min: Math.floor(xp / 2), max: xp };
  }
  // you can win xp between adventure.gold / 3 and adventure.gold
  private computeAverageGold(gold: number) {
    this.currentGoldRange = { min: Math.floor(gold / 3), max: gold };
  }
}
