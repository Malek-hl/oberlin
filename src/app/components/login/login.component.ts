import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailError: any = "";
  user: any = {};
  userExist: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        userName: ["", [Validators.required]],
        pwd: ["", [Validators.required]],
      }
    )
  }

  login() {
    console.log(this.loginForm.value.userName);
    console.log(isNaN(this.loginForm.value.userName));
    if (isNaN(this.loginForm.value.userName)) {
      let email = this.loginForm.value.userName;
      delete this.loginForm.value.userName;
      this.loginForm.value.email = email;
    } else {
      let tel = Number(this.loginForm.value.userName);
      delete this.loginForm.value.userName;
      this.loginForm.value.tel = tel;
    }
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("Here response:", response);
        console.log("Here Token:", response.token);
        if (response.msg != "2") {
          this.emailError = "Please check ur email/pwd";
        } else {
          localStorage.setItem("connectedUserId", response.token);

          if (response.user.role == "admin") {
            this.router.navigate(["admin"]);
          } else if (response.user.role == "accompagnant") {
            this.router.navigate([""]);
          } else { this.router.navigate([""]); }
        }
      }
    )


  }

}
