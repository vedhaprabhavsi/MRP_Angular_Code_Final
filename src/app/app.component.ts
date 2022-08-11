import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'member-reg-portal';
  currentUser: User;

    constructor(private router: Router,
      private auth: AuthService) { 
        this.auth.currentUser.subscribe(x => this.currentUser = x);
      }

      logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
