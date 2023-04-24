import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipments } from '../interfaces/equipments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  public equipments: Equipments[] = [];

  constructor(private httpClient: HttpClient) {
    this.getEquipments().subscribe()
  }

  public getEquipments(): Observable<Equipments[]> {
    if (!this.equipments.length) {
      return this.httpClient.get<Equipments[]>('http://localhost:3000/equipments').pipe(
        map((data: Equipments[]) => {
          // this.equipments = [..., data];
          this.equipments = data;
          return data;
        })
      );
    } else {
      return new Observable<Equipments[]>((observer) => {
        observer.next(this.equipments);
      });
    }
  }

  public getEquipmentById(id: number): string | void{
    if (!this.equipments) {
      this.getEquipments().subscribe();
    }
    if (this.equipments.find(item => item.id === id)) {
      return this.equipments.find(item => item.id === id)?.name;
    }
  }




}
