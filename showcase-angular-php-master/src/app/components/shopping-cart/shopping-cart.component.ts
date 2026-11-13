import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CurrencyPipe } from '@angular/common';
import { StorefrontService } from '../../services/storefront.service';

@Component({
  selector: 'mnx-shopping-cart',
  standalone: true,
  imports: [DialogModule, CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  readonly store = inject(StorefrontService);
  visible = false;
}
