import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NavigationModule } from "./navigation/navigation.module";
import { CustomHttpInterceptor } from "./custom-http-interceptor";


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
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ]
})
export class CoreModule { }
