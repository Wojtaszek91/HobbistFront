import { ConfigurationService } from '../../shared/config/configuration.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginCredentials } from "src/models/loginCredentials.model";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private readonly configService: ConfigurationService) { }

  loginUser(loginCredentials: LoginCredentials) {
    return this.http.post(`${this.configService.jwt_base_url}/auth/authenticate`, { Email: loginCredentials.email, Password: loginCredentials.password });
  }

  registerUser(loginCredentials: LoginCredentials) {
    return this.http.post(`${this.configService.jwt_base_url}/auth/register`, { Email: loginCredentials.email, Password: loginCredentials.password });
  }

  confirmAccount(email: string, activationId: string) {
    return this.http.post(`${this.configService.jwt_base_url}/auth/ActivateAccountConfirm?userEmail=${email}&activationId=${activationId}`, {})
  }
}
