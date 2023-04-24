import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Adventure } from 'src/app/interfaces/adventures';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public adventures: Adventure[] = [];

  constructor(
    public userService: UserService,
    private title: Title,
    private api: ApiService
  ) {
    this.title.setTitle('LevelUp | Home');

    this.api.getList<Adventure[]>('aventures').subscribe((aventures) => {
      this.adventures = aventures;
    });
  }
}
