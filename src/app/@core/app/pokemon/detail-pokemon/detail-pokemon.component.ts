import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DetailInfo } from 'src/app/@core/models/DetailPokemon';
import { ModyoPokeApiService } from 'src/app/@core/services/modyo-poke-api.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  namePokemon: string = "";
  responseData?: DetailInfo;
  spinnerLoadData: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private _modyoPokemoService: ModyoPokeApiService) {
    this.namePokemon = this.route.snapshot.paramMap.get('name')!;
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.namePokemon = this.route.snapshot.paramMap.get('name')!;
        this.getInfoPokemon();
      }
    });
    this.getInfoPokemon();
  }

  getInfoPokemon() {
    this.spinnerLoadData = true;
    this._modyoPokemoService.getDetailPokemon(this.namePokemon).subscribe({
      next: (data) => {
        this.spinnerLoadData = false;
        if (!data.brta) return;
        this.responseData = data.data[0];
        console.log(this.responseData);

      },
      error: (err) => {
        this.spinnerLoadData = false;
      },
    })
  }

}
