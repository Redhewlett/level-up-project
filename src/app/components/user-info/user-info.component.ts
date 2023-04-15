import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  public lvl: number = 0;
  public xpLeftToNextLvl: number = 0;

  constructor(
    public userService: UserService,
    public SettingService: SettingService
  ) {
    if (this.userService.currentUser) {
      this.lvl = this.SettingService.computeLevel(
        this.userService.currentUser.xp
      );
      this.xpLeftToNextLvl = this.SettingService.computeXpNeeded(
        this.userService.currentUser.xp
      );
    }
  }
}
