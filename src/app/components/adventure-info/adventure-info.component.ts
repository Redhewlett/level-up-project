import { Component } from '@angular/core';
import { AdventureService } from 'src/app/services/adventure.service';
@Component({
  selector: 'app-adventure-info',
  templateUrl: './adventure-info.component.html',
  styleUrls: ['./adventure-info.component.scss'],
})
export class AdventureInfoComponent {
  constructor(public AdventureService: AdventureService) {}
}
