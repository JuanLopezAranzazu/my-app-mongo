import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private api = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getPosts(token: string) {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer ' + token,
    });
    const path = `${this.api}/posts/`;
    return this.http.get<any[]>(path, { headers });
  }

  createPost(token: string, dataForPost: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + token,
    });
    const path = `${this.api}/posts/`;
    return this.http.post<any>(path, dataForPost, { headers });
  }
}
