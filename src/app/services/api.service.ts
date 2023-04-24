import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getList<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>('http://localhost:3000/' + endpoint);
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>('http://localhost:3000/' + endpoint);
  }

  public post<T>(endpoint: string, data: T): Observable<T> {
    return this.httpClient.post<T>('http://localhost:3000/' + endpoint, data);
  }

  public put<T>(endpoint: string, data: T): Observable<T> {
    return this.httpClient.put<T>('http://localhost:3000/' + endpoint, data);
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.httpClient.delete<T>('http://localhost:3000/' + endpoint);
  }
}
