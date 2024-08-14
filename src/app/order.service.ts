import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrders } from 'src/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _url: string = 'http://SCM22POH:3000/api/Order';

  constructor(private _http: HttpClient) { }
  
  public getOrders(visitguid: number): Observable<IOrders[]>{ 
     return this._http.get<IOrders[]>(this._url, 
       {params: {visitGUID: visitguid}}).pipe(catchError(this.errorhandler));
  }

  public setDate(guid: number, dtm: string): Observable<IOrders>{

    let params = new HttpParams()
    .set('orderGuid', guid.toString())
    .set('strDateTime', dtm);
   
    return this._http.put<any>(this._url, null, { params: params })
        .pipe(catchError(this.errorhandler));

  }

  errorhandler(error: HttpErrorResponse)
  {
    console.log(error);
    return throwError(() => error.message);
  }
}
