import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Dependent } from 'src/app/models/dependent';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @ViewChild('r') registerForm: NgForm;
  member: Member = new Member();
  dependent: Dependent = new Dependent();
  dependents = [{"memberId":"","dname":"","ddob":""},{"memberId":"","dname":"","ddob":""}];
  memNum = 0;
  submitted= false;
  loading = false;
  isButtonVisible = false;
  isRegButtonVisible = true;
  isUpdateLinkVisible=true;
  isRegLinkVisible=false;
  isRegH1Visible=true;
  isUpdateH1Visible=false;
  returnUrl: string;
  message='';
  todate: Date;
  cList = [{"country":"India","states":["Andhra Pradesh","Delhi","Karnataka","Kerala","Tamil Nadu"]},
           {"country":"USA","states":["Alaska","California","Hawaii","KC","Washigton"]},
           {"country":"Canada","states":["Alberta","Manitoba","Ontario","Yukon"]}];
  sList: any = [];
  dobYear: number;

  constructor(
    private auth: AuthService,
    private service: MemberService
  ) { }

  dispUpdateBtn(){    
    this.isButtonVisible=true;
    this.isRegButtonVisible=false;
    this.isRegLinkVisible=true;
    this.isUpdateLinkVisible=false;
    this.isUpdateH1Visible=true;
    this.isRegH1Visible=false;
    this.message="";
    this.registerForm.reset();
    // this.registerForm.controls.custName.disable();
    // this.registerForm.controls.country.disable();
    // this.registerForm.controls.email.disable();
  }

  dispRegBtn() {
    this.isButtonVisible=false;
    this.isRegButtonVisible=true;
    this.isUpdateLinkVisible=true;
    this.isRegLinkVisible=false;
    this.isUpdateH1Visible=false;
    this.isRegH1Visible=true;
    this.message="";
    this.registerForm.reset();
  }

  ngOnInit(): void {
    this.todate = new Date();
  }

  get f() { return this.registerForm.controls; }

  calculateAge(event: any){
    console.log("calculateAge()");
    if(this.member.dob){
      const tday = new Date();
      const dateOfBirth = new Date(this.member.dob);
      let result = tday.getFullYear() - dateOfBirth.getFullYear();
      const m = tday.getMonth() - dateOfBirth.getMonth();
      if(m < 0 || (m === 0 && tday.getDate() < dateOfBirth.getDate())){
        result--;
      }
      this.member.age = result; 
    } 
  }

  onSubmit(){
    this.submitted = true;

    // this.memNum = Math.floor(Math.random()*(999-100+1)+100);
    // this.member.memberId = "R-"+this.memNum;
    
    console.log(this.dependents);
    this.member.dependent = this.dependents;
    this.service.createMember(this.member).subscribe(data => {
      console.log(data);
      this.memNum = data.memberId;
      this.message="Member ID "+this.memNum+" got generated!!";
      this.member = new Member();
      this.registerForm.reset();
    }, error => {
      console.log(error);
  });
  }

  onUpdate(){
    console.log("onUpdate()");
    this.service.updateMember(this.member).subscribe(data => {
      console.log(data);
      this.member = new Member();      
      this.registerForm.reset();
    }, error => {
      console.log(error);
    });
  }

  findMember(){
    console.log("findMember()");
    this.service.getMember(this.member.memberId).subscribe((data: any) => {
      //console.log(JSON.stringify(data.dependent[0]));
      console.log("State 1: "+this.member.state);
      this.member.name = data.name;
      this.member.address = data.address;
      this.member.country = data.country;
      this.sList = [data.state];
      this.member.state = data.state;
      console.log("State 2: "+this.member.state);
      this.member.email = data.email;
      this.member.pan = data.pan;
      this.member.contactNum = data.contactNum;
      this.member.dob = data.dob;
      this.member.regDate = data.regDate;
      this.member.age = data.age;
      console.log(this.member.dependent);
      console.log("Data Dependent: "+data.dependent);
      for(let c of data.dependent){
        console.log("Depen ID: "+c.memberId);
        console.log("Depen name:"+c.dname);
        console.log("Depen dob: "+c.ddob);
      }
      this.dependents = data.dependent;
      console.log(this.dependents);
    })
    // this.service.getMember(this.member.memberId).subscribe((response:HttpResponse<Member>) => {
    //   console.log(response.body?.memberId);
    // });
  }

  logout() {
    //this.router.navigate(['/login']);
    this.auth.logout();
  }

  fetchStates(){
    console.log(this.member.country);
    var st = this.cList.filter(
      c => c.country == this.member.country
    );
    this.sList = st[0].states;
    console.log(this.sList);
  }
}
