import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedUser: any = null;
  username: string = '';
  password: string = '';
  content: string = '';
  isOpenModal: boolean = false;
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      this.isLoggedUser = user;
    }
    this.getPosts();
  }

  getPosts() {
    if (this.isLoggedUser) {
      const { token } = this.isLoggedUser;
      this.postService.getPosts(token).subscribe((posts) => {
        console.log(posts);
        this.posts = posts;
      });
    }
  }

  loginUser() {
    console.log(this.username, this.password);
    if (!this.isLoggedUser && this.username && this.password) {
      this.authService
        .loginUser({ username: this.username, password: this.password })
        .subscribe((user) => {
          console.log(user);
          window.localStorage.setItem('loggedUser', JSON.stringify(user));
          this.isLoggedUser = user;
          this.getPosts();
        });
    }
  }

  logoutUser() {
    if (this.isLoggedUser) {
      this.isLoggedUser = null;
      window.localStorage.removeItem('loggedUser');
    }
  }

  createPost() {
    console.log(this.content);
    if (this.content && this.isLoggedUser) {
      const { token } = this.isLoggedUser;
      this.postService
        .createPost(token, { content: this.content })
        .subscribe((savedPost) => {
          console.log(savedPost);
          this.closeModal();
        });
    }
  }

  openModal() {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
