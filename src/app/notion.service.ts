import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// ACCESS CONSTANTS
export const NOTION = {
  bearerToken: 'secret_GG8IcpTnbGE6jyXZFU1bznFLGeLkU8xJ9SsGrZ5Jtbj',
  database: {
    api: 'https://api.notion.com/v1/databases'
  },
  page: {
    api: 'https://api.notion.com/v1/pages'
  }
};

// HEADERS
export const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NOTION.bearerToken}`,
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotionService {

  private _database$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public database$: Observable<any> = this._database$.asObservable();

  private _pageData$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public pageData$: Observable<any> = this._pageData$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getDatabase(databaseID: string): Observable<any> {
    return this.http.get(`${NOTION.database.api}/` + databaseID, headerOptions);
  }

  getPage(pageID:string): Observable<any> {
    return this.http.get(`${NOTION.page.api}/`+ pageID, headerOptions);
  }
}
