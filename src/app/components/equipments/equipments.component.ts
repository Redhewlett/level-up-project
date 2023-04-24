import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})


export class EquipmentsComponent {

  isShown: boolean = false; // hidden by default

  constructor(public userService: UserService, public EquipmentService: EquipmentService) {}

  toggleShow() {
    this.isShown = !this.isShown
  }

}
