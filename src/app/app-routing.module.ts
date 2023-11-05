import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'olympic/:id', // country id
    component: CountryComponent,
  },
  {
    path: '', // default route
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
