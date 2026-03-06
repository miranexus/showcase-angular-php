import { Component, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'mnx-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss'],
  imports: [NgOptimizedImage, Carousel, PrimeTemplate],
  encapsulation: ViewEncapsulation.None
})
export class CarouselBannerComponent {
  images = [
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_01_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_02_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_03_desktop.png'
  ];
  mobileImages = [
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_01_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_02_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_03_mobile.png'
  ];

  get isMobile() {
    return window.innerWidth <= 700;
  }

  get currentImages() {
    return this.isMobile ? this.mobileImages : this.images;
  }
}

