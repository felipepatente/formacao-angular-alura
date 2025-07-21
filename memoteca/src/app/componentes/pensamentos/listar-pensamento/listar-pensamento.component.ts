import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamento) => {
      this.listaPensamentos = listaPensamento;
    });
  }

  carregarMaisPensamento(): void{

    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamento => {
      this.listaPensamentos.push(...listaPensamento);

      if(!listaPensamento.length)
        this.haMaisPensamentos = false;

    });
  }

  pesquisarPensamento(): void{
    
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamento => {
      this.listaPensamentos = listaPensamento;
    })
  }

  listarFavoritos(): void{
    
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favoritos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos;
    });
  }

}
