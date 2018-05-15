import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { BugsListComponent } from "./bugs-list/bugs-list.component";
import { BugsService } from "./bugs.service";
import { BugsResolvers } from "./resolvers/bugs.resolver";
import { BugComponent } from "./bug/bug.component";

const routes: Routes = [
  {
    path: "bugs-list",
    component: BugsListComponent,
    // resolve: {
    //   bugs: BugsResolvers
    // }
  },
  {
    path: "bug",
    component: BugComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BugsListComponent, BugComponent],
  exports: [RouterModule],
  providers: [BugsService, BugsResolvers]
})
export class BugsModule { }
