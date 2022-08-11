import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('l') loginForm: NgForm;
  user: User = new User();
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  userIDs: string[];
  creds: string[];
  isLoginMode = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private service: UserService
  ) {
    if (this.auth.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.service.login(this.user.username, this.user.password).subscribe(
      data => {
        const respText = "Error during Login for client: "+this.user.username;
        if(data.response == respText){
          console.log("Error");
          this.error ="You have entered the incorrect credentials";
          this.router.navigate(['/login']);
        }
        else{
          console.log(data);
          this.auth.setToken(data.response);
          // localStorage.setToken('token',data.response);
          this.router.navigate(['/register']);
          this.loginForm.reset();
        }        
      }, err => {
        console.log("Error: "+err);
        this.router.navigate(['/login']);
      }
    );

  }
}
