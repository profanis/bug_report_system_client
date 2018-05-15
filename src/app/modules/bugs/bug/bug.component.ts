import { Component, OnInit } from "@angular/core";
import { Bug } from "../models/bugs.model";
import { BugsService } from "../bugs.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit {

  bug: Bug = {
    id: null,
    title: "",
    description: "",
    priority: 0
  };

  constructor(private service: BugsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.save(this.bug).subscribe(result => this.router.navigate(["bug-list"]));
    console.log(this.bug);
  }

  get statusIsInvalid () {
    return this.bug.reporter === "QA" && this.bug.status && this.bug.status.length === 0;
  }

}
