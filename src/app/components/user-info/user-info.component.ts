import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  public userLvl = 1;
  public userXpPourcent = 0;
  public userXpNeeded = 0;

  constructor(
    public userService: UserService,
    public SettingService: SettingService
  ) {
    this.userService.getUsers().subscribe();
    this.SettingService.getSettings().subscribe();
  }
}
