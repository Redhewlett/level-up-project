import { Component, Input } from '@angular/core';
import { Adventure } from 'src/app/interfaces/adventures';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent {
  @Input() public adventure: Adventure | null = null

  constructor() {}
}
