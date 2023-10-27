import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryPieSliceComponent } from './components/country-pie-slice/country-pie-slice.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { PiechartComponent } from './components/piechart/piechart.component';


@NgModule({

  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    NotFoundComponent,
    HeaderComponent,
    CountryPieSliceComponent,
    StatsCardComponent,
    PiechartComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
