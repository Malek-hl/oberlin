import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  path: string;
  emailExist: boolean = false;
  formTitle: string ;
  id: any;
  imagePreview:any;
  cvPreview:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.path = this.router.url;
    // this.id = this.activatedRoute.snapshot.paramMap.get("id");
    // if (this.id) {
    //   this.userService.getUserById(this.id).subscribe((data) => {
    //     console.log('here is the user', data.user);
    //     this.signupForm.patchValue(data.user);
    //   })
    //   this.formTitle = "Edit User";
    // }
    console.log("here form title",this.path);
    if (this.path=="/signup") {
      this.formTitle= "Signup Accompagnant"
      this.signupForm = this.formBuilder.group({
        firstName: ["", [Validators .required, Validators.minLength(3), Validators.maxLength(20)]],
        lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ["", [Validators.required, Validators.email]],
        tel: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$:;#^'"²§/,=+/!%*?&])/)]],
        confirmPwd: ["",[Validators.required]],
        exp: ["", [Validators.required,Validators.min(0), Validators.max(25)]],  
        adress:["",[Validators.required]],
        img:[""],
        cv:[""],
        role: "accompagnant",
        status: "Not Confirmed"
      },
        {
          validator: [MustMatch('pwd', 'confirmPwd')]
        }
      );
      
    } else if(this.path=="/signupAdmin"){
      this.formTitle= "Signup Admin";
      this.signupForm = this.formBuilder.group({
        firstName: ["", [Validators .required, Validators.minLength(3), Validators.maxLength(20)]],
        lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ["", [Validators.required, Validators.email]],
        tel: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$:;#^'"²§/,=+/!%*?&])/)]],
        confirmPwd: ["",[Validators.required]],
        adress:["",[Validators.required]],
        img:[""],
        role:"admin",
      },
        {
          validator: [MustMatch('pwd', 'confirmPwd')]
        }
      );
     
    } else {
      this.formTitle= "Signup Client";
      this.signupForm = this.formBuilder.group({
        firstName: ["", [Validators .required, Validators.minLength(3), Validators.maxLength(20)]],
        lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ["", [Validators.required, Validators.email]],
        tel: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$:;#^'"²§/,=+/!%*?&])/)]],
        confirmPwd: ["",[Validators.required]],
        adress:["",[Validators.required]],
        img:[""],
        status: "Not Confirmed",
        role:"client"
      },
        {
          validator: [MustMatch('pwd', 'confirmPwd')]
        }
      );
    }
    
    
  }
  signup(){
    // let role = (this.path == "/signupAdmin") ? "admin" : "user";
    // this.signupForm.value.role = role;
    if (this.path=="/signup") {
      this.userService.signupAcc(this.signupForm.value,this.signupForm.value.img,this.signupForm.value.cv).subscribe(
        (response) => {
          if (response.emailExist) {
            this.emailExist = response.emailExist;
          } 
          else {
            localStorage.setItem("connectedUserId", response.user);
            this.router.navigate([""]);
          }
        });
      
    } else if(this.path=="/signupAdmin") {
      this.userService.signupAdmin(this.signupForm.value,this.signupForm.value.img).subscribe(
        (response) => {
          if (response.emailExist) {
            this.emailExist = response.emailExist;
          } 
          else {
            localStorage.setItem("connectedUserId", response.user);
            this.router.navigate(["admin"]);
          }
        });
      
    }else{
      console.log(this.signupForm.value);
      
      this.userService.signupClient(this.signupForm.value,this.signupForm.value.img).subscribe(
        (response) => {
          if (response.emailExist) {
            this.emailExist = response.emailExist;
          } 
          else {
            console.log(response.user);
            localStorage.setItem("connectedUserId", response.user);
            this.router.navigate([""]);
          }
        });
    }
  }
  onImageSelected(event: Event) {
    //recuperation et l'ajout de l'image au formulaire
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    //afficher l'image ds html
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

    onCvSelected(event: Event) {
      //recuperation et l'ajout du CV au formulaire
      const file = (event.target as HTMLInputElement).files[0];
      this.signupForm.patchValue({ cv: file });
      this.signupForm.updateValueAndValidity();
      // afficher CV ds html
      const reader = new FileReader();      
      reader.onload = () => {
      this.cvPreview = reader.result as string
      };
      reader.readAsDataURL(file);
      }  

}
