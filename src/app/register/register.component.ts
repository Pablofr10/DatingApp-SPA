import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(() => {
      this.toastr.success('registration successful');
    }, err => {
      this.toastr.error(err);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.toastr.error('cancelled');
  }

}
