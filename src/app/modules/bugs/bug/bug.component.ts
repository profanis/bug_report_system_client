import { Component, OnInit } from "@angular/core";
import { Bug } from "../models/bugs.model";
import { BugsService } from "../bugs.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit {

  bugFormGroup: FormGroup;

  constructor(private service: BugsService, private router: Router) { }

  ngOnInit() {
    this.bugFormGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl(null),
      reporter: new FormControl(null),
      status: new FormControl(null)
    });

    const statusControl = this.bugFormGroup.get("status");

    this.bugFormGroup.get("reporter").valueChanges.subscribe((rep: string) => {
      if (rep === "QA" && statusControl.value === null) {
        statusControl.setValidators([Validators.required]);
      } else {
        statusControl.clearValidators();
      }
      statusControl.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.service.save(this.bugFormGroup.value)
      .subscribe(result => this.router.navigate(["bug-list"]));
  }

}
