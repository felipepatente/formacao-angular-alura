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
  editando = false;
  textoBtn = 'Salvar item';

  constructor(private listaService: ListaDeCompraService) { }
  
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['itemQuevaiSerEditado'].firstChange){
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemQuevaiSerEditado?.nome;
    }
  }

  editarItem(){
    this.listaService.editarItemDaLista(this.itemQuevaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar item';
  }  

  limparCampo(){
    this.valorItem = '';
  }

  adicionarItem(): void{
    this.listaService.adicionarItemNaLista(this.valorItem);    
    this.limparCampo();
  }

  
}
