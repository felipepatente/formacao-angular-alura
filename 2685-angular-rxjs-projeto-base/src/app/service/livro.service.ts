import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
   private readonly API_KEY = 'AIzaSyBMyW1TqlvlPO3oupyctI9kOqdOLrHxsOA'; 

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<any> {
    const params = new HttpParams()
      .append('q', valorDigitado)
      .append('key', this.API_KEY); 
      
    return this.http.get(this.API, { params});
  }
}
