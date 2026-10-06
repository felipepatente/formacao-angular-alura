import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
   private readonly API_KEY = 'AIzaSyBMyW1TqlvlPO3oupyctI9kOqdOLrHxsOA'; 

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams()
      .append('q', valorDigitado)
      .append('key', this.API_KEY); 
      
    return this.http.get<LivrosResultado>(this.API, { params}).pipe(
      tap((retorno) => console.log('Fluxo do tap ', retorno)),
      map(resultado => resultado.items),
      tap(resultado => console.log('Fluxo após o map', resultado))
    );
  }
}
