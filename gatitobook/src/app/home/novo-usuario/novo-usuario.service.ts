
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarNovoUsuario(novoUsuario: NovoUsuario){
    return this.http.post<NovoUsuario>(`${API}/user/signup`, novoUsuario);
  }

  verificarUsuarioExistente(nomeUsuario: string){
    return this.http.get(`${API}/user/exists/${nomeUsuario}`);
  }

}
