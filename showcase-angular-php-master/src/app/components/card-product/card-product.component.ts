import {Component, Input, inject} from '@angular/core';
import { Card } from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import { CurrencyPipe, NgOptimizedImage} from '@angular/common';
import { ButtonDirective} from 'primeng/button';
import { Rating } from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import { Product } from '../../models/product.model';
import { StorefrontService } from '../../services/storefront.service';

@Component({
  standalone: true,
  selector: 'mnx-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  imports: [Card, PrimeTemplate, Rating, NgOptimizedImage, CurrencyPipe, ButtonDirective, FormsModule]
})
export class CardProductComponent {
  readonly storefront = inject(StorefrontService);
  @Input() product?: Product;
  @Input() image?: string;
  @Input() title!: string;
  @Input() description?: string;
  @Input() showActions: boolean = true;
  @Input() url?: string;
}
