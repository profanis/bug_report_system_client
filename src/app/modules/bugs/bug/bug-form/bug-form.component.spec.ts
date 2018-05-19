import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { BugFormComponent } from "./bug-form.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { CommonModule } from "@angular/common";

fdescribe("BugFormComponent", () => {
  let component: BugFormComponent;
  let fixture: ComponentFixture<BugFormComponent>;
  let titleController: FormControl;
  let descriptionController: FormControl;
  let priorityController: FormControl;
  let reporterController: FormControl;
  let statusController: FormControl;

  const defaultBugObject = {
    id: null,
    title: null,
    description: null,
    priority: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugFormComponent ],
      imports: [ReactiveFormsModule, CommonModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugFormComponent);
    component = fixture.componentInstance;

    component.buildForm(defaultBugObject);

    titleController = component.bugFormGroup.get("title") as FormControl;
    descriptionController = component.bugFormGroup.get("description") as FormControl;
    priorityController = component.bugFormGroup.get("priority") as FormControl;
    reporterController = component.bugFormGroup.get("reporter") as FormControl;
    statusController = component.bugFormGroup.get("status") as FormControl;
  });

  it("form should be invalid", () => {
    expect(component.bugFormGroup.valid).toBeFalsy();
  });

  it("form should be valid with minimum required fields", () => {

    expect(titleController.valid).toBeFalsy();
    titleController.setValue("Test value");
    expect(titleController.valid).toBeTruthy();

    expect(descriptionController.valid).toBeFalsy();
    descriptionController.setValue("Test description value");
    expect(descriptionController.valid).toBeTruthy();

    expect(component.bugFormGroup.valid).toBeTruthy();
  });

  it("Form should be invalid if reporter is QA", () => {
    titleController.setValue("Test value");
    descriptionController.setValue("Test description value");
    reporterController.setValue("QA");
    expect(component.bugFormGroup.valid).toBeFalsy();
  });

  it("Form should be valid if reporter is QA and has status passed in", () => {
    titleController.setValue("Test value");
    descriptionController.setValue("Test description value");
    reporterController.setValue("QA");
    statusController.setValue("Done");
    expect(component.bugFormGroup.valid).toBeTruthy();
  });

  it("The custom 'valid' property should be FALSE if form is not VALID", () => {
    titleController.setValue("Test value");
    descriptionController.setValue("Test description value");
    expect(component.valid).toBeTruthy();
  });

});
