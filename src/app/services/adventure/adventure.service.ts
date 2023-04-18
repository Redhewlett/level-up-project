import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { Adventures } from 'src/app/interfaces/adventures';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  public adventures: Adventures[] = [];

  constructor(private httpclient: HttpClient) { }

  public getAdventures(): Observable<Adventures[]> {
    return this.httpclient.get<Adventures[]>('http://localhost:3000/adventures').pipe(
      map((adventures: Adventures[]) => {
        this.adventures = adventures;
        return adventures;
      })
    )
  }

  public getAdventureById(id: number): string | undefined {
    if (!this.adventures) {
      this.getAdventures().subscribe();
    }
    let found = this.adventures.find(element => element.id === id);
    return found?.name;
  }
}
