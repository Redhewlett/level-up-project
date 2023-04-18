import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public settings: Settings = {
    xpFirstLevel: 0,
    xpRatioByLevel: 0,
    maxLevel: 0,
  };

  constructor(private httpClient: HttpClient) {}

  public getSettings(): Observable<Settings> {
    return this.httpClient.get<Settings>('http://localhost:3000/settings').pipe(
      map((data: Settings) => {
        this.settings = { ...data };
        return data;
      })
    );
  }

  public computeLevel(xp: number): number {
    let level = 1;
    let xpNeeded = this.settings.xpFirstLevel;
    while (xp >= xpNeeded && level < this.settings.maxLevel) {
      xpNeeded *= this.settings.xpRatioByLevel;
      level++;
    }
    console.log('level', level);
    return level;
  }

  public computeXpNeeded(xp: number): number {
    let level = 1;
    let xpNeeded = this.settings.xpFirstLevel;
    while (xp >= xpNeeded && level < this.settings.maxLevel) {
      xpNeeded *= this.settings.xpRatioByLevel;
      level++;
    }
    return Math.floor(xpNeeded - xp);
  }

  public computeXpPourcentage(xp: number): number {
    if (xp === 0) return 0;
    // calculate xp needed for previous level
    let xpNeeded = this.settings.xpFirstLevel;
    let level = 1;
    while (xp >= xpNeeded && level < this.settings.maxLevel) {
      xpNeeded *= this.settings.xpRatioByLevel;
      level++;
    }
    const prevLvlXp = xpNeeded / this.settings.xpRatioByLevel;
    const xpNextLvl = xpNeeded - prevLvlXp;
    const xpLeft = xp - prevLvlXp;

    return (xpLeft * 100) / xpNextLvl;
  }
}
