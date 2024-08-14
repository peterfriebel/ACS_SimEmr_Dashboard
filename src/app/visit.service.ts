import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IVisits } from '../visits';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private _url: string = 'http://SCM22POH:3000/api/Client';

  constructor(private _http: HttpClient) { }

  public getAllSimVisits(): Observable<IVisits[]> {
    return this._http.get<IVisits[]>
    (this._url).pipe(catchError(this.errorhandler));
   }
   
   public ResetVisit(visitguid: string,currentDateTime:string): Observable<any>
   {
     let params = new HttpParams()
     .set('visitGuid', visitguid.toString())
     .set('strDateTime', currentDateTime);
    
     return this._http.put<any>(this._url, null, { params: params })
         .pipe(catchError(this.errorhandler));
 
   }
   
   errorhandler(error: HttpErrorResponse)
   {
     return throwError(() => error.message);
   }
}
