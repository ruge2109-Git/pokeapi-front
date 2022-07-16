import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse, PokemonInfoBasic } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ModyoPokeApiService {

  constructor(private http: HttpClient) { }

  getListPokemon(limit: number, offset: number) {
    return this.http.get<ApiResponse<PokemonInfoBasic>>(`${environment.url_back}/api/v1/getListPokemon?limit=${limit}&offset=${offset}`);
  }
}
