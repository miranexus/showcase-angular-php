import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectionDropdownComponent } from '../dropdown-direction/direction-dropdown.component';
import {BookingDropdownComponent} from '../dropdown-booking/booking-dropdown.component';


@Component({
  standalone: true,
  selector: 'skyscanner',
  imports: [
    FormsModule,
    DirectionDropdownComponent,
    BookingDropdownComponent,
  ],
  templateUrl: './skyscanner.component.html',
  styleUrl: './skyscanner.component.scss'
})
export class SkyscannerComponent {
}
