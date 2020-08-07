import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/messages';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
  pageNumer = 1;
  pageSize = 5;
  messageContainer: 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private toaster: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
      return this.userService.getMessages(this.authService.decodedToken.nameid,
              this.pageNumer, this.pageSize, this.messageContainer).pipe(
        catchError(error => {
          this.toaster.error('Problem retrieving messages');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
    }

}
