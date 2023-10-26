import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

import { TokenResponse } from "#shared/models/tokenResponse.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private accessToken: string | null = null;
  private expirationDate: Date | null = null;

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<TokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `grant_type=client_credentials&client_id=${environment.clientId}&client_secret=${environment.clientSecret}`;

    return this.http.post<TokenResponse>(this.tokenEndpoint, body, { headers: headers }).pipe(
      tap((tokenResponse: TokenResponse) => {
        this.accessToken = tokenResponse.access_token;
        localStorage.setItem('accessToken', this.accessToken);
        this.expirationDate = new Date(new Date().getTime() + tokenResponse.expires_in * 1000);
        localStorage.setItem('tokenExpiration', this.expirationDate.toString());
      })
    );
  }

  getAccessTokenSync(): string | null {
    const storedToken = localStorage.getItem('accessToken');
    const storedExpiration = new Date(localStorage.getItem('tokenExpiration') || '');
    if (storedToken && storedExpiration && new Date() < storedExpiration) {
      return storedToken;
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiration');
    return null;
  }
}
