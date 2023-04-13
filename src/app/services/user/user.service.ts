import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public users: User[] = [];

  constructor(private httpclient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>('http://localhost:3000/users').pipe(
      map((users: User[]) => {
        this.users = users;
        return users;
      })
    )
  }


}
