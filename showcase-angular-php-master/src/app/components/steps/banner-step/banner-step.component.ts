import { Component, Injectable } from '@angular/core';
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
  imports: [NgOptimizedImage, Carousel, PrimeTemplate]
})
export class BannerStepComponent {
  images = [
    '/angular/showcase-angular-php/assets/banner-images/vape_banner_one.png',
    '/angular/showcase-angular-php/assets/banner-images/vape_banner_two.png',
    '/angular/showcase-angular-php/assets/banner-images/vape_banner_three.png'
  ];
}
