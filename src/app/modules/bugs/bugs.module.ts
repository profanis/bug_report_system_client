import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { BugsListComponent } from "./bugs-list/bugs-list.component";
import { BugsService } from "./bugs.service";
import { BugsResolvers } from "./resolvers/bugs.resolver";
import { AuthenticatedUsersGuard } from "../../shared/authenticated-users.guard";
import { UnfinishedChangesGuard } from "../../shared/unfinished-changes.guard";
import { BugComponent } from "./bug/bug.component";
import { BugResolver } from "./resolvers/bug.resolver";

const routes: Routes = [
  {
    path: "bugs-list",
    component: BugsListComponent,
    canActivate: [AuthenticatedUsersGuard],
    canDeactivate: [UnfinishedChangesGuard],
    resolve: {
      bugs: BugsResolvers
    }
  },
  {
    path: "bug",
    component: BugComponent,
    data: {
      bug: {
      }
    }
  },
  {
    path: "bug/:id",
    component: BugComponent,
    resolve: {
      bug: BugResolver
    }
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BugsListComponent, BugComponent],
  exports: [RouterModule],
  providers: [BugsService, BugsResolvers, BugResolver]
})
export class BugsModule { }
