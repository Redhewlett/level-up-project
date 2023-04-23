import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public userService: UserService,
    public SettingService: SettingService
  ) {}
}
