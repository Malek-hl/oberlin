import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pub-table',
  templateUrl: './pub-table.component.html',
  styleUrls: ['./pub-table.component.css']
})
export class PubTableComponent implements OnInit {


  id: any;
  pubs: any = [];
  pageOfItems :Array<any>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.id = localStorage.getItem("connectedUserId"); console.log(this.id);
    
    this.getPubs(this.id);
  }

  // Get All Pubs of Client (id):
  getPubs(id) {
    this.userService.getPubs(id).subscribe(
      (response) => {
        console.log(response);
        this.pubs = response.pubs;
      }
    )
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  // buttonColor(x) {
  //   let result: any;
  //   if (x=="not confirmed") {
  //     result = ['btn btn-danger py-2 px-3 text-white', 0, 'waiting'];
  //   } else if (x=="confirmed") { result = ['btn btn-success py-2 px-3 text-white', 1, 'Confirmed']; }
    
  //   return result;
  //   }

}
