import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any = [];
  user: any;
  pageOfItems: Array<any>;
  @Input() role: any;
  constructor(private router: Router, 
              private userService: UserService,) { }

  ngOnInit() {
    this.getAllUsers();
  }


  goToDisplay(id) {
    this.router.navigate([`userInfo/${id}`]);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users;
      }
    )
  }

  confirm(id){
    this.userService.confirm(id).subscribe(
      (response)=>{
        console.log(response.msg);
        this.getAllUsers();
      }
    )
  }


  delete(id){
    this.userService.delete(id).subscribe(
      (response)=>{
        console.log(response.msg);
        this.getAllUsers();        
      }
    )
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
