import { LoginService } from '../../core/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccComponent implements OnInit {
  email: string = "";
  activationId: string = "";


  constructor(private route: ActivatedRoute, private readonly loginService: LoginService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.email = params.email;
        this.activationId = params.activationId;
      }
      );
  }

  onConfirm() {
    let sub = this.loginService.confirmAccount(this.email, this.activationId).subscribe();
    console.log(this.email);
    console.log(this.activationId);

    sub.unsubscribe();
  }
}
