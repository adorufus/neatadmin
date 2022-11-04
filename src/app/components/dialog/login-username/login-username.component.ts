import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.scss']
})
export class LoginUsernameComponent implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginUsernameComponent>, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  send() {
    this.authService.UsernameAuth(this.username, this.password).then(result => {
      this.dialogRef.close()
    })
  }

}
