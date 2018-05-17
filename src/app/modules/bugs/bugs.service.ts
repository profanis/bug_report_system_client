import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { BugsMapper } from "./bugs.mapper";
import { Bug } from "./models/bugs.model";
import { ReturnStatement } from "@angular/compiler";
import { AdvancedSearchModel } from "./models/advanced-search.model";


@Injectable()
export class BugsService {

  private readonly ENDPOINT = "http://localhost:3001/bugs";
  private readonly DEFAULT_PAGE = 0;
  private readonly DEFAULT_PAGE_LIMIT = 10;

  constructor(private http: HttpClient) { }

  get(advancedSearchModel: AdvancedSearchModel, sortColumn: string, sortType: string = "asc",
      page: number = this.DEFAULT_PAGE, size: number = this.DEFAULT_PAGE_LIMIT): Observable<Bug[]> {

    let params = new HttpParams();
    if (sortColumn) {
      params = params.append("sort", `${sortColumn},${sortType}`);
    }

    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

    if (advancedSearchModel) {
      const {priority, reporter, status, title} = advancedSearchModel;
      params = priority ? params.append("priority", priority) : params;
      params = reporter ? params.append("reporter", reporter) : params;
      params = status ? params.append("status", status) : params;
      params = title ? params.append("title", title) : params;
    }

    // TODO the "any" type should reflect the schema of the server
    return this.http.get(this.ENDPOINT, { params: params}).pipe(
      map((bugs: any[]) => bugs.map(BugsMapper.toView))
    );
  }

  getById(id: string): Observable<Bug> {
    const endpoint = [this.ENDPOINT, id].join("/");
    return  this.http.get(endpoint).pipe(
      map((bug: any) => BugsMapper.toView(bug))
    );
  }

  save(bug: Bug): Observable<any> {
    return this.http.post(this.ENDPOINT, BugsMapper.toServer(bug));
  }

  update(id: string, bug: Bug): Observable<any> {
    const endpoint = [this.ENDPOINT, id].join("/");
    return this.http.put(endpoint, BugsMapper.toServer(bug));
  }

}
