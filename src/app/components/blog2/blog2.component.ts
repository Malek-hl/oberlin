import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog2',
  templateUrl: './blog2.component.html',
  styleUrls: ['./blog2.component.css']
})
export class Blog2Component implements OnInit {

  clients: any;
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.getAllUsers();
    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        console.log("Blog Users",response.users);        
        this.clients = (response.users).filter((obj) => {return (obj.role == "client" && obj.status == "confirmed")} );
      }
    )
  }

}
