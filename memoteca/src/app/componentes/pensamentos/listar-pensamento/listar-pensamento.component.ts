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

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamento) => {
      this.listaPensamentos = listaPensamento;
    });
  }

  carregarMaisPensamento(): void{

    this.service.listar(++this.paginaAtual).subscribe(listaPensamento => {
      this.listaPensamentos.push(...listaPensamento);

      if(!listaPensamento.length)
        this.haMaisPensamentos = false;

    });
  }

}
