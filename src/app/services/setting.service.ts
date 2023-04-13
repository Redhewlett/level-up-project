import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public settings: Settings = {
    xpFirstLevel: 0,
    xpRatioByLevel: 0,
    maxLevel: 0,
  };

  constructor(private httpClient: HttpClient) {}

  public getSettings(): Observable<Settings> {
    if (!this.settings) {
      return this.httpClient
        .get<Settings>('http://localhost:3000/settings')
        .pipe(
          map((data: Settings) => {
            this.settings = data;
            return data;
          })
        );
    } else {
      return new Observable<Settings>((observer) => {
        observer.next(this.settings);
      });
    }
  }
}
