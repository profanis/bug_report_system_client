import "rxjs/add/observable/of";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bugs } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";
import { BaseComponent } from "../../../shared/base.component";


@Component({
  selector: "app-bugs-list",
  templateUrl: "./bugs-list.component.html",
  styleUrls: ["./bugs-list.component.css"]
})
export class BugsListComponent implements BaseComponent, OnInit {

  bugs$: Observable<Bugs[]>;
  sortByColumn = "";
  sortDirection = "";

  constructor(private route: ActivatedRoute,
              private bugsService: BugsService) { }

  canDeactivate = () => true;

  ngOnInit() {
    this.route.data.subscribe((data: { bugs: Bugs[]}) => {
      this.bugs$ = Observable.of(data.bugs);
    });

  }


  sortBy(column: string) {
    this.sortDirection = this.getSortDirection(column);
    this.sortByColumn = column;
    this.bugs$ = this.bugsService.get(this.sortByColumn, this.sortDirection);
  }

  private getSortDirection(column: string): "asc" | "desc" {
    return (this.sortByColumn === column && this.sortDirection === "asc")
                        ? "desc"
                        : "asc";
  }

}
