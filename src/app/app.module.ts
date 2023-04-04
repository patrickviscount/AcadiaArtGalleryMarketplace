import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './artists/artists.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { LoginComponent } from './components/login/login.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { SearchComponent } from './search/search.component';
import { TopNavComponent } from './top-nav/top-nav.component';


@NgModule({
  declarations: [AppComponent, TopNavComponent, ArtistsComponent, SearchComponent, AddArtistComponent, ArtistDetailsComponent, ArtistListComponent, ArtworksComponent, PlaceOrderComponent, LoginComponent],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
