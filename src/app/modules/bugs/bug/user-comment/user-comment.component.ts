import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { UserComments } from "../../models/user-comments.model";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-user-comment",
  templateUrl: "./user-comment.component.html",
  styleUrls: ["./user-comment.component.css"]
})
export class UserCommentComponent implements OnInit, OnDestroy {

  formSubscription: Subscription;
  @Input() userComments: UserComments[];
  public valid$ = new Subject<boolean>();
  commentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();

    this.formSubscription = this.commentForm.valueChanges.subscribe(formData => {
      const hasUnsubmittedData = Object.values(formData).filter(c => !!c);
      this.valid$.next(!hasUnsubmittedData.length);
    });
  }

  private buildForm() {
    this.commentForm = new FormGroup({
      reporter: new FormControl(),
      description: new FormControl()
    });
  }

  addComment({value}: {value}) {
    this.userComments = [...(this.userComments || []) , value];
    this.clearForm();
  }

  private clearForm() {
    this.commentForm.setValue({
      reporter: null,
      description: null
    });
  }

  public getComments() {
    return this.userComments;
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

}
