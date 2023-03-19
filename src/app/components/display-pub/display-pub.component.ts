import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-display-pub',
  templateUrl: './display-pub.component.html',
  styleUrls: ['./display-pub.component.css']
})
export class DisplayPubComponent implements OnInit {

  id: any;
  pub: any = [];
  // client: any;
  formTitle = "Publications"
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.getPubsClient();
  }

  // Get all Pubs with client data:
  getPubsClient() {
    this.id = localStorage.getItem("connectedUserId");
    this.userService.getPubsClient().subscribe(
      (res) => {
        console.log("Pubs with Client data", res.users);
        this.pub = res.users;
      }
    )
  };

  contact(p) {
    Swal.fire({
      title: `Title: ${p.title}`,
      html: `Description: ${p.description}<br> 
          Email: ${p.client[0].email} <br> 
          Adress: ${p.client[0].adress}`,
      imageUrl: p.client[0].avatar,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonText: 'Apply',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Pub ID",p._id);
        
        this.userService.notification({_id:p._id, accompReq: 'not available' }).subscribe(
          (response) => {
            console.log("here notif", response);
          }
        )
      }
    })
  };

  // Get Client data by Id:
  // clientData(id){
  //   this.userService.getUserById(id).subscribe(
  //     (res)=> {
  //       this.client = res.user;
  //     }
  //   );
  // }



}
