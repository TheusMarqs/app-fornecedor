import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from './clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = "http://localhost:3000/Clientes";

  constructor(private http: HttpClient) { }

  getClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.url)
  }

  save(clients: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.url, clients);
  }

  update(clients: Clients): Observable<Clients> {
    return this.http.put<Clients>(`${this.url}/${clients.id}`, clients);
  }

  delete(clients: Clients): Observable<void> {
    return this.http.delete<void>(`${this.url}/${clients.id}`);
  }
}
