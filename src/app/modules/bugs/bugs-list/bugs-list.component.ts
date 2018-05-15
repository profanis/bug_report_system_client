import "rxjs/add/observable/of";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bug } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";


@Component({
  selector: "app-bugs-list",
  templateUrl: "./bugs-list.component.html",
  styleUrls: ["./bugs-list.component.css"]
})
export class BugsListComponent implements OnInit {

  bugs$: Observable<Bug[]>;
  sortByColumn = "";
  sortDirection = "";

  constructor(private route: ActivatedRoute,
              private bugsService: BugsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { bugs: Bug[]}) => {
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
