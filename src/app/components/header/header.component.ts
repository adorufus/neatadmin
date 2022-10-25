import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEmmit: EventEmitter<any> = new EventEmitter();
  username: string = "";
  photoUrl: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.photoUrl = this.authService.getPhotoProfile();

    console.log("username: " + this.username + " photo url: " + this.photoUrl);
  }

  toggleSidebar(): void {
    this.toggleSidebarEmmit.emit();
  }

  logout(): void {
    this.authService.logout().then((value) => {
      console.log(value);
      if(value == true) {
        this.authService.removeLoggedInData();
        this.router.navigate(['/']);
      }
    })
  }

}
