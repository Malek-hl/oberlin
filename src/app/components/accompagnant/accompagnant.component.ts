import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accompagnant',
  templateUrl: './accompagnant.component.html',
  styleUrls: ['./accompagnant.component.css']
})
export class AccompagnantComponent implements OnInit {

  data: any = {};
  userId: any;
  req: any =[]; msg: any;
  pageOfItems: Array<any>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("connectedUserId");
    this.getData(this.userId);
    this.getRequest(this.userId);
  }


  // Search Acc DATA:
   // Search Client data= profile
   getData(id) {
    this.userService.getUserById(id).subscribe(
      (res) => { this.data = res.user }
    )
  }

  // Get Request from Clients
  getRequest(id){
    this.userService.getRequest(id).subscribe(
      (res)=>{
        console.log("Client of request", res.requests);
        
        if (res.msg) {
          this.msg = res.msg;          
        } else{ this.req = res.requests }      
      }
    )
  };


  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
