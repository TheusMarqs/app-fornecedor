import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suppliers } from './fornecedores';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  url = "http://localhost:3000/Fornecedores";

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.url)
  }

  save(suppliers: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(this.url, suppliers);
  }

  update(suppliers: Suppliers): Observable<Suppliers> {
    return this.http.put<Suppliers>(`${this.url}/${suppliers.id}`, suppliers);
  }

  delete(suppliers: Suppliers): Observable<void> {
    return this.http.delete<void>(`${this.url}/${suppliers.id}`);
  }
}
