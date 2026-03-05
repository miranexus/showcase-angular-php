import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  selector: 'mnx-banner-step',
  templateUrl: './banner-step.component.html',
  styleUrls: ['./banner-step.component.scss'],
  imports: [NgOptimizedImage, Carousel, PrimeTemplate],
  encapsulation: ViewEncapsulation.None
})
export class BannerStepComponent {
  images = [
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_one_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_two_desktop.png',
    '/angular/showcase-angular-php/assets/desktop/banner-images/vape_banner_three_desktop.png'
  ];
  mobileImages = [
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_one_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_two_mobile.png',
    '/angular/showcase-angular-php/assets/mobile/banner-images/vape_banner_three_mobile.png'
  ];

  get isMobile() {
    return window.innerWidth <= 700;
  }

  get currentImages() {
    return this.isMobile ? this.mobileImages : this.images;
  }
}
