import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  id: any;
  userInput: any;
  constructor( private activatedRouter: ActivatedRoute,
    private userService: UserService,) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get("x"); console.log(this.id);
    this.userService.getUserById(this.id).subscribe(
      (response) => {
        this.userInput = response.user;
      }
    );
  }
  
}
