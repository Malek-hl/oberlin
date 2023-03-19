import { DisplayPubComponent } from './components/display-pub/display-pub.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccompagnantComponent } from './components/accompagnant/accompagnant.component';
import { ClientComponent } from './components/client/client.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "signupAdmin", component: SignupComponent},
  {path: "signupClient", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "accompagnant", component: AccompagnantComponent},
  {path: "client", component: ClientComponent},
  {path: "userInfo", component: UserInfoComponent},
  {path: "displayPubs", component: DisplayPubComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
