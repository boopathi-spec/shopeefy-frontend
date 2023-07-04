import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css'],
})
export class DeptComponent {
  username = localStorage.getItem('userName');
  password = localStorage.getItem('password');
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.showdept();
  }

  product1: boolean = true;

  deptlist: any[] = [];
  showdept() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    this.http
      .get<any[]>('http://localhost:8080/api/department/findProduct', {
        headers,
      })
      .subscribe((response) => {
        this.deptlist = response.filter((dept) => dept.deptName !== null);
        console.log('deptlist is', this.deptlist);
      });
  }

  redirect() {
    alert('You are now loggedOut');
    this.router.navigate(['/tohome']);
  }

  productlist() {
    this.product1 = false;
  }

  prolist: any[] = [];
  showProduct(dept: any) {
    this.prolist = dept.products;
    console.log(this.prolist);
    this.product1 = false;
  }
}
