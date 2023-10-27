import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-pie-slice',
  templateUrl: './country-pie-slice.component.html',
  styleUrls: ['./country-pie-slice.component.scss']
})
export class CountryPieSliceComponent implements OnInit{
  @Input() country!: Olympic;
  medals!: number;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.medals = this.olympicService.getTotalMedalsByCountryId(this.country.id);
  }

  onViewCountryDetails(){
    this.router.navigateByUrl(`${this.country.id}`);
  }
}
