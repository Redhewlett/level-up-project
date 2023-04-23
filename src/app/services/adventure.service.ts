import { Injectable } from '@angular/core';
import { Adventures } from '../interfaces/adventures';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { SettingService } from './setting.service';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  public adventures: Adventures[] = [];

  public currentAdventure: Adventures | null = null;

  public currentCompletionTime = '';
  public interval: any;
  public secsLeft = 0;
  public minsLeft = 0;
  public adventureStarted = false;
  public adventureCompleted = false;
  public adventureResult = { xp: 0, gold: 0 };
  public adventureLoot = { id: '', tier: '', quantity: 0 };

  public currentXpRange = { min: 0, max: 0 };
  public currentGoldRange = { min: 0, max: 0 };

  constructor(
    private httpClient: HttpClient,
    public UserService: UserService,
    public SettingService: SettingService,
    public ItemService: ItemService
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
        const time = this.currentAdventure.time - bonus * 1000;
        const minutes = Math.floor(time / 60000);
        const seconds = (time % 60000) / 1000;
        this.currentCompletionTime =
          minutes + ':' + (seconds < 10 ? 0 : '') + seconds;
        this.minsLeft = minutes;
        this.secsLeft = seconds;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public startAdventure() {
    this.adventureStarted = true;
    this.interval = setInterval(() => {
      this.secsLeft -= 1;

      if (this.secsLeft < 0) {
        this.minsLeft -= 1;
        this.secsLeft = 60;
      }
      if (this.minsLeft === 0 && this.secsLeft === 0) {
        this.minsLeft = 0;
        this.adventureStarted = false;
        clearInterval(this.interval);
        this.computeAdventureResult();
      }
    }, 1000);
  }

  private computeAdventureResult() {
    this.adventureCompleted = true;
    const xp =
      Math.floor(
        Math.random() * (this.currentXpRange.max - this.currentXpRange.min + 1)
      ) + this.currentXpRange.min;
    const gold =
      Math.floor(
        Math.random() *
          (this.currentGoldRange.max - this.currentGoldRange.min + 1)
      ) + this.currentGoldRange.min;
    this.adventureResult = { xp, gold };
    this.setUserRewards(xp, gold, this.currentAdventure!.levelRequired);
  }

  private setUserRewards(xp: number, gold: number, levelRequired: number) {
    const rewardTier = this.ItemService.rewardTier(levelRequired);
    const reward = this.ItemService.rewardItem(rewardTier);
    this.adventureLoot = reward;

    if (this.UserService.currentUser) {
      // check if user already has the item
      const itemFound = this.UserService.currentUser.items.find(
        (item) => item.id === reward.id
      );
      // if he has it, add quantity
      if (itemFound) {
        const newValue = {
          ...this.UserService.currentUser,
          xp: this.UserService.currentUser.xp + xp,
          gold: this.UserService.currentUser.gold + gold,
          items: this.UserService.currentUser.items.map((item) => {
            if (item.id === reward.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
        this.UserService.updateUser(newValue);
      } else {
        // if he doesn't have it, add it to his items
        const newValue = {
          ...this.UserService.currentUser,
          xp: this.UserService.currentUser.xp + xp,
          gold: this.UserService.currentUser.gold + gold,
          items: [...this.UserService.currentUser.items, reward],
        };
        this.UserService.updateUser(newValue);
      }
    }
  }

  public resetAdventure() {
    this.adventureCompleted = false;
    this.adventureStarted = false;
    this.adventureResult = { xp: 0, gold: 0 };
    this.currentAdventure = null;
    this.currentCompletionTime = '';
  }
}
