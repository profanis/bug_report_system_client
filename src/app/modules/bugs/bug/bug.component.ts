import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { Bug } from "../models/bugs.model";
import { BugsService } from "../bugs.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserCommentComponent } from "./user-comment/user-comment.component";
import { Subscription } from "rxjs/Subscription";
import { BugFormComponent } from "./bug-form/bug-form.component";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit, AfterViewInit, OnDestroy {

  commentStatusSubscription: Subscription;
  // bugFormGroup: FormGroup;
  isEditMode: boolean;
  bug: Bug;
  commentsFormValid = true;
  @ViewChild(UserCommentComponent) userCommentComponent;
  @ViewChild(BugFormComponent) bugFormComponent;


  constructor(private service: BugsService,
              private router: Router,
              private route: ActivatedRoute) { }

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
