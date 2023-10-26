import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericBackendService<T, TId> {

  constructor(@Inject(String) public url: string, public httpClient: HttpClient) { }

  get(url?: string, retryCount = 1, params?: HttpParams) {
    const endpoint = url ?? this.url;
    return this.httpClient
      .get<T>(endpoint, { params })
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  getByID(id: TId, retryCount = 1) {
    return this.httpClient
      .get<T>(this.url + '/' + id)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  post(id: TId, data?: T, retryCount = 1) {
    return this.httpClient
      .post<T>(this.url + '/' + id, data)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  postWithoutId(data?: T, retryCount = 1) {
    return this.httpClient
      .post<T>(this.url, data)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  put(id: TId, data: T, retryCount = 1) {
    return this.httpClient
      .put<T>(this.url + '/' + id, data)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  update(id: TId, data: T, retryCount = 1) {
    return this.httpClient
      .patch<T>(this.url + '/' + id, data)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  delete(id: TId, retryCount = 1) {
    return this.httpClient
      .delete<T>(this.url + '/' + id)
      .pipe(retry(retryCount), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.message) {
      errorMessage = error.error.message;
    }
    console.error(errorMessage); // Log the error
    return throwError(() => {
      return error;
    });
  }
}
