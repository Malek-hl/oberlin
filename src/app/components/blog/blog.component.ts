import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  clients: any;
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.getAllUsers();
    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        console.log("Blog Users",response.users);        
        this.clients = (response.users).filter((obj) => {return (obj.role == "accompagnant" && obj.status == "confirmed")} );
      }
    )
  }

}
