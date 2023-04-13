import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { Adventure } from 'src/app/interfaces/adventure';
import { Setting } from 'src/app/interfaces/setting';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  public adventures: Adventure[] = [];

  constructor(private httpclient: HttpClient) { }

  public getAdventures(): Observable<Adventure[]> {
    return this.httpclient.get<Adventure[]>('http://localhost:3000/adventures').pipe(
      map((adventures: Adventure[]) => {
        this.adventures = adventures;
        return adventures;
      })
    )
  }

  public getAdventureById(id: number): string {
    this.getAdventures().subscribe();
    let found =  this.adventures.find(element => element.id === id);
    return found?.name;
  }
}
