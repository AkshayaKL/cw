import { Component, OnInit } from '@angular/core';
import {GetUserFromDatabaseService} from '../get-user-from-database.service';
import {user} from '../userinfo';
import {FooterComponent} from '../footer/footer.component';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {


  userdetails1 = this.getuser.dataofsignedinuser;
 
  
     constructor(public getuser:GetUserFromDatabaseService){ }

  ngOnInit() {
  }

}
