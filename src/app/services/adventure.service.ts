import { Injectable } from '@angular/core';
import { Adventures } from '../interfaces/adventures';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  public adventures: Adventures[] = [];

  public currentAdventure: Adventures | null = null;

  public currentCompletionTime = 0;
  public interval: any;
  public timeLeft = 0;

  public currentXpRange = { min: 0, max: 0 };
  public currentGoldRange = { min: 0, max: 0 };

  constructor(
    private httpClient: HttpClient,
    public UserService: UserService,
    public SettingService: SettingService
  ) {}

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
    // reset if it's the same
    if (
      adventureFound &&
      this.currentAdventure &&
      adventureFound.name === this.currentAdventure.name
    ) {
      this.currentAdventure = null;
      return;
    }
    if (adventureFound) {
      this.currentAdventure = adventureFound;
      this.computeAverageXp(adventureFound.xp);
      this.computeAverageGold(adventureFound.gold);
      this.computeCompletionTime();
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

  private computeCompletionTime() {
    try {
      if (this.UserService.currentUser && this.currentAdventure) {
        const userLvl = this.SettingService.computeLevel(
          this.UserService.currentUser.xp
        );
        const bonus = userLvl - this.currentAdventure.levelRequired;
        this.currentCompletionTime = parseFloat(
          ((this.currentAdventure.time - bonus * 1000) / 1000 / 60).toFixed(2)
        );
        this.timeLeft = this.currentAdventure.time - bonus * 1000;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public startAdventure() {
    //use completion time to launch a timer
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1000;
        console.log(this.timeLeft);
      }
    }, 1000);
  }
}
