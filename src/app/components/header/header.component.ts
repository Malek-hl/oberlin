import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userFirstName: string;
  userLastName: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    // let id= localStorage.getItem("connectedUserId");
    // this.userService.getUserById(id).subscribe(
    //     (response) => {
    //       console.log("Here response:", response);
    //       if (response.msg != "2") {
    //         this.userFirstName = "";
    //       } else {
    //         this.userFirstName=response.user.firstName; console.log(this.userFirstName);
    //         this.userLastName=response.user.lastName;
    //       }
    //     }
    //   ); console.log(this.userFirstName);
      
  }

  logOut(){
    localStorage.removeItem("connectedUserId");
    this.router.navigate([""]);
  }

}
