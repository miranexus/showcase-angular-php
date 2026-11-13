import { Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductCatalogService } from '../../../services/product-catalog.service';
import { StorefrontService } from '../../../services/storefront.service';
import { CarouselBannerComponent } from '../../carousel-banner/carousel-banner.component';
import { CardProductComponent } from '../../card-product/card-product.component';
import { CardProductContainerComponent } from '../../card-product-container/card-product-container.component';
import { ToolbarFooterComponent } from '../../toolbar-footer/toolbar-footer.component';

@Component({
  standalone: true,
  selector: 'mnx-ecommerce-step',
  templateUrl: './ecommerce-step.component.html',
  styleUrls: ['./ecommerce-step.component.scss'],
  imports: [FormsModule, CarouselBannerComponent, CardProductComponent, CardProductContainerComponent, ToolbarFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceStepComponent implements OnInit {
  private readonly catalog = inject(ProductCatalogService);
  private readonly destroyRef = inject(DestroyRef);
  readonly storefront = inject(StorefrontService);

  products: Product[] = [];
  perfumeCards: Product[] = [];
  soapCards: Product[] = [];
  selectedCategory = '';
  selectedCollection = 'all';
  loading = false;
  loadError = false;

  get isSampleCatalog(): boolean {
    return window.__PRODUCT_CATALOG__?.source === 'sample';
  }

  get categories(): string[] {
    return [...new Set(this.products.map(product => product.category))].sort();
  }

  get filteredProducts(): Product[] {
    const search = this.storefront.search().trim().toLocaleLowerCase();
    return this.products.filter(product =>
      (!search || `${product.title} ${product.description}`.toLocaleLowerCase().includes(search)) &&
      (!this.selectedCategory || product.category === this.selectedCategory) &&
      (this.selectedCollection === 'all' ||
        (this.selectedCollection === 'featured' && product.featured) ||
        (this.selectedCollection === 'offers' && product.specialOffer))
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.loadError = false;
    this.catalog.getProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: products => {
        this.products = products;
        this.storefront.updateCatalogue(products);
        this.perfumeCards = products.filter(product => product.category === 'Perfume');
        this.soapCards = products.filter(product => product.category === 'Soap');
        this.loading = false;
        if (this.storefront.scrollToResults) {
          setTimeout(() => {
            document.getElementById('catalogue-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.storefront.scrollToResults = false;
          });
        }
      },
      error: error => {
        console.error('Unable to load product catalogue:', error);
        this.loadError = true;
        this.loading = false;
      }
    });
  }
}
