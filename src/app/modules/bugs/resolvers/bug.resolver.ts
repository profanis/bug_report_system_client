import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bug } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";

@Injectable()
export class BugResolver implements Resolve<Bug> {

  constructor(private bugsService: BugsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Bug | Observable<Bug> | Promise<Bug> {
    const id = route.params["id"];
    if (!id) {
      return null;
    }
    return this.bugsService.getById(id);
  }
}
