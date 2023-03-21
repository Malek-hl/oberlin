import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: any= {};
  id: any;
  editForm: FormGroup;
  formTitle="Edit..." ;
  imagePreview:any;
  cvPreview:any;
  constructor(private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get("id");
    
    this.editForm = this.formBuilder.group({
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
    }
    );
    this.userService.getUserById(this.id).subscribe(
      (response) => {
        this.user = response.user;
        // console.log("Userr", this.user);
        this.editForm.patchValue(this.user);
      }
    );
  }

  edit(){
    console.log(this.editForm);
    let user = this.editForm.value;
    user._id = this.id; console.log("User To Back", user);
    this.userService.editUser(user).subscribe(
      (res)=>{
        console.log(res);
      }
    );
  }
  onImageSelected(event: Event) {
    //recuperation et l'ajout de l'image au formulaire
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ img: file });
    this.editForm.updateValueAndValidity();
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
      this.editForm.patchValue({ cv: file });
      this.editForm.updateValueAndValidity();
      // afficher CV ds html
      const reader = new FileReader();      
      reader.onload = () => {
      this.cvPreview = reader.result as string
      };
      reader.readAsDataURL(file);
      }  

}
