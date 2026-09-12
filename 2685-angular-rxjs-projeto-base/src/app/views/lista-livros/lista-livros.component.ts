import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [] = [];
  campoBusca: string = '';

  constructor(private service: LivroService) { }

  buscarLivros(): void{

    if (!this.campoBusca.trim()) return;

    this.service.buscar(this.campoBusca).subscribe({
      next: (retornoApi) => {
        console.log(retornoApi);
        // A API do Google Books retorna os resultados dentro da propriedade 'items'
        // this.listaLivros = retornoApi.items || []; 
      },
      error: (erro) => {
        console.error('Erro ao buscar livros:', erro);
      }
    });
  }

}



