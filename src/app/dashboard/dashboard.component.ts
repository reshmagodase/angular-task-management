import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userlist:any=[];
id:any;
userform:any=[];
username:any;
email:any;
searchText:any='';
submitted:boolean=false;
 constructor( private serviceobj:HttpserviceService ,private fb:FormBuilder , private router:Router) { }

  ngOnInit(): void {
   this.getuser();

   this.userform= this.fb.group({
    username:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
  })
  }
  get f(){return this.userform.controls}
  getuser(){
    this.serviceobj.getuserdata().subscribe((res:any) =>{
      this.userlist=res;

  })
  }
  delete(id:any){
    this.serviceobj.deletedata(id).subscribe((res:any) =>{
      console.log("data deleted");
      this.getuser();
    },(error) =>{
      console.error('Error deleting data:', error);
    })
  }

  setdata(user:any){
    this.id=user.id;
    this.userform.controls['username'].setValue(user.username);
    this.userform.controls['email'].setValue(user.email)

  }
  updatedata(){
    this.serviceobj.updatadata(this.userform.value,this.id).subscribe((res:any) =>{
      alert("record updated successfully");
      this.getuser();
    })
  }


  adddata(){
    if(this.userform.Invalid){
      return
    }
    else{
      this.serviceobj.adddata(this.userform.value).subscribe((res:any) =>{
        alert("add data successfully");
        let ref=document.getElementById('cancle');
        ref?.click();
        this.userform.reset();
        this.getuser();
      })
    }
  
}
  viewdata(user:any){
    this.id=user.id;
    this.username=user.username;
    this.email=user.email
  }

  search(){
    if(this.searchText == ''){
      this.ngOnInit();
    }
    this.userlist=this.userlist.filter((res:any)=>{
      return JSON.stringify(res).toLowerCase().includes(this.searchText.toLowerCase());
    })
  }

  //  openModal(content: any) {
  //   this.modalService.open(content);
  // }

  // // Method to close the Bootstrap modal
  // closeModal() {
  //   this.modalService.dismissAll();
  // }
}
