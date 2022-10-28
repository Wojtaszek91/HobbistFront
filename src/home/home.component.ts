import { Router } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  templateUrl: './home.component.html',
  selector: 'home',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) { }

  onConfirm() {
    localStorage.setItem('isFirstTime', 'false');
    this.router.navigate(['/login']);
  }
}
