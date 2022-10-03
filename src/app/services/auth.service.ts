import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  loginUser(credentials: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const path = `${this.api}/auth/`;
    return this.http.post<any>(path, credentials, { headers });
  }
}
