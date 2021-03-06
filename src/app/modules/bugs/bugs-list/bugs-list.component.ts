import "rxjs/add/observable/of";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bug } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";
import { BaseComponent } from "../../../shared/base.component";
import { AdvancedSearchComponent } from "./advanced-search/advanced-search.component";
import { AdvancedSearchModel } from "../models/advanced-search.model";


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
  advancedSearchModel: AdvancedSearchModel;
  @ViewChild(AdvancedSearchComponent) advancedSearchComponent;

  constructor(private route: ActivatedRoute,
              private bugsService: BugsService) { }

  canDeactivate = () => true;

  ngOnInit() {
    this.route.data.subscribe((data: { bugs: Bug[]}) => {
      this.bugs$ = Observable.of(data.bugs);
    });

  }


  sortBy(column: string) {
    this.sortDirection = this.getSortDirection(column);
    this.sortByColumn = column;
    this.fetchData();
  }

  private fetchData() {
    this.bugs$ =
      this.bugsService.get(this.advancedSearchModel, this.sortByColumn, this.sortDirection, this.numberOfPage);
  }

  private getSortDirection(column: string): "asc" | "desc" {
    return (this.sortByColumn === column && this.sortDirection === "asc")
                        ? "desc"
                        : "asc";
  }

  previousPage() {
    if (this.numberOfPage <= 0) {
      return;
    }
    this.numberOfPage--;
    this.fetchData();
  }

  nextPage() {
    this.numberOfPage++;
    this.fetchData();
  }

  advancedSearch(data: AdvancedSearchModel) {
    this.advancedSearchModel = data;
    this.fetchData();
  }

}
