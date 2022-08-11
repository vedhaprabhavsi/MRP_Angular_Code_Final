import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  submitClaim(claim: Claim): Observable<any> {
    console.log("Calling Java submit()");
    return this.http.post("http://ec2-13-58-175-201.us-east-2.compute.amazonaws.com:4891/claims/submit",claim);
  }

  getMemberDetails(memberId: string): Observable<any>{
    console.log("Calling Member from Claim page");
    return this.http.get<any>("http://ec2-3-139-56-134.us-east-2.compute.amazonaws.com:7492/members/getMember/"+memberId);
  }
}
