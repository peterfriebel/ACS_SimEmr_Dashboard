import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IClient } from './app/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _url: string = 'http://SCM22POH:3000/api/Client';

  constructor(private _http: HttpClient) { }

  public getVisitDetails(visitguid: number): Observable<IClient[]>{
    return this._http.get<IClient[]>
    (this._url, {params: {visitGUID: visitguid}}).pipe(catchError(this.errorhandler));
  }
  errorhandler(error: HttpErrorResponse)
  {
    return throwError(() => error.message);
  }
}
