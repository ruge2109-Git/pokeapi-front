import { Component, Input, OnInit } from '@angular/core';
import { PokemonInfoBasic } from '../../models/Response';

@Component({
  selector: 'app-card-pokemon-basic',
  templateUrl: './card-pokemon-basic.component.html',
  styleUrls: ['./card-pokemon-basic.component.scss']
})
export class CardPokemonBasicComponent implements OnInit {

  @Input() pokemon!: PokemonInfoBasic;

  constructor() { }

  ngOnInit(): void {
  }

}
