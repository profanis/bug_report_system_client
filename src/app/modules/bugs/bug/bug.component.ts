import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { BugsService } from "../bugs.service";
import { Bug } from "../models/bugs.model";
import { BaseComponent } from "./../../../shared/base.component";
import { BugFormComponent } from "./bug-form/bug-form.component";
import { UserCommentComponent } from "./user-comment/user-comment.component";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements BaseComponent, OnInit, AfterViewInit, OnDestroy {

  commentStatusSubscription: Subscription;
  isEditMode: boolean;
  bug: Bug;
  commentsFormValid = true;
  @ViewChild(UserCommentComponent) userCommentComponent;
  @ViewChild(BugFormComponent) bugFormComponent;


  constructor(private service: BugsService,
              private router: Router,
              private route: ActivatedRoute) { }

  canDeactivate = () => {
    return !this.bugFormComponent.bugFormGroup.touched &&
          ( !this.userCommentComponent || !this.userCommentComponent.commentForm.touched);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { bug: Bug}) => {
      this.isEditMode = !!data.bug.id;
      this.bug = data.bug;
    });

  }

  ngAfterViewInit(): void {
    if (this.userCommentComponent) {
      this.commentStatusSubscription = this.userCommentComponent.valid$.subscribe(commentFormStatus => {
        this.commentsFormValid = commentFormStatus;
      });
    }
  }

  onSubmit() {
    let modelToSubmit = this.bugFormComponent.getBugFormValues();
    if (this.userCommentComponent) {
      modelToSubmit = {...modelToSubmit, comments: this.userCommentComponent.getComments()};
    }

    const methodToInvoke = modelToSubmit.id
      ? this.service.update(modelToSubmit.id, modelToSubmit)
      : this.service.save(modelToSubmit);

      methodToInvoke
        .subscribe(result => this.router.navigate(["bugs-list"]));
  }

  ngOnDestroy(): void {
    if (this.commentStatusSubscription) {
      this.commentStatusSubscription.unsubscribe();
    }
  }
}
