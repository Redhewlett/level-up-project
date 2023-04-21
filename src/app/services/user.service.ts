import { Injectable, Input } from '@angular/core';
import { Users } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SettingService } from './setting.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: Users[] = [];

  public get users(): Users[] {
    return this._users;
  }

  public set users(value: Users[]) {
    this._users = value;
    localStorage.setItem('users', JSON.stringify(value));
  }

  public currentUser: Users | null = null;
  public lvl: number = 1;
  public xpLeftToNextLvl: number = 0;

  constructor(
    private httpClient: HttpClient,
    public SettingService: SettingService
  ) {
    const storedUser = localStorage.getItem('levelUp-user');
    const users = localStorage.getItem('users');
    if (users) {
      this._users = JSON.parse(users);
    }
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.lvl = this.SettingService.computeLevel(JSON.parse(storedUser).xp);
      this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(
        JSON.parse(storedUser).xp
      );
    }
  }

  public setCurrentUser(userToFind: string) {
    const userFound = this.users.find((user) => user.name === userToFind);
    if (userToFind !== localStorage.getItem('levelUp-user')) {
      localStorage.setItem('levelUp-user', JSON.stringify(userFound));
    }
    if (userFound) {
      this.currentUser = userFound;
      this.lvl = this.SettingService.computeLevel(userFound.xp);
      this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(userFound.xp);
      return;
    } else {
      this.createUser(userToFind);
    }
  }

  private createUser(user: string): void {
    const newUser: Users = {
      id: Math.floor(Date.now() / 1000).toString(),
      name: user.toLocaleLowerCase(),
      xp: 0,
      gold: 0,
    };
    localStorage.setItem('levelUp-user', JSON.stringify(newUser));

    this.currentUser = newUser;
    this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(newUser.xp);

    this.httpClient.post('http://localhost:3000/users', newUser);
  }

  public getUsers(): Observable<Users[]> {
    if (!this.users.length) {
      return this.httpClient.get<Users[]>('http://localhost:3000/users').pipe(
        map((data: Users[]) => {
          this.users = data;
          return data;
        })
      );
    } else {
      return new Observable<Users[]>((observer) => {
        observer.next(this.users);
      });
    }
  }

  public clearUserFromStorage() {
    localStorage.removeItem('levelUp-user');
    location.reload();
    location.replace('/');
  }
}
