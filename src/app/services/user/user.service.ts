import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { map } from 'rxjs';
import { UserI } from '../../../../../first_project/src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: Users[] = [];

  constructor(private httpclient: HttpClient) { }

  public getUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>('http://localhost:3000/users').pipe(
      map((users: Users[]) => {
        this.users = users;
        return users;
      })
    )
  }
}
