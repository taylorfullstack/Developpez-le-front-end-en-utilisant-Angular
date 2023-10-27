import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent{
  country!: Olympic;
  totalMedals!: number;
  participations!: Participation[];
  athletes!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];
    this.country = this.olympicService.getOlympicById(countryId);
    this.totalMedals = this.olympicService.getTotalMedalsByCountryId(countryId);
    this.athletes = this.olympicService.getTotalAthletesByCountryId(countryId);
    this.participations = this.country.participations;
  }

  /**
   * Navigate to home page when clicking on the back to home button
   *
   * This function was added in order to try to address the issue of the pie chart not renderingafter navigating back to home from the country page.
   *
   * TODO: Continue to Investigate why the chart is not rendering on the home page after navigating back to it from the country page.
   *
   * Issue #1
  */
  navigateToHome() {
    window.location.href = '';
  }
}
