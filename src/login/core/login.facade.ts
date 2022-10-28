import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { LoginCredentials } from "src/models/loginCredentials.model";
import { User } from "src/models/user.model";
import { ProfileFacade } from "src/profile/core/profile.facade";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  errorMessage: BehaviorSubject<string> = new BehaviorSubject('');
  messageType: BehaviorSubject<string> = new BehaviorSubject('');
  isLogin = true;
  subscriptions: Subscription[] = [];

  constructor(private readonly loginService: LoginService, private router: Router) {

  }

  loginUser(credentials: LoginCredentials) {
    this.subscriptions.push(this.loginService.loginUser(credentials).subscribe({
      next: (response) => {
        const user = response as User;
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('expirationDate', user.tokenExpirationDate);
        sessionStorage.setItem('profileId', user.profileId);
        this.router.navigate(['/profile'], { state: { isOwner: true, profileId: '' }, });
      },
      error: (_) => {
        this.errorMessage.next('Nie udało się zalogować');
        this.messageType.next('Error');
      }
    }))
  }

  registerUser(credentials: LoginCredentials) {
    this.subscriptions.push(this.loginService.registerUser(credentials).subscribe({
      next: (_) => {
        this.errorMessage.next('Użytkownik Zarejestrowany');
        this.messageType.next('Success');
      },
      error: (_) => {
        this.errorMessage.next('Nie udało się Zarejestrować');
        this.messageType.next('Error');
      },
    }))
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationDate');
    sessionStorage.removeItem('profileId');
    this.router.navigate(['/login']);
  }

  switchIsLogin() {
    this.isLogin = !this.isLogin;
  }

  unsubscribeAll() {
    this.subscriptions.forEach((s) => {
      s ? s.unsubscribe() : null;
    })
  }
}
