import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  deleteProduct(id:number){
    return this.http.get<any>("http://")
  }
}
