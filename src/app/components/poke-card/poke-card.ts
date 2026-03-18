import { Component, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-poke-card',
  imports: [RouterLink],
  templateUrl: './poke-card.html',
  styleUrl: './poke-card.css',
})
export class PokeCard {
  pokemon = input<Pokemon>();
}
