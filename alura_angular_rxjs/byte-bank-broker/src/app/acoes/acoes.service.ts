import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpCliente: HttpClient) { }

  getAcoes(){
    return this.httpCliente.get<any>('http://localhost:3000/acoes');
  }
}
