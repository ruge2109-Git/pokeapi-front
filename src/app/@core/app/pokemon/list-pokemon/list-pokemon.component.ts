import { ModyoPokeApiService } from './../../../services/modyo-poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ApiResponse, ItemPage, PokemonInfoBasic } from 'src/app/@core/models/Response';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  responseData?: ApiResponse<PokemonInfoBasic>;
  listPages: ItemPage[] = [];
  currentPage:number = 1;
  cantPagesTotal: number = 1;

  constructor(private _modyoPokemoService: ModyoPokeApiService) { }

  ngOnInit(): void {
    this.getListPokemon(this.currentPage, 8, 0);
  }

  getListPokemon(indexPage: number, limit: number, offset: number) {

    this._modyoPokemoService.getListPokemon(limit, offset).subscribe({
      next: (data) => {
        this.responseData = data;
        if (!this.responseData.brta) {
          return;
        }
        this.cantPagesTotal = Math.ceil(this.responseData!.cantData / 8);
        this.initPaginator(indexPage);
      },
      error: (err) => {
      },
    })
  }

  initPaginator(indexPage: number) {
    this.currentPage = indexPage;
    this.listPages = [];
    let cantPages = Math.ceil(this.responseData!.cantData / 8);
    let incrementLimit = 8;
    let incrementOffset = 0;
    for (let i = 0; i < cantPages; i++) {
      incrementLimit = 8 * (i + 1);
      this.listPages.push({
        index: (i + 1),
        limit: 8,
        offset: incrementOffset,
        active: (indexPage - 1) == i
      })
      incrementOffset = 8 * (i + 1);
    }

    let newList = this.listPages.slice(indexPage - 4, indexPage + 4);
    if (newList.length == 0) {
      this.listPages = this.listPages.slice(0, 8);
      return;
    };
    this.listPages = newList;
  }

}
