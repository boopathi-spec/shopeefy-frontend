import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';
import { DeptComponent } from './dept/dept.component';
import { authguardGuard } from './authguard.guard';

const routes: Routes = [
 {path:'',component:SigninComponent },
 {path:'LoginToRegister',component:SignupComponent},
{path:'dashboard',component:NavbarComponent,canActivate:[authguardGuard]},
{path:'registertologin',component:SigninComponent,canActivate:[authguardGuard]},
{path:'productlist',component:ProductComponent,canActivate:[authguardGuard]},
{path:'departmentlist',component:DeptComponent,canActivate:[authguardGuard]},
{path:'',component:SigninComponent,},
{path:'toHome',component:NavbarComponent,canActivate:[authguardGuard]},
{path:'tohome',component:SigninComponent,canActivate:[authguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
