
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * @Injectable() decorator marks the class as one that participates in the dependency injection system
 * The OlympicService class is going to provide an injectable service, and it can also have its own injected dependencies.
 * It can be used to retrieve data from a web service, local storage, or a mock data source.
 *
 * The OlympicService class is going to retrieve the data from the mock data source.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = '../../../assets/mock/olympic.json';
  private olympics: Olympic[] = [];

  /**
  * handleError pulled directly from the Angular docs:
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl)
      .pipe(
        tap((response) => {
          this.olympics = response;
        }),
        catchError(this.handleError<Olympic[]>('getOlympics', []))
        );
    }

  getOlympicById(id: number): Olympic {
    const olympic = this.olympics.find((olympic) => olympic.id === id);
    if(!olympic){
      throw new Error('olympic not found!')
    } else {
      return olympic;
    }
  }

  getTotalMedalsByCountryId(id: number): number{
    const olympic = this.getOlympicById(id);
    return olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0);
  };

  getTotalAthletesByCountryId(id: number): number{
    const olympic = this.getOlympicById(id);
    return olympic.participations.reduce((total, participation) => total + participation.athleteCount, 0);
  };
}
