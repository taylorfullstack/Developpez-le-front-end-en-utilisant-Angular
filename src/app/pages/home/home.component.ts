import { Component, OnInit, OnDestroy} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  olympics$!: Olympic[];
  labels: string[] = [];
  medals: number[] = [];
  totalGames!: number;
  totalCountries!: number;
  subscription: Subscription | undefined;

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.getChartData();
  }

  /**
   * @method getChartData
   * @description
   * Get the data for the pie chart by subscribing to the observable returned by the getOlympics() method of the OlympicService.
   * The data is then used to populate the labels and medals arrays.
   * The labels array contains the country names and the medals array contains the total number of medals for each country.
   * The total number of olympic games and total number of olympic countries are also calculated.
   * @returns void
   */
  getChartData(): void {
    this.subscription = this.olympicService.getOlympics().subscribe(olympics => {
      this.olympics$ = olympics;
      this.totalCountries = this.olympics$.length;
      const uniqueYears = [...new Set(this.olympics$.flatMap(item => item.participations.map(p => p.year)))];
      this.totalGames = uniqueYears.length;
      this.olympics$.forEach(country => {
        this.labels.push(country.country);
        this.medals.push(this.olympicService?.getTotalMedalsByCountryId(country.id));
      });
    });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Unsubscribe from the observable
   * @returns void
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
