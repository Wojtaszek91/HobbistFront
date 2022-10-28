import { ConfirmAccComponent } from '../login/confirm-account/confirm-login/confirm-account.component';
import { Component } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdvertismentComponent } from './../advertisment/advertisment.component';
import { ProfileComponent } from './../profile/profile.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginComponent } from 'src/login/login.component';
import { MessageComponent } from 'src/message/message.component';
import { AdminComponent } from 'src/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "confirm-account",
    component: ConfirmAccComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [],
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'advertisment',
    canActivate: [AuthGuard],
    component: AdvertismentComponent,
    pathMatch: 'full'
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    component: MessageComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


