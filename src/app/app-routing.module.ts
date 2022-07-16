import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPokemonComponent } from './@core/app/pokemon/detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './@core/app/pokemon/list-pokemon/list-pokemon.component';

const routes: Routes = [
  { path: '', component: ListPokemonComponent },
  { path: ':name', component: DetailPokemonComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
