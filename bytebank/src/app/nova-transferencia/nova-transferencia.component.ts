import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Transferencia } from "../models/transferencia.model";
import { TransferenciaService } from "../services/transferencia.service";

@Component({
    selector:'app-nova-transferencia',
    templateUrl:'./nova-transferencia.component.html',
    styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent{

  transferencia: Transferencia = {};

  constructor(
    private service: TransferenciaService,
    private router: Router
    ){}

  transferir(): void{
    console.log('Solicitada nova transferência');

    this.service.adicionar(this.transferencia).subscribe(resultado => {
      console.log(resultado);
      this.router.navigateByUrl('extrato');
    },
      (error) => console.error(error)
    );
  }

  teste(): void{
    alert('teste');
  }
}
