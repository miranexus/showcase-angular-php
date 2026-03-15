import { Select } from 'primeng/select';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';


@Component({
  standalone: true,
  selector: 'direction-dropdown',
  imports: [
    Select,
    NgClass,
    FormsModule,
    PrimeTemplate,
  ],
  templateUrl: './direction-dropdown.component.html',
  styleUrl: './direction-dropdown.component.scss'
})
export class DirectionDropdownComponent {

  direction = [
    { name: 'One way',},
    { name: 'Return' }
  ];

  selectedDirection = this.direction[1];

}
