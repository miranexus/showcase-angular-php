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
  cards = [
    {
      image: 'assets/both/card-images/azure_mist_product_ocean-breeze_description.png',
      title: 'Azure Mist',
      description: 'Ocean Breeze'
    },
    {
      image: 'assets/both/card-images/eau_de_lyis_product_golden_honey_description.png',
      title: 'Eau de Lyis',
      description: 'Golden Honey'
    },
    {
      image: 'assets/both/card-images/eau_de_lyis_product_vanilla_and_peach_description.png',
      title: 'Eau de Lyis',
      description: 'Vanilla and Peach'
    },
    {
      image: 'assets/both/card-images/eau_de_nuit_product_nocturnal_essense_description.png',
      title: 'Eau de Nuit',
      description: 'Nocturnal Essense'
    },
    {
      image: 'assets/both/card-images/eau_de_rose_product_rose_blossom_description.png',
      title: 'Eau de Rose',
      description: 'Rose Blossom'
    },
    {
      image: 'assets/both/card-images/eau_de_verre_product_citrus_blossom_description.png',
      title: 'Eau de Verre',
      description: 'Citrus Blossom'
    },
    {
      image: 'assets/both/card-images/etheral_bloom_product_citrus-and_jasmine_description.png',
      title: 'Etheral Bloom',
      description: 'Citrus and Jasmine'
    }
  ];

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
