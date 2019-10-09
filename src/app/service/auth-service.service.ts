import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  public postLogin(data :any){
      let requestData = {
        userId: data.userId,
        password: data.password
      };
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'});
      let options = { headers: headers };
      return this.httpClient.post("http://localhost:3000/login", requestData, options);
  }

  public postSignUp(data :any){
    let requestData = {
      firstName: data.firstName,
      lastName: data.lastName,
      userId: data.userId,
      password: data.password
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this.httpClient.post("http://localhost:3000/signup", requestData, options);
}

public postlogOut(data :any){
  let requestData = {
    userId: data.userId
    };
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'});
  let options = { headers: headers };
  return this.httpClient.post("http://localhost:3000/logout", requestData, options);
}

}
