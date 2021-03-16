import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AppComponent } from './app.component';
import { AdminGuard } from './auth/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  {path:"", component: DisplayComponent},
  {path:"add", component: AddEditComponent},
  {path: "edit/:id", component: AddEditComponent},
  {path: "login", component: LoginComponent, canActivate: [AdminGuard]},
  {path: "signup", component: SignupComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
