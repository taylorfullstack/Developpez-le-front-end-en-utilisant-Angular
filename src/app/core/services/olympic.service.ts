import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
//import OLYMPICS from '../../../assets/mock/olympic.json';

/**
 * @Injectable() decorator marks the class as one that participates in the dependency injection system
 */
@Injectable({
  providedIn: 'root',
})

/**
 * The OlympicService class is going to provide an injectable service, and it can also have its own injected dependencies.
 * It can be used to retrieve data from a web service, local storage, or a mock data source.
 *
 * The OlympicService class is going to retrieve the data from the mock data source.
 */
export class OlympicService {
  private olympicUrl = '../../../assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}



  loadInitialData() {
    /**
     * The HttpClient.get() method returns an Observable that emits the response data as a JSON object.
     * The HttpClient.get() method is asynchronous.
     * It returns an Observable of type Olympic[].
     * The HttpClient.get() method takes a single argument, the URL of the resource to be retrieved.
     *
     * The pipe() method is used to combine multiple RxJS operators into a single function.
     *
     * The tap() operator looks at the observable values, does something with those values, and passes them along.
     *
     * The catchError() operator intercepts an Observable that failed.
     * The catchError() operator returns a new observable or throws an error.
     *
     * The next() method of the BehaviorSubject class is used to emit new values.
     *
    */
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value: Olympic[]) => {
        console.log("value", value)
        this.olympics$.next(value);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
