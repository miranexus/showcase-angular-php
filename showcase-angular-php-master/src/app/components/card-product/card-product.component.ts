import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { ButtonDirective} from 'primeng/button';
import { Rating } from 'primeng/rating';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'mnx-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  imports: [Card, PrimeTemplate, NgIf, Rating, NgOptimizedImage, ButtonDirective, FormsModule]
})
export class CardProductComponent {
  image: string = 'assets/both/card-images/vape_card_01.png'; // Default image path
  title: string = 'Vape Card 01';
  description: string = 'Description for this product.';
}
