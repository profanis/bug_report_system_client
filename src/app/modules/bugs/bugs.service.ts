import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { BugsMapper } from "./bugs.mapper";
import { Bug } from "./models/bugs.model";
import { ReturnStatement } from "@angular/compiler";


@Injectable()
export class BugsService {

  private readonly ENDPOINT = "http://localhost:3001/bugs";

  constructor(private http: HttpClient) { }

  get(sortColumn: string, sortType: string = "asc"): Observable<Bug[]> {
    let params = new HttpParams();
    if (sortColumn) {
      params = params.append("sort", `${sortColumn},${sortType}`);
    }

    // TODO the "any" type should reflect the schema of the server
    return this.http.get(this.ENDPOINT, { params: params}).pipe(
      map((bugs: any[]) => bugs.map(BugsMapper.toView))
    );
  }

  save(bug: Bug): Observable<any> {
    return this.http.post(this.ENDPOINT, BugsMapper.toServer(bug));
  }

}
