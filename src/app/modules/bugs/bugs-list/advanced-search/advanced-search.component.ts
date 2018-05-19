import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AdvancedSearchModel } from "../../models/advanced-search.model";

@Component({
  selector: "app-advanced-search",
  templateUrl: "./advanced-search.component.html",
  styleUrls: ["./advanced-search.component.css"]
})
export class AdvancedSearchComponent implements OnInit {

  @Output() advancedSearch = new EventEmitter<AdvancedSearchModel>();

  model = new AdvancedSearchModel();

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.advancedSearch.emit(this.model);
  }

}
