import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { BugsModule } from "./modules/bugs/bugs.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BugsModule,
    DashboardModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
