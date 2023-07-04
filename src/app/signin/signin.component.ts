import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  userName: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {}
  userlist: any[] = [];
  submit() {
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('password', this.password);
    console.log(this.userName);
    console.log(this.password);

    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.userName + ':' + this.password)
    );

    this.http
      .post<any>(
        'http://localhost:8080/api/userAdd/loginCheck',
        {},
        { headers }
      )
      .pipe(
        catchError((error) => {
          const statusCode = error.status;
          if (statusCode === 401 || statusCode === 403) {
            alert('Invalid Credentials!');
          }

          if (statusCode === 200) {
            localStorage.setItem('token', '1');
            alert('You are Successfully logged in');
            this.router.navigate(['/dashboard']);
          }else{
            localStorage.setItem('token', '0');
          }

          return throwError(error);
        })
      )
      .subscribe((response: any) => {});
  }
}
