import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDetail } from '../models/DetailPokemon';
import { ApiResponse, PokemonInfoBasic } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ModyoPokeApiService {

  constructor(private http: HttpClient) { }

  getListPokemon(limit: number, offset: number) {
    return this.http.get<ApiResponse<PokemonInfoBasic>>(`${environment.url_back}/api/v1/getListPokemon?limit=${limit}&offset=${offset}`);
  }

  getDetailPokemon(namePokemon: string) {
    return this.http.get<ResponseDetail>(`${environment.url_back}/api/v1/getDetailPokemon?name=${namePokemon}`);
  }

  getListTypes() {
    return this.http.get<ApiResponse<string>>(`${environment.url_back}/api/v1/getAllTypes`);
  }

  getListPokemonFromType(limit: number, offset: number, type: string) {
    return this.http.get<ApiResponse<PokemonInfoBasic>>(`${environment.url_back}/api/v1/getListPokemonFromType?limit=${limit}&offset=${offset}&type=${type}`);
  }
}
