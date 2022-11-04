import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { InviteCodeInputComponent } from '../dialog/invite-code-input/invite-code-input.component';
import { LoginUsernameComponent } from '../dialog/login-username/login-username.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    var dialogRef = this.dialog.open(InviteCodeInputComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.authService.GoogleAuth().then((val) => {
        console.log(val);
      });
    })
  }

  loginUsername() {
    var dialogRef = this.dialog.open(LoginUsernameComponent)
  }

}
