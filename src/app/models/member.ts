import { Dependent } from "./dependent";

export class Member {
    memberId: string;
    name: string;
	address:string; 
	country: string;
	state: string;
	email: string;
	pan: string;
	contactNum: number;
	dob: Date;
	regDate: Date;
	age: number;
	dependent: Dependent[]; 
}