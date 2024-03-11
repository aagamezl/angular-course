import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class ApiService<T> {

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(endpoint);
  }

  getById(endpoint: string, id: unknown): Observable<T> {
    return this.http.get<T>(`${endpoint}/${id}`);
  }

  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(endpoint, data);
  }

  update(endpoint: string, id: unknown, data: T): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: unknown): Observable<unknown> {
    return this.http.delete(`${endpoint}/${id}`);
  }
}
