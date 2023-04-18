import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserI } from '../../../../../first_project/src/models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  constructor(public userService: UserService){
    // userService.getUserByName("Biben");
  }


}
