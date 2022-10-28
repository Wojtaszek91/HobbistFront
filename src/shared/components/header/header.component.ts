import { LoginFacade } from 'src/login/core/login.facade';
import { Router } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private readonly router: Router, private readonly loginFacade: LoginFacade) { }

  logout() {
    this.loginFacade.logoutUser();
  }

  redirectToProfile() {
    this.router.navigate(['/profile'], { state: { isOwner: true, profileId: '' }, });
  }
}
