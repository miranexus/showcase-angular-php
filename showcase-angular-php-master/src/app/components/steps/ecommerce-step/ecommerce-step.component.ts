import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { CarouselBannerComponent } from '../../carousel-banner/carousel-banner.component';
import { CardProductContainerComponent } from '../../card-product-container/card-product-container.component';
import {ToolbarFooterComponent} from '../../toolbar-footer/toolbar-footer.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  selector: 'mnx-ecommerce-step',
  templateUrl: './ecommerce-step.component.html',
  styleUrls: ['./ecommerce-step.component.scss'],
  imports: [CarouselBannerComponent, CardProductContainerComponent, ToolbarFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceStepComponent {
  perfumeCards = [
    {
      image: 'assets/both/card-images-perfume/azure_mist_product_ocean-breeze_description.png',
      title: 'Azure Mist',
      description: 'Ocean Breeze'
    },
    {
      image: 'assets/both/card-images-perfume/eau_de_lyis_product_golden_honey_description.png',
      title: 'Eau de Lyis',
      description: 'Golden Honey'
    },
    {
      image: 'assets/both/card-images-perfume/eau_de_lyis_product_vanilla_and_peach_description.png',
      title: 'Eau de Lyis',
      description: 'Vanilla & Peach'
    },
    {
      image: 'assets/both/card-images-perfume/eau_de_nuit_product_nocturnal_essense_description.png',
      title: 'Eau de Nuit',
      description: 'Nocturnal Essence'
    },
    {
      image: 'assets/both/card-images-perfume/eau_de_rose_product_rose_blossom_description.png',
      title: 'Eau de Rose',
      description: 'Rose Blossom'
    },
    {
      image: 'assets/both/card-images-perfume/eau_de_verre_product_citrus_blossom_description.png',
      title: 'Eau de Verre',
      description: 'Citrus Blossom'
    },
    {
      image: 'assets/both/card-images-perfume/etheral_bloom_product_citrus-and_jasmine_description.png',
      title: 'Etheral Bloom',
      description: 'Citrus & Jasmine'
    }
  ];

  soapCards = [
    {
      image: 'assets/both/card-images-soap/eclat_de_lys_product_lavender_and_white_tea_description.png',
      title: 'Éclat de Lys',
      description: 'Lavender & White Tea'
    },
    {
      image: 'assets/both/card-images-soap/eclat_noir_product_black_amber_and_vetiver_description.png',
      title: 'Éclat Noir',
      description: 'Black Amber & Vetiver'
    },
    {
      image: 'assets/both/card-images-soap/eclat_noir_product_black_vanilla_description.png',
      title: 'Éclat Noir',
      description: 'Black Vanilla'
    },
    {
      image: 'assets/both/card-images-soap/ethereal_bloom_product_rose_blossom_description.png',
      title: 'Ethereal Bloom',
      description: 'Rose Blossom'
    },
    {
      image: 'assets/both/card-images-soap/ethereal_bloom_product_white_jasmine_and_amber_description.png',
      title: 'Ethereal Bloom',
      description: 'White Jasmine & Amber'
    },
    {
      image: 'assets/both/card-images-soap/forest_passion_product_lavander_and_apricot_description.png',
      title: 'Forest Passion',
      description: 'Lavender & Apricot'
    },
    {
      image: 'assets/both/card-images-soap/mighiary_soap_product_pearl_lather_description.png',
      title: 'Mighiary Soap',
      description: 'Pearl Lather'
    }
  ];
}
