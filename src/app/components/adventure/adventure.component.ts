import { Component } from '@angular/core';
import { AdventureService } from '../../services/adventure.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent {
  public selectedAdventure: string | null = null;

  constructor(
    public AdventureService: AdventureService,
    public UserService: UserService
  ) {
    this.AdventureService.getAdventures().subscribe();
  }
}
