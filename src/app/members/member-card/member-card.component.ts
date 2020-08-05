import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authSevice: AuthService, private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  sendLike(id: number){
    this.userService.sendLike(this.authSevice.decodedToken.nameid, id).subscribe(data => {
      this.toastr.success('You have liked: ' + this.user.knownAs);
    }, err => {
      this.toastr.error(err);
    });
  }

}
