import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  standalone: true,
  selector: 'mnx-card-product-container',
  templateUrl: './card-product-container.component.html',
  styleUrls: ['./card-product-container.component.scss'],
  imports: [CarouselModule, CardProductComponent]
})
export class CardProductContainerComponent {
  images = [
    'assets/both/card-images/vape_card_01.png',
    'assets/both/card-images/vape_card_02.png',
    'assets/both/card-images/vape_card_03.png',
    'assets/both/card-images/vape_card_04.png',
    'assets/both/card-images/vape_card_05.png',
    'assets/both/card-images/vape_card_06.png',
    'assets/both/card-images/vape_card_07.png',
  ];

  cards = this.images.map((img, i) => ({
    image: img,
    title: `Product ${i+1}`,
    description: `Description for product ${i+1}`
  }));

  responsiveOptions = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '900px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
