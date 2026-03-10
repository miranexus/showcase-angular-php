import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  standalone: true,
  selector: 'mnx-card-product-container',
  templateUrl: './card-product-container.component.html',
  styleUrls: ['./card-product-container.component.scss'],
  imports: [CarouselModule, CardProductComponent]
})
export class CardProductContainerComponent implements OnChanges {
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
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnChanges(changes: SimpleChanges) {
    // No-op, but required for Angular to detect @Input changes
  }
}
