import { Component, OnInit } from "@angular/core";
import { Bug } from "../models/bugs.model";
import { BugsService } from "../bugs.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit {

  bugFormGroup: FormGroup;

  constructor(private service: BugsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { bug: Bug}) => {
      this.buildForm(data.bug);
    });

  }

  private buildForm(bug: Bug) {
    this.bugFormGroup = new FormGroup({
      id: new FormControl(bug.id),
      title: new FormControl(bug.title, Validators.required),
      description: new FormControl(bug.description, Validators.required),
      priority: new FormControl(bug.priority),
      reporter: new FormControl(bug.reporter),
      status: new FormControl(bug.status)
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
    const methodToInvoke = this.bugFormGroup.value.id
      ? this.service.update(this.bugFormGroup.value.id, this.bugFormGroup.value)
      : this.service.save(this.bugFormGroup.value);

      methodToInvoke
        .subscribe(result => this.router.navigate(["bugs-list"]));
  }
}
