import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform:any=FormGroup;
submitted:boolean=false;
isAuthenticated:boolean=false;
  constructor(private fb:FormBuilder , private serviceobj:HttpserviceService , private router:Router) { }

  ngOnInit(): void {
    // localStorage.setItem('isAuthenticated','false');
    this.loginform= this.fb.group({
    username:['' , Validators.required],
    password:['' , Validators.required],
  })
  }
  get f(){return this.loginform.controls}
  onSubmit(){
    this.submitted=true
    if(this.loginform.Invalid){
      return
    }else{
    console.log(this.loginform.value);
      this.serviceobj.postuserdata(this.loginform.value.username, this.loginform.value.password).subscribe((response:boolean) =>{
        console.log("response ss :",response);
        if (response) {
          this.isAuthenticated=response
          console.log("Login successful!" , this.isAuthenticated);
          localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
          this.router.navigate(['/dashboard']); 

        } else {
          alert("Invalid username and Password");
          console.log("Login failed!");
        }
      }
       )
      }
  }
}
