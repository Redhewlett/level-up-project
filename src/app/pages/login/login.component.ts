import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private title: Title,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    const user = window.localStorage.getItem('user');
    this.title.setTitle('LevelUp | Login');
    if (user) {
      this.authService.user = JSON.parse(user);
    }
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const data: { email: string; password: string } =
      this.loginForm.getRawValue() as { email: string; password: string };
  }

  public login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<User[]>('http://localhost:3000/login', { email, password })
      .pipe(
        map((user: User[]) => {
          return user[0];
        })
      );
  }
}
