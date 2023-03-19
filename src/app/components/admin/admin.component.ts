import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: any ={};
  pubs: any;
  pageOfItems :Array<any>;
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getAllPubs();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllPubs(){
    this.userService.getAllPubs().subscribe(
     (res)=>{
      this.pubs = res.pubs;
     });
  }

  // Confirm Pub
  confirm(id){
    this.userService.confirmPub(id).subscribe(
      (response)=>{
        console.log(response.msg);
        this.getAllPubs();
      }
    )
  }

  // DElete Pub
  delete(id){
    this.userService.deletePub(id).subscribe(
      (response)=>{
        console.log(response.msg);
        this.getAllPubs();        
      }
    )
  }

  profile(id){
    this.router.navigate([`userInfo/${id}`]);
  }
}
