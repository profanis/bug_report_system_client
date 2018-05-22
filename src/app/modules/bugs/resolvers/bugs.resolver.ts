import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";


import { Bug } from "../models/bugs.model";
import { BugsService } from "./../bugs.service";
import { Pageable } from "../pageable.mapper";

@Injectable()
export class BugsResolvers implements Resolve<Pageable<Bug>> {

  constructor(private bugsService: BugsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Pageable<Bug> | Observable<Pageable<Bug>> | Promise<Pageable<Bug>> {
    return this.bugsService.get(null, null);
  }
}
