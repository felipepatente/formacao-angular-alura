import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  NovoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private NovoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.NovoUsuarioForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()]],
      password: ['']
    });
  }

  cadastrar(){

    if(this.NovoUsuarioForm.valid){
      const novoUsuario = this.NovoUsuarioForm?.getRawValue() as NovoUsuario;
      this.NovoUsuarioService.cadastrarNovoUsuario(novoUsuario).subscribe(() => {
        this.router.navigateByUrl('');
      },
      (error) =>{
        console.log(error);
      })
    }
  }
}
