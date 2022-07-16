export interface ApiResponse<T> {
  data: T[];
  brta: boolean;
  smsg: string;
  cantData: number;
}

export interface PokemonInfoBasic {
  name: string;
  type: string[];
  weight: number;
  urlImage: string;
  abilities: string[];
}

export interface ItemPage {
  index: number;
  limit: number;
  offset: number;
  active: boolean;
}
