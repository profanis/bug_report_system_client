import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bug } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";
import { BaseComponent } from "../../../shared/base.component";
import { AdvancedSearchComponent } from "./advanced-search/advanced-search.component";
import { AdvancedSearchModel } from "../models/advanced-search.model";
import { Pageable } from "../pageable.mapper";


@Component({
  selector: "app-bugs-list",
  templateUrl: "./bugs-list.component.html",
  styleUrls: ["./bugs-list.component.css"]
})
export class BugsListComponent implements BaseComponent, OnInit {

  bugs$: Observable<Bug[]>;
  sortByColumn = "";
  sortDirection = "";
  numberOfPage = 0;

  totalPages: number;
  totalRecords: number;
  page: number;
  perPage: number;


  advancedSearchModel: AdvancedSearchModel;
  @ViewChild(AdvancedSearchComponent) advancedSearchComponent;

  constructor(private route: ActivatedRoute,
              private bugsService: BugsService) { }

  canDeactivate = () => true;

  ngOnInit() {
    this.route.data.subscribe((data: { bugs: Pageable<Bug>}) => {
      this.getPaginationProperties(data.bugs);
      this.bugs$ = Observable.of(data.bugs.results);
    });

  }


  sortBy(column: string) {
    this.sortDirection = this.getSortDirection(column);
    this.sortByColumn = column;
    this.fetchData();
  }

  private fetchData() {
    this.bugs$ =
      this.bugsService
        .get(this.advancedSearchModel, this.sortByColumn, this.sortDirection, this.numberOfPage)
        .map(c => {
          this.getPaginationProperties(c);
          return c.results;
        });
  }

  private getSortDirection(column: string): "asc" | "desc" {
    return (this.sortByColumn === column && this.sortDirection === "asc")
                        ? "desc"
                        : "asc";
  }

  advancedSearch(data: AdvancedSearchModel) {
    this.advancedSearchModel = data;
    this.fetchData();
  }

  pageChanged(numberOfPage: number) {
    this.numberOfPage = numberOfPage;
    this.fetchData();
  }
  private getPaginationProperties(pageableBug: Pageable<Bug>) {
    this.totalPages = pageableBug.totalPages;
    this.page = pageableBug.page;
    this.perPage = pageableBug.perPage;
    this.totalRecords = pageableBug.totalRecords;
  }

}
