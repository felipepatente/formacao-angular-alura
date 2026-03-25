import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemQuevaiSerEditado!: Item;
  valorItem!: string;

  constructor(private listaService: ListaDeCompraService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['itemQuevaiSerEditado'].firstChange){
      this.valorItem = this.itemQuevaiSerEditado?.nome;
    }
  }

  ngOnInit(): void { }

  adicionarItem(): void{
    this.listaService.adicionarItemNaLista(this.valorItem);    
    this.limparCampo();
  }

  limparCampo(){
    this.valorItem = '';
  }
}
