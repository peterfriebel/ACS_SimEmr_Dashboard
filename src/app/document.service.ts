import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IDocuments } from 'src/Documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private _url: string = 'http://SCM22POH:3000/api/Document';

  constructor(private _http: HttpClient) { }

  public getDocuments(visitguid: number): Observable<IDocuments[]>{
    return this._http.get<IDocuments[]>
    (this._url, {params: {visitGUID: visitguid}}).pipe(catchError(this.errorhandler));
  }

  public setDate(guid: number, dtm: string): Observable<IDocuments>{

    let params = new HttpParams()
    .set('documentGuid', guid.toString())
    .set('strDateTime', dtm);
   
    return this._http.put<any>(this._url, null, { params: params })
        .pipe(catchError(this.errorhandler));

  }

  errorhandler(error: HttpErrorResponse)
  {
    return throwError(() => error.message);
  }
}
