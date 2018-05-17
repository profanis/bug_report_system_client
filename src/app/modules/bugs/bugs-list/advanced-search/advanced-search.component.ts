import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AdvancedSearchModel } from "../../models/advanced-search.model";

@Component({
  selector: "app-advanced-search",
  templateUrl: "./advanced-search.component.html",
  styleUrls: ["./advanced-search.component.css"]
})
export class AdvancedSearchComponent implements OnInit {

  @Output() advancedSearch = new EventEmitter<AdvancedSearchModel>();
  title: string;
  priority: string;
  reporter: string;
  status: string;

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.advancedSearch.emit({
      title: this.title,
      priority: this.priority,
      reporter: this.reporter,
      status: this.status
    });
  }

}
