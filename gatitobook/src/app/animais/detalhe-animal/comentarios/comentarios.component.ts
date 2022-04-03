import { switchMap, tap } from 'rxjs/operators';
import { ComentariosService } from './comentarios.service';
import { Comentarios } from './comentarios';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html'
})
export class ComentariosComponent implements OnInit {

  @Input() id!: number;
  comentarios$!: Observable<Comentarios>
  comentarioForm!: FormGroup;

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario:['', Validators.maxLength(300)]
    })
  }

  gravar(): void{
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService
      .incluirComentario(this.id, comentario)
      .pipe(
        switchMap(() => this.comentarioService.buscaComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset();
          alert('Comentário salvo');
        })
      );
  }
}
