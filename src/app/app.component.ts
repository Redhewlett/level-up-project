import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { SettingService } from './services/setting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public SettingService: SettingService
  ) {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.userService.getUsers().subscribe();
    this.SettingService.getSettings().subscribe();
  }
}
