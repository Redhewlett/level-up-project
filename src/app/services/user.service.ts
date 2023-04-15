import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: Users[] = [];

  public currentUser: Users | null = null

  constructor(private httpClient: HttpClient) {}

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

    this.httpClient.post('http://localhost:3000/users', newUser).subscribe();
  }

  // get the settings from db to calc the current lvl, xp % and xp % left before nxt lvl
}
