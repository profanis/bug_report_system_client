import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { BugsMapper } from "./bugs.mapper";
import { Bugs } from "./models/bugs.model";


@Injectable()
export class BugsService {

  private readonly ENDPOINT = "http://localhost:3001/bugs";

  constructor(private http: HttpClient) { }

  get(sortColumn: string, sortType: string = "asc"): Observable<Bugs[]> {
    let params = new HttpParams();
    if (sortColumn) {
      params = params.append("sort", `${sortColumn},${sortType}`);
    }

    // TODO the "any" type should reflect the schema of the server
    return this.http.get(this.ENDPOINT, { params: params}).pipe(
      map((bugs: any[]) => bugs.map(BugsMapper.toView))
    );
  }

}
