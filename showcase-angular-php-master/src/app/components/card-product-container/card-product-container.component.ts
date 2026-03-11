import { Component, Input } from '@angular/core';
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
  @Input() cards: any[] = [];
  @Input() responsiveOptions: any[] = [
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
      numVisible: 2,
      numScroll: 1
    }
  ];
}
