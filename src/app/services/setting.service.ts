import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Setting } from '../interfaces/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public xpFirstLevel: number = 0;
  public xpRatioByLevel: number = 0;
  public maxLevl: number = 0;

  constructor(private httpClient: HttpClient) {
    this.getSettings().subscribe();
  }
  // do this request only once, because it's a static data
  public getSettings(): Observable<Setting> {
    if (this.xpFirstLevel && this.xpRatioByLevel && this.maxLevl) {
      return new Observable<Setting>((observer) => {
        observer.next({
          xpFirstLevel: this.xpFirstLevel,
          xpRatioByLevel: this.xpRatioByLevel,
          maxLevl: this.maxLevl,
        });
      });
    } else {
      return this.httpClient
        .get<Setting>('http://localhost:3000/settings')
        .pipe(
          map((setting: Setting) => {
            this.xpFirstLevel = setting.xpFirstLevel;
            this.xpRatioByLevel = setting.xpRatioByLevel;
            this.maxLevl = setting.maxLevl;
            return setting;
          })
        );
    }
  }
}
