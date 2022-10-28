import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  get gateway_base_url() {
    return environment.GW_BASE_URL;
  }

  get communication_base_url() {
    return environment.COMMUNICATION_BASE_URL;
  }

  get jwt_base_url() {
    return environment.JWT_BASE_URL;
  }

  get map_base_url() {
    return environment.MAP_BASE_URL;
  }

  get isProd() {
    return environment.production;
  }
}
