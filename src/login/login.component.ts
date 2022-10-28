import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { LoginFacade } from './core/login.facade';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin: boolean = this.facade.isLogin;
  message = this.facade.errorMessage;
  messageType = this.facade.messageType;

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  constructor(private readonly facade: LoginFacade) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.facade.unsubscribeAll();
  }

  switchLoginRegistration() {
    this.isLogin = !this.isLogin;
  }

  loginRegistrationClickHandler() {
    this.isLogin
      ? this.loginUser()
      : this.registerUser();
  }

  loginUser() {
    this.facade.loginUser({ email: this.email?.value, password: this.password?.value });
  }

  registerUser() {
    this.facade.registerUser({ email: this.email?.value, password: this.password?.value });
  }
}
