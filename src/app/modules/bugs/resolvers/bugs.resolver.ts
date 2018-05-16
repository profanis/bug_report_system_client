import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Bugs } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";

@Injectable()
export class BugsResolvers implements Resolve<Bugs[]> {

  constructor(private bugsService: BugsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Bugs[] | Observable<Bugs[]> | Promise<Bugs[]> {
    return this.bugsService.get(null, null);
  }
}
