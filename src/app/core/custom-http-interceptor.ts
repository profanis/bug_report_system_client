import {
        HttpInterceptor,
        HttpSentEvent,
        HttpHeaderResponse,
        HttpProgressEvent,
        HttpUserEvent,
        HttpHandler,
        HttpRequest,
        HttpResponse,
        HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

export class CustomHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
                                                       HttpHeaderResponse |
                                                       HttpProgressEvent |
                                                       HttpResponse<any> |
                                                       HttpUserEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: "Token"
      }
    });

    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 200) {
              console.log("HTTP status code =  200");
            }
          }
          return event;
        }),
        catchError((err: any, caught: Observable<any>) => {
          console.log(err);
          return Observable.throw(err);
        })
      );
  }
}

