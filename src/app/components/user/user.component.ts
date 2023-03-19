import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  clientId: any;
  clientPub: any=[];
  @Input() userInfo: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.clientId= localStorage.getItem("connectedUserId");
    // this.getClientPub(this.userInfo._id)
  }

  // Contacter Un client By accompagnant:
  contact(id){
    this.userService.contactAccom(id).subscribe( );
  }

  // Get all Pub of Client:
  // getClientPub(id){
  //   this.userService.getPubs(id).subscribe(
  //     (res)=>{
  //       this.clientPub= res.pubs;
  //       console.log("Clients Pub",this.clientPub); 
  //       console.log(this.clientPub[0].title);
        
  //     }
  //   )
  // }

  // Funtion Create request accomp from Client
  clientReq(id){
    Swal.fire(`Contact: ${this.userInfo.firstName} ${this.userInfo.lastName} ?`).then(
      (res)=>{
        if (res.isConfirmed) {
          console.log("ACCom ID",this.userInfo._id);
          this.userService.request({accompId: id, clientId: this.clientId , accompResp: 'request' }).subscribe(
            // (response) => {
            //   console.log("here notif", response);
            // }
          )
        }
      }
      )
  }
}
