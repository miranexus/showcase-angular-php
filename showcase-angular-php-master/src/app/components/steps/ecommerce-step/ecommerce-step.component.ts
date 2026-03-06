import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { CarouselBannerComponent } from '../../carousel-banner/carousel-banner.component';
import { ToolbarHeaderComponent } from '../../toolbar-header/toolbar-header.component';
import {CardProductComponent} from '../../card-product/card-product.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  selector: 'mnx-ecommerce-step',
  templateUrl: './ecommerce-step.component.html',
  styleUrls: ['./ecommerce-step.component.scss'],
  imports: [CarouselBannerComponent, ToolbarHeaderComponent, CardProductComponent],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceStepComponent {
  // Placeholder – all carousel/banner logic lives in CarouselBannerComponent
}
