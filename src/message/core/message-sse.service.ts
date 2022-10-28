import { ProfileFacade } from 'src/profile/core/profile.facade';
import { Injectable } from "@angular/core";
import { ConfigurationService } from "src/shared/config/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class MessageSseService {

  constructor(
    private readonly configService: ConfigurationService
  ) { }

  getEventSource(profileId: string): EventSource {
    const url = `${this.configService.gateway_base_url}/api/Communication/OnlineMessageSubscribe?profileId=${profileId}`;
    return new EventSource(url);
  }
}
