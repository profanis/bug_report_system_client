import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  envName: string;

  constructor() { }

  ngOnInit() {
    this.envName = environment.nameOfTheEnvironment;
  }

}
