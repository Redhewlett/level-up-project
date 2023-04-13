import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from 'src/app/interfaces/setting';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public settings: Setting[] = [];

  constructor(private httpclient: HttpClient) { }

  public getSetting(): Observable<Setting[]> {
    return this.httpclient.get<Setting[]>('http://localhost:3000/settings').pipe(
      map((settings: Setting[]) => {
        this.settings = settings;
        return settings;
      })
    )
  }
}
