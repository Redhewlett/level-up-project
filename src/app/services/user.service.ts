import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: Users[] = [];
  public currentUser: string = '';

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
      this.currentUser = userFound.name;
    } else {
      this.currentUser = user;
      this.setUser(user);
    }
  }

  private setUser(user: string): void {
    // use POST to create a new user
    const newUser: Users = {
      id: Math.floor(Date.now() / 1000).toString(),
      name: user.toLocaleLowerCase(),
      xp: 0,
      gold: 0,
    };

    console.log(newUser);
    this.httpClient.post('http://localhost:3000/users', newUser).subscribe();
  }
}
