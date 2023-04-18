import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/interfaces/settings';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public settings: Settings[] = [];

  constructor(private httpclient: HttpClient) { }

  public getSetting(): Observable<Settings[]> {
    return this.httpclient.get<Settings[]>('http://localhost:3000/settings').pipe(
      map((settings: Settings[]) => {
        this.settings = settings;
        return settings;
      })
    )
  }
}
