import { Component } from '@angular/core';
import { AdventureService } from '../../services/adventure.service';
import { UserService } from 'src/app/services/user.service';
import { SettingService } from 'src/app/services/setting.service';
import { Adventures } from 'src/app/interfaces/adventures';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent {
  public selectedAdventure: string | null = null;

  constructor(
    public AdventureService: AdventureService,
    public SettingService: SettingService,
    public UserService: UserService,
    public ItemService: ItemService
  ) {
    this.AdventureService.getAdventures().subscribe();
  }

  public selectAdventure(adventure: Adventures, lvl: number): void {
    // check if user has enough xp to do the adventure
    if (lvl >= adventure.levelRequired) {
      this.selectedAdventure = adventure.name;
      this.AdventureService.setCurrentAdventure(adventure.name);
      return;
    }
    return;
  }
}
