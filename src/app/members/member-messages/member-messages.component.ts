import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { Message } from './../../_models/messages';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserid = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        for (const message of messages) {
          if (message.isRead === false && message.recipientId === currentUserid){
            this.userService.maskAsRead(currentUserid, message.id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, err => {
      this.toastr.error(err);
    });
  }

  sendMessage(){
    debugger
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, err => {
      this.toastr.error(err);
    });
  }
}
