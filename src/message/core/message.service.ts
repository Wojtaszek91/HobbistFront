import { ConfigurationService } from 'src/shared/config/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigurationService
  ) { }

  getMessagesAtLogin(profileId: string) {
    console.log(this.configService.communication_base_url);
    return this.httpClient.get(`${this.configService.communication_base_url}/Communication/GetUserAllMessageBoxes?profileId=${profileId}`);
  }
}
