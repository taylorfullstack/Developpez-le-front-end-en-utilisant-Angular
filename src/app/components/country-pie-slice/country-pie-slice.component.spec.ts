import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPieSliceComponent } from './country-pie-slice.component';

describe('CountryPieSliceComponent', () => {
  let component: CountryPieSliceComponent;
  let fixture: ComponentFixture<CountryPieSliceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryPieSliceComponent]
    });
    fixture = TestBed.createComponent(CountryPieSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
