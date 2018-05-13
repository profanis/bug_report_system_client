import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "./../../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent],
  exports: [RouterModule]
})
export class DashboardModule { }
