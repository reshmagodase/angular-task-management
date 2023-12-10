import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  private url="http://localhost:3000/posts/";

  constructor(private http:HttpClient) { }
  
  postuserdata(username:any, password:any) : Observable<any>{
    console.log("inservice",username)
    return this.http.get("http://localhost:3000/posts/", {params: {username,password}}).pipe(
      map((users:any) => users.length > 0)
    );
  }

  getuserdata() : Observable<any>{
    // console.log(data)
    return this.http.get(this.url)
  }

  deletedata(id:any) : Observable<any>{
    // console.log(data)
    return this.http.delete(this.url+id)
  }

  updatadata(data:any, id:any) : Observable<any>{
    // console.log(data)
    return this.http.put(this.url +id,data)
  }

  adddata(data:any) : Observable<any>{
    // console.log(data)
    return this.http.post(this.url,data)
  }
}
