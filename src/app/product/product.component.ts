import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  username = localStorage.getItem('userName');
  password = localStorage.getItem('password');

  updateproductName: string = '';
  updatebrand: string = '';
  updateprice: number = 0;
  updatedepartmentName: string = '';

  productName: string = '';
  brand: string = '';
  price: number = 0;
  departmentName: string = '';
  currentProductName: String = '';
  deleteValue: number = 1;
  currentProductId: number = 0;
  currentProductBrand: string = '';
  currentProductDeptName: string = '';
  currentProductPrice: number = 0;
  constructor(private http: HttpClient, private router: Router) {}

  //headers

  ngOnInit(): void {
    this.productlistfunc();
  }
  onproductcreate() {
    let products = {
      productName: this.productName,
      productBrand: this.brand,
      productPrice: this.price,
      deleteItem: this.deleteValue,
      deptName: this.departmentName,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );

    this.http
      .post('http://localhost:8080/api/postProduct/add', products, { headers })
      .subscribe((resultdata: any) => {
        console.log(resultdata);
        alert('Product Registred Successfully');
        this.productName = '';
        this.brand = '';
        this.price = 0;
        this.departmentName = '';
        this.deleteValue = 1;
      });
  }
  productlist: any[] = [];

  productlistfunc() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );

    this.http
      .get<any[]>('http://localhost:8080/api/postProduct/productlist', {
        headers,
      })
      .subscribe((response) => {
        this.productlist = response;
        if (response === null) {
          alert('productlist is null');
        }
        console.log(response);
        console.log(this.productlist);
      });
  }

  redirect() {
    let confirm = window.confirm('Want to logout?');
    if (confirm) {
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      alert('You are now loggedOut');
      this.router.navigate(['/tohome']);
    }
  }

  //UpdateProduct
  updateProductName(product: any) {
    this.currentProductName = product.productName;
    this.currentProductId = product.productId;
    this.currentProductBrand = product.productBrand;
    this.currentProductPrice = product.productPrice;
    this.currentProductDeptName = product.deptName;
    console.log('productId is :', this.currentProductId);
  }

  updateProduct() {
    this.updateproductName = this.currentProductName as string;
    this.updatebrand = this.currentProductBrand;
    this.updateprice = this.currentProductPrice;
    this.updatedepartmentName = this.currentProductDeptName;
    let data = {
      productId: this.currentProductId,
      productName: this.updateproductName,
      productBrand: this.updatebrand,
      productPrice: this.updateprice,
      deleteItem: this.deleteValue,
      deptName: this.updatedepartmentName,
    };
    console.log(this.currentProductName);
    console.log(this.currentProductName);
    console.log(this.updateproductName);
    console.log(data);

    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    this.http
      .post(
        'http://localhost:8080/api/postProduct/' + this.currentProductId,
        data,
        { headers }
      )
      .subscribe((Response) => {
        alert('product update succesfully');
      });
  }

  //deleteProduct
  productdata: any = {};
  deleteProductName: string = '';
  deleteProductId: number = 0;
  deleteProduct(product: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    this.deleteProductName = product.productName;
    this.deleteProductId = product.productId;
    this.deleteValue = 0;

    console.log(this.deleteProductName);
    this.http
      .delete(
        'http://localhost:8080/api/postProduct/delete/' + this.deleteProductId,
        { headers }
      )
      .subscribe((response) => {
        console.log(response);
        alert('Product Deleted Successfully');
        this.productName = '';
        this.brand = '';
        this.price = 0;
        this.departmentName = '';
        this.deleteValue = 1;
      });
  }
}
