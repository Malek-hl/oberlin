import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  
  userId: any;
  accp: any=[];
  pubForm: FormGroup;
  searchForm: FormGroup;
  pub: any = {};
  search: any = {};
  data: any = {};
  pageOfItems: Array<any>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("connectedUserId");
    this.getData(this.userId);
  }


// Add Publication:
  add() {
    this.pub.idClient = this.userId;
    this.userService.postPub(this.pub).subscribe((res) => {
      console.log(res.msg);

    });
    console.log(this.pub);
  }

  // Search Client data= profile
  getData(id) {
    this.userService.getUserById(id).subscribe(
      (res) => { this.data = res.user }
    )
  }
  // Search
  searchAccompagnat(){
    console.log(this.search);
    this.userService.searchAccompagnant(this.search).subscribe(
      (res)=>{
        this.accp = res.accomps;
        console.log(res.accomps);
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
