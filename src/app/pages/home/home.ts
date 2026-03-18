import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pokeapi } from '../../services/pokeapi';
import { Pokemon } from '../../models/pokemon';
import { PokeCard } from '../../components/poke-card/poke-card';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [PokeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
    private pokeaps = inject(Pokeapi)

    pokemons = signal<Pokemon[]>([]);

    ngOnInit(): void {
      this.loadPokemons()
    }


    loadPokemons() {
    this.pokeaps.getPokemons()
    .subscribe(data => {
      const llamadas = data.results.map((p: any) =>
        this.pokeaps.getPokemonDetails(p.name)
      ) as any[];

    forkJoin(llamadas).subscribe((pokemons: any[]) => {
        const pokemonesMapeados =pokemons.map((p: any) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
          types: p.types.map((t: any) => t.type.name)
    }));

      this.pokemons.set(pokemonesMapeados);
        
      });
  });
}
    busqueda = signal('');

    pokemonsFiltrado = computed(() => {
    return this.pokemons()
    .filter(p => p.name.includes(this.busqueda()))
    .filter(p =>
      this.tipoSeleccionado() === 'todos' ||
      p.types.includes(this.tipoSeleccionado())
    )
  })

    tipoSeleccionado = signal('todos');


}