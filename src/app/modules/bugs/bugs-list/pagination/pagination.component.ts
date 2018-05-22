import { Output, EventEmitter, Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {

  numberOfPage = 0;
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalPages;

  constructor() { }

  ngOnInit() {
  }

  previousPage() {
    if (this.numberOfPage <= 0) {
      return;
    }
    this.numberOfPage--;
    this.pageChanged.emit(this.numberOfPage);
  }

  nextPage() {
    if (this.numberOfPage >= this.totalPages - 1) {
      return;
    }
    this.numberOfPage++;
    this.pageChanged.emit(this.numberOfPage);
  }

}
