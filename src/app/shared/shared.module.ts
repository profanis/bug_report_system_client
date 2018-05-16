import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthenticatedUsersGuard } from "./authenticated-users.guard";
import { UnfinishedChangesGuard } from "./unfinished-changes.guard";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [],
  providers: [AuthenticatedUsersGuard, UnfinishedChangesGuard]
})
export class SharedModule { }
