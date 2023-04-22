import { Component } from '@angular/core';
import { UserStats } from 'src/app/interfaces/users';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent {
  private _userStats: UserStats = {
    attaque: 100,
    defense: 100,
    critRate: 10,
    critDamage: 10,
    hP: 1000,
  };

  public get userStats(): UserStats {
    return this._userStats;
  }

  public set userStats(value: UserStats) {
    this._userStats = value;
  }

  constructor(
    private UserService: UserService,
    public ItemService: ItemService
  ) {}
}
