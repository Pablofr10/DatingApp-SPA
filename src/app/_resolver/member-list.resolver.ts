import { Injectable } from "@angular/core";
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{
  constructor(private userService: UserService,
    private router: Router, private toaster: ToastrService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
      return this.userService.getUsers().pipe(
        catchError(error => {
          this.toaster.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
    }

}
