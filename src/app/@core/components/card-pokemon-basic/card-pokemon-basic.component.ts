import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonInfoBasic } from '../../models/Response';

@Component({
  selector: 'app-card-pokemon-basic',
  templateUrl: './card-pokemon-basic.component.html',
  styleUrls: ['./card-pokemon-basic.component.scss']
})
export class CardPokemonBasicComponent implements OnInit {

  @Input() pokemon!: PokemonInfoBasic;
  @Output() typePokemon = new EventEmitter<string>();

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  sendType(value: string) {
    this.typePokemon.emit(value);
  }

  navigateToDetail() {
    this._router.navigate(['/',this.pokemon.name]);
  }

}
