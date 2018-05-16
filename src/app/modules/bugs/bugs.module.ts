import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { BugsListComponent } from "./bugs-list/bugs-list.component";
import { BugsService } from "./bugs.service";
import { BugsResolvers } from "./resolvers/bugs.resolver";
import { AuthenticatedUsersGuard } from "../../shared/authenticated-users.guard";
import { UnfinishedChangesGuard } from "../../shared/unfinished-changes.guard";

const routes: Routes = [
  {
    path: "bugs-list",
    component: BugsListComponent,
    resolve: {
      bugs: BugsResolvers
    },
    canActivate: [AuthenticatedUsersGuard],
    canDeactivate: [UnfinishedChangesGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BugsListComponent],
  exports: [RouterModule],
  providers: [BugsService, BugsResolvers]
})
export class BugsModule { }
