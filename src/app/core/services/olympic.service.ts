
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * @description
 * The Injectable() decorator marks the class as one that participates in the dependency injection system.
 *
 * The OlympicService class provides an injectable service, which can also have its own injected dependencies.
 * An injectable service can be used to retrieve data from a web service, local storage, or a mock data source.
 *
 * The OlympicService class retrieves the data from the mock data source.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = '../../../assets/mock/olympic.json';
  private olympics: Olympic[] = [];

  /**
   * @source - https://angular.io/tutorial/tour-of-heroes/toh-pt6#handleerror
   *
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  /**
   * @method getOlympics
   * @returns an Observable of type Olympic[]
   */
  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl)
      .pipe(
        tap((response) => {
          this.olympics = response;
        }),
        catchError(this.handleError<Olympic[]>('getOlympics', []))
        );
    }

  /**
   * @method getOlympicById
   * @param id - the id of the olympic country to be retrieved
   * @returns an object of type Olympic with the specified id
   */
  getOlympicById(id: number): Olympic {
    const olympic = this.olympics.find((olympic) => olympic.id === id);
    if(!olympic){
      throw new Error('olympic not found!')
    } else {
      return olympic;
    }
  }

  /**
   * @method getTotalMedalsByCountryId
   * @param id - the id of the olympic country
   * @returns the total number of medals won by the country
   */
  getTotalMedalsByCountryId(id: number): number{
    const olympic = this.getOlympicById(id);
    return olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0);
  };

  /**
   * @method getTotalAthletesByCountryId
   * @param id - the id of the olympic country
   * @returns - the total number of athletes from the country
   */
  getTotalAthletesByCountryId(id: number): number{
    const olympic = this.getOlympicById(id);
    return olympic.participations.reduce((total, participation) => total + participation.athleteCount, 0);
  };
}
