import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisterComponent } from './components/register/register.component';
import { SubmitClaimComponent } from './components/submit-claim/submit-claim.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupSuccessComponent } from './components/signup-success/signup-success/signup-success.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "submit",
    component: SubmitClaimComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "signup-success",
    component: SignupSuccessComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);