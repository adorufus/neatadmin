import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidebarOpen: boolean = true;

  constructor(public authGuard: AuthGuard) {}

  title = 'neatadmin';

  sidebarToggler() {
    console.log(this.authGuard.isLoggedIn())
    this.sidebarOpen = !this.sidebarOpen;
  }
}
