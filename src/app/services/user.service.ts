import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SettingService } from './setting.service';
import { ItemService } from './item.service';
import { Item } from '../interfaces/items';
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
  }

  public currentUser: Users | null = null;

  constructor(
    private httpClient: HttpClient,
    public SettingService: SettingService,
    public ItemService: ItemService
  ) {
    this.SettingService.getSettings().subscribe();
    const user = localStorage.getItem('levelUp-user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  public setCurrentUser(userToSet: string) {
    const userFound = this.users.find((user) => user.name === userToSet);
    if (userFound) {
      localStorage.setItem('levelUp-user', JSON.stringify(userFound));
      this.currentUser = userFound;

      userFound.items.forEach((item: Item) => {
        this.ItemService.setCurrentItems(item);
      });

      return;
    } else {
      this.createUser(userToSet);
    }
  }

  private createUser(user: string): void {
    const newUser: Users = {
      id: Math.floor(Date.now() / 1000).toString(),
      name: user.toLocaleLowerCase(),
      xp: 0,
      gold: 0,
      items: [],
    };
    localStorage.setItem('levelUp-user', JSON.stringify(newUser));

    this.currentUser = newUser;
    this.httpClient.post('http://localhost:3000/users', newUser).subscribe();
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
    localStorage.removeItem('levelUp-items');
    location.reload();
    location.replace('/');
  }
}
