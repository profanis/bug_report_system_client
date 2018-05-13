import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NavigationModule } from "./navigation/navigation.module";


@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    NavigationModule,
    HttpClientModule
  ],
  declarations: []
})
export class CoreModule { }
