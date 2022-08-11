import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claim.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-submit-claim',
  templateUrl: './submit-claim.component.html',
  styleUrls: ['./submit-claim.component.css']
})

export class SubmitClaimComponent implements OnInit {
  @ViewChild('c') submitForm: NgForm;
  claim: Claim = new Claim();
  claimNum = 0;
  
  submitted = false;
  loading = false;
  todate: Date;
  //admissionDate: Date;
  returnUrl: string;
  message = '';

  constructor(
    private auth: AuthService,
    private service: ClaimService
  ) { }

  ngOnInit(): void {
    this.todate = new Date();
  }

  get f() { return this.submitForm.controls; }

  onSubmit() {
    this.submitted = true;

      this.service.submitClaim(this.claim).subscribe(data => {
        console.log(data);
        this.claimNum = data.claimId;
        this.message="Claim # " +this.claimNum+" generated successfully!!";
        this.claim = new Claim();
        this.submitForm.reset();
      },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.auth.logout();
  }

  compareDoA(){
    const doaDate = this.claim.doa;
    const dodDate = this.claim.dod;
    return doaDate < dodDate;
  }

  getMemberDetails(){
      console.log("getMemberDetails()");
      this.service.getMemberDetails(this.claim.memberId).subscribe(data => {
          console.log(data);
          var names = data.name;
          console.log(names);
          var splitted = names.split(" ");
          console.log(splitted);
          this.claim.fName = splitted[0];
          this.claim.lName = splitted[1];
          this.claim.dob = data.dob;
      },err => {
        this.claim.fName = "";
          this.claim.lName = "";
          this.claim.dob = new Date(0);
      }
      );
  }
}