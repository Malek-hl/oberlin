import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userUrl: string = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  // SIGNUP:
  signupAcc(user: any, img: File, cv: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("exp", user.exp);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("img", img);
    formData.append("cv", cv);
    formData.append("status", user.status)
    return this.httpClient.post<{ message: string, emailExist: boolean, user: any }>(`${this.userUrl}/signup`, formData);
  }

  signupAdmin(user: any, img: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("img", img);
    return this.httpClient.post<{ message: string, emailExist: boolean, user: any }>(`${this.userUrl}/signupAdmin`, formData);
  }

  signupClient(user: any, img: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("status", user.status);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("img", img);
    return this.httpClient.post<{ message: string, emailExist: boolean, user: any }>(`${this.userUrl}/signupClient`, formData);
  }

  // LOGIN:
  login(user: any) {
    return this.httpClient.post<{ msg: string,token: any, user: any }>(`${this.userUrl}/login`, user)
  }

  // Search User By ID:
  getUserById(id:any) {
    // const token = localStorage.getItem("connectedUserId")
   return this.httpClient.post<{ msg: string, user: any }>(`${this.userUrl}/userId`, {id: id});
  }

  getMyProfile() {
    const token = localStorage.getItem("connectedUserId")
   // const header =  { Authorization: `Bearer ${token}` } 
    return this.httpClient.post<{ msg: string, user: any }>(`${this.userUrl}/MyProfile`, {token: token});
  }
  
// Get All users
  getAllUsers(){
    return this.httpClient.get<{ users:any }>(this.userUrl);

  }

  // Confirm User By Admiin
  confirm(id){
    return this.httpClient.put<{ msg:any }>(`${this.userUrl}/confirm`, {id:id});
  }

    // Delete User By Admiin
  delete(id){
    return this.httpClient.put<{ msg:any }>(`${this.userUrl}/delete`, {id:id});
  }

  // Add Pub By Client:
  postPub(obj: any){
    return this.httpClient.post<{ msg:any }>(`${this.userUrl}/pub`, obj);
  }

  // Get Client Publication:
  getPubs(id){
    return this.httpClient.post<{ pubs:any }>(`${this.userUrl}/pubs`, {id:id});
  }

  // GEt All Pubs By Admins
  getAllPubs(){
    return this.httpClient.get<{ pubs:any }>(`${this.userUrl}/Allpubs`);
  }

  // Search for Accompagnant(@, ..<exp<..):
  searchAccompagnant(data:any){
    return this.httpClient.post<{accomps: any}>(`${this.userUrl}/searchAcc`, data)
  }

  // Confirm Pub by Admin:
  confirmPub(id){
    return this.httpClient.put<{ msg:any }>(`${this.userUrl}/confirmPub`, {id:id});
  }

  // Delete Pub By Admin:
  deletePub(id){
    return this.httpClient.put<{ msg:any }>(`${this.userUrl}/deletePub`, {id:id});
  }

  // Contact Client by Accompagnant:
  contactAccom(id){
    return this.httpClient.put(`${this.userUrl}/contactPub`, id)
  }

  // GEt Pub with the Client DAta
  getPubsClient(){
    return this.httpClient.get<{ users:any }>(`${this.userUrl}/pubsClient`);
  }

  // Show notication: Accomp interest in pub
  notification(obj){
    return this.httpClient.put<{ msg:any }>(`${this.userUrl}/notification`, obj);
  }

  // Client request to contact accom:
  request(obj){
    return this.httpClient.post<{ msg:any }>(`${this.userUrl}/request`, obj);
  }

  // Get Request to Accomp Profile
  getRequest(id){
    return this.httpClient.post<{ requests:any, msg:any }>(`${this.userUrl}/getRequest`,{id});
  }

}
