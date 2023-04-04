import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { AuthManagerGuard } from './auth-manager.guard';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { LoginComponent } from './components/login/login.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'artists', component: ArtistListComponent},
  { path: 'artist/:id', component: ArtistDetailsComponent },
  { path: 'add', component: AddArtistComponent, canActivate: [AuthGuardGuard, AuthManagerGuard]},
  { path: 'artworks', component: ArtworksComponent },
  {path: 'placeOrder/:id', component: PlaceOrderComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
