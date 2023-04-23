import { Component, OnInit } from '@angular/core';
import { UserStats } from 'src/app/interfaces/users';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { AdventureService } from 'src/app/services/adventure.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent implements OnInit {
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
    public UserService: UserService,
    public ItemService: ItemService,
    public AdventureService: AdventureService
  ) {}

  ngOnInit(): void {
    this.calculateStats();
  }

  private calculateStats() {
    this.ItemService.currentItems.forEach((item) => {
      const itemStatName = Object.keys(item.stat);

      const newValue =
        this._userStats[itemStatName[0] as keyof UserStats] +
        item.stat[itemStatName[0]];
        this._userStats={...this._userStats , [itemStatName[0]]: newValue}
    });
  }
}
