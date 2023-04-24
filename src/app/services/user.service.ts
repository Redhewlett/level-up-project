import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SettingService } from './setting.service';
import { EquipmentService } from './equipment.service';
import { Equipments, Item, Items } from '../interfaces/equipments';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: Users[] = [];

  public currentUser: Users | null = {
    id: '65Fhdeo72_',
    name: 'biben',
    xp: 2812,
    gold: 2000,
    items: [
      { id: 1, quantity: 2, wearing: false },
      { id: 3, quantity: 1, wearing: true },
      { id: 6, quantity: 3, wearing: true }
    ]
  };

  public lvl: number = 1;
  public xpLeftToNextLvl: number = 0;
  public countItems: number = 0;

  constructor(
    private httpClient: HttpClient,
    public SettingService: SettingService,
    public EquipmentService: EquipmentService,
  ) {
    // this.EquipmentService.getEquipments().subscribe();
    // this.getMyItems();
    this.quantity();
  }

  public quantity(): void {
    this.currentUser?.items?.filter(item => item.wearing === true)
    .map(item => this.countItems = this.countItems + item.quantity)
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

  private getUserByName(name: string) {
    if (this.users.find((user) => user.name === name)) {
      return this.users.find((user) => user.name === name);
    }
    return null;
  }

  public setCurrentUser(user: string): void {
    const userFound = this.getUserByName(user);
    if (userFound) {
      this.currentUser = userFound;
      this.lvl = this.SettingService.computeLevel(userFound.xp);
      this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(userFound.xp);
    } else {
      this.setUser(user);
    }
  }

  private setUser(user: string): void {
    const newUser: Users = {
      id: Math.floor(Date.now() / 1000).toString(),
      name: user.toLocaleLowerCase(),
      xp: 0,
      gold: 0,
    };

    this.currentUser = newUser;
    this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(newUser.xp);

    this.httpClient.post('http://localhost:3000/users', newUser).subscribe();
  }

  // get the settings from db to calc the current lvl, xp % and xp % left before nxt lvl
}
