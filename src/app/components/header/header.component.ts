import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelpDialogComponent } from '../dialog/help-dialog/help-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEmmit: EventEmitter<any> = new EventEmitter();
  username: string = "";
  photoUrl: string = "";

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.photoUrl = this.authService.getPhotoProfile();

    console.log("username: " + this.username + " photo url: " + this.photoUrl);
  }

  toggleSidebar(): void {
    this.toggleSidebarEmmit.emit();
  }

  logout(): void {
    if(this.authService.getLoginWith() == "google") {
      this.authService.logout().then((value) => {
        console.log(value);
        if(value == true) {
          this.authService.removeLoggedInData();
          this.router.navigate(['/']);
        }
      })
    } else {
      this.authService.removeLoggedInData();
      this.router.navigate(['/'])
    }
  }

  showHelpDialog() {
    this.dialog.open(HelpDialogComponent, {
      width: '100%',
    })
  }

}
