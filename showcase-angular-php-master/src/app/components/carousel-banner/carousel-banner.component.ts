import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { StorefrontService } from '../../services/storefront.service';

@Component({
  standalone: true,
  selector: 'mnx-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss'],
  imports: [NgOptimizedImage, Carousel, PrimeTemplate],
  encapsulation: ViewEncapsulation.None
})
export class CarouselBannerComponent {
  readonly storefront = inject(StorefrontService);
  images = [
    '/angular/showcase-angular-php/assets/desktop/banner-images/perfume_banner_ad_02_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/perfume_banner_ad_01_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/perfume_banner_ad_03_desktop.png'
  ];
  mobileImages = [
    '/angular/showcase-angular-php/assets/mobile/banner-images/perfume_banner_ad_02_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/perfume_banner_ad_01_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/perfume_banner_ad_03_mobile.png'
  ];

  get isMobile() {
    return window.innerWidth <= 700;
  }

  get currentImages() {
    return this.isMobile ? this.mobileImages : this.images;
  }
}
