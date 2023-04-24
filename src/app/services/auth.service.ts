import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _user: User | null = null;

  public get user(): User | null {
    return this._user;
  }

  public lvl: number = 1;

  public set user(user: User | null) {
    this._user = user;
    window.localStorage.setItem('user', JSON.stringify(user));
    this.calculateLevel();
  }

  constructor(private settingService: SettingService) {
    const user = window.localStorage.getItem('user');
    if (user) {
      this._user = JSON.parse(user);
    }
  }

  public calculateLevel(): void {
    if (this._user) {
      let xp = this._user.xp;
      let lvl = 1;
      let nextLvl = this.settingService.xpFirstLevel;
      let ratioByLvl = this.settingService.xpRatioByLevel;
      let maxLvl = this.settingService.maxLevl;
      while (xp >= nextLvl && lvl <= maxLvl) {
        xp -= nextLvl;
        nextLvl *= ratioByLvl;
        lvl++;
      }
    }
  }
}
