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
  responseAllData?: ApiResponse<PokemonInfoBasic>;
  responseDataTypes?: ApiResponse<string>;
  listPages: ItemPage[] = [];
  currentPage: number = 1;
  cantPagesTotal: number = 1;
  currentType: string = "clean";

  spinnerFirstTime: boolean = false;
  spinnerLoadData: boolean = false;

  showListPokemonsFilter: boolean = false;


  constructor(private _modyoPokemoService: ModyoPokeApiService) { }

  ngOnInit(): void {
    this.spinnerFirstTime = true;
    this.getListPokemon(this.currentPage, 8, 0);
    this.getAllTypes();
  }

  getAllTypes() {
    this._modyoPokemoService.getListTypes().subscribe({
      next: (data) => {
        this.responseDataTypes = data;
        if (!this.responseDataTypes.brta) {
          return;
        }
      },
      error: (err) => {
      },
    })
  }

  getListPokemon(indexPage: number, limit: number, offset: number) {
    this.spinnerLoadData = true;
    this.currentType = 'clean';
    this.showListPokemonsFilter = false;

    this._modyoPokemoService.getListPokemon(limit, offset).subscribe({
      next: (data) => {
        this.spinnerFirstTime = false;
        this.spinnerLoadData = false;
        this.responseData = data;
        if (!this.responseData.brta) {
          return;
        }
        this.cantPagesTotal = Math.ceil(this.responseData!.cantData / 8);
        this.initPaginator(indexPage, this.cantPagesTotal);
      },
      error: (err) => {
        this.spinnerLoadData = false;
        this.spinnerFirstTime = false;
      },
    })
  }

  getListPokemonFromType(limit: number, offset: number, indexPage: number, type: string) {
    this.showListPokemonsFilter = true;
    this.spinnerLoadData = true;
    this.currentType = type;

    this._modyoPokemoService.getListPokemonFromType(limit, offset, type).subscribe({
      next: (data) => {
        this.spinnerFirstTime = false;
        this.spinnerLoadData = false;
        this.responseData = data;
        if (!this.responseData.brta) {
          return;
        }

        this.cantPagesTotal = Math.ceil(this.responseData!.cantData / 8);
        this.initPaginator(indexPage, this.cantPagesTotal);
      },
      error: (err) => {
        this.spinnerLoadData = false;
        this.spinnerFirstTime = false;
      },
    })
  }

  initPaginator(indexPage: number, cantPages: number) {
    this.currentPage = indexPage;
    this.listPages = [];
    let incrementOffset = 0;
    for (let i = 0; i < cantPages; i++) {
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
