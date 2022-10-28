import { MapContainer } from './../shared/components/map-container/map-container.component';
import { AdvertismentListElementComponent } from '../advertisment/advertisment-list-element/advertisment-list-element.component';
import { AdvertismentComponent } from './../advertisment/advertisment.component';
import { LoginCore } from './../login/core/index';
import { ProfileComponent } from './../profile/profile.component';
import { ConfigurationService } from '../shared/config/configuration.service';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from 'src/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileCore } from 'src/profile/core';
import { HashtagCore } from 'src/shared/hashtag';
import { MessageComponent } from 'src/message/message.component';
import { AdminComponent } from 'src/admin/admin.component';
import { AdvertismentCore } from 'src/advertisment/core';
import { MessageCore } from 'src/message/core';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { FooterComponent } from 'src/shared/components/footer/footer.component';
import { ConfirmAccComponent } from 'src/login/confirm-account/confirm-login/confirm-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    AdvertismentComponent,
    AdvertismentListElementComponent,
    MapContainer,
    MessageComponent,
    AdminComponent,
    ConfirmAccComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    ...LoginCore,
    ...ProfileCore,
    ...HashtagCore,
    ...AdvertismentCore,
    ...MessageCore,
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
