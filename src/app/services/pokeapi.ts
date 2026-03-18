import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';


@Injectable({
  providedIn: 'root',
})
export class Pokeapi {
    private httpClient = inject(HttpClient);
    private baseUrl = 'https://pokeapi.co/api/v2';

    getPokemons() {
      return this.httpClient.get<any>(this.baseUrl + '/pokemon?limit=150')
    }

  getPokemonDetails(name: string){
    return this.httpClient.get<any>(`${this.baseUrl}/pokemon/${name}`)

  }
}
