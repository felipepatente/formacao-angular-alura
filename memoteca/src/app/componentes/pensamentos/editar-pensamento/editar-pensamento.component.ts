import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private rotaAtiva: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formulario = this.fb.group({
      id: [0],
      conteudo: [''],
      autoria: [''],
      modelo: ['']
    });

    const id = this.rotaAtiva.snapshot.paramMap.get('id');

    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      
      this.pensamento = pensamento;
      
      this.formulario = this.fb.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([Validators.required])],
        autoria: [pensamento.autoria, Validators.compose([Validators.required, Validators.minLength(3)])],
        modelo: [pensamento.modelo]
      });
    });

  }

  editarPensamento() : void{

    if(this.formulario.valid){

      this.pensamento = this.formulario.value;

      this.service.editar(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      })

    }
  }

  cancelarPensamento(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() : string{

    if(this.formulario.valid)
      return 'botao';

    return 'botao__desabilitado';

  }

}
