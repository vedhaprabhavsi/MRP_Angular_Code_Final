import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl: string = "http://ec2-3-139-56-134.us-east-2.compute.amazonaws.com:7492/members/"

  member = new Member();

  constructor(private http: HttpClient) { }

  createMember(member: Member): Observable<any> {
    console.log("Calling Java createMember method");
    return this.http.post(this.baseUrl+"register",member);
  }

  updateMember(member: Member): Observable<any> {
    console.log("Calling Java updateMember method");
    return this.http.post(this.baseUrl+"updateMember",member);
  }

  getMember(memberId: string): Observable<any> {
    console.log("Calling Java getMember method");
    // this.http.get<Member>("http://ltin343723.cts.com:7481/members/getMember/{memberId}").subscribe(
    //   response => {
    //     this.member = response;
    //   }
    // );
    return this.http.get<any>(this.baseUrl+"getMember/"+memberId);
  }
}
