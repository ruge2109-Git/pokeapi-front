import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './@core/services/auth-interceptor.service';
import { ListPokemonComponent } from './@core/app/pokemon/list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './@core/app/pokemon/detail-pokemon/detail-pokemon.component';
import { HeaderComponent } from './@core/components/header/header.component';
import { CardPokemonBasicComponent } from './@core/components/card-pokemon-basic/card-pokemon-basic.component';
import { FooterComponent } from './@core/components/footer/footer.component';
import { SpinnerComponent } from './@core/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    DetailPokemonComponent,
    HeaderComponent,
    CardPokemonBasicComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
