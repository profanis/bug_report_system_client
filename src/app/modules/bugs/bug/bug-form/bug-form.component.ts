import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Bug } from "../../models/bugs.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-bug-form",
  templateUrl: "./bug-form.component.html",
  styleUrls: ["./bug-form.component.css"],
  exportAs: "bugForm"
})
export class BugFormComponent implements OnChanges {

  @Input() bug: Bug;
  bugFormGroup: FormGroup;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm(this.bug);
  }

  buildForm(bug: Bug) {
    this.bugFormGroup = new FormGroup({
      id: new FormControl(bug.id),
      title: new FormControl(bug.title, Validators.required),
      description: new FormControl(bug.description, Validators.required),
      priority: new FormControl(bug.priority),
      reporter: new FormControl(bug.reporter),
      status: new FormControl(bug.status)
    });

    this.statusConditionalValidation();


    this.bugFormGroup.updateValueAndValidity();
  }

  private statusConditionalValidation() {
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

  getBugFormValues() {
    return this.bugFormGroup.value;
  }

}
