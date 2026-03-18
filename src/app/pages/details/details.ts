import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokeapi } from '../../services/pokeapi';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {

    private location = inject(Location);

    private route = inject(ActivatedRoute);

    private Pokeapi = inject(Pokeapi);

    pokemon = signal<any>(null)

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.Pokeapi.getPokemonDetails(id!).subscribe(data => {
      this.pokemon.set({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map ((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
        }))
      });
    })
    }

    goBack() {
  this.location.back();
}


}
