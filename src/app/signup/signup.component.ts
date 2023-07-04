import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  username:String="";
  email:String="";
  password:string="";
  roles: string="ROLE_USER";
  constructor(private http:HttpClient,private router : Router){}

  save(){
    
    this. register();
    this.router.navigate(['/registertologin']);
   }

   register(){
    if(this.username&& this.password&&this.username.trim() !== '' && this.password.trim() !== ''){
     let data={
       "userName" : this.username,
       "email" : this.email,
       "password" : this.password,
       "roles" :this.roles
      }
      console.log(data)
      this.http.post("http://localhost:8080/api/userAdd/add",data)
      .subscribe((resultdata:any)=>
      {
       console.log(resultdata);
       alert(" Registred Successfully");
       this.username="";
       this.email="";
       this.password=""
      }
     
      );}else{
        this.router.navigate([SignupComponent])
        alert("All the Feilds are mandatory")
        
      }
   }


}
