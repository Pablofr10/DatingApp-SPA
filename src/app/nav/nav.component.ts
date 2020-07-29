import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(x => {
      this.toastr.success('Logged successful');
    }, err => {
      this.toastr.error('Failed to login');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('logged out');
    this.router.navigate(['/home']);
  }
}
