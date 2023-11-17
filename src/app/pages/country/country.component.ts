import { Component, OnInit, OnDestroy } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy{
  olympics$!: Olympic[];
  country!: Olympic;
  totalMedals!: number;
  participations!: Participation[];
  athletes!: number;
  countryId!: number;
  subscription: Subscription | undefined;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.countryId = +id; //convert string to number
    this.getLineChartData(+id);
  }

  /**
   * @method getLineChartData
   * @description
   * Get the data for the line chart by subscribing to the observable returned by the getOlympics() method of the OlympicService
   * @param countryId - the numeric id of the olympic country
   * @returns void
   *
   */
  getLineChartData(countryId: number): void {
    this.subscription = this.olympicService.getOlympics().subscribe(olympics => {
      this.olympics$ = olympics;
      try {
        this.country = this.olympicService.getOlympicById(countryId);
        this.totalMedals = this.olympicService.getTotalMedalsByCountryId(countryId);
        this.athletes = this.olympicService.getTotalAthletesByCountryId(countryId);
        this.participations = this.country.participations;
      } catch (error) {
        this.router.navigate(['**']);
      }
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
