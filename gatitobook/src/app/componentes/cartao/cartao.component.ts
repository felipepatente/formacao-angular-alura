import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html'
})
export class CartaoComponent implements OnInit {

  @Input() titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
