import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductCatalogService } from '../../../services/product-catalog.service';
import { EcommerceStepComponent } from './ecommerce-step.component';

describe('EcommerceStepComponent catalogue', () => {
  const products: Product[] = [
    { id: 1, title: 'Perfume', description: 'Rose Blossom', image: 'assets/a.png', category: 'Perfume', featured: true, specialOffer: false },
    { id: 2, title: 'Soap', description: '', image: 'assets/b.png', category: 'Soap', featured: false, specialOffer: true }
  ];
  let service: jasmine.SpyObj<ProductCatalogService>;
  let component: EcommerceStepComponent;

  beforeEach(() => {
    service = jasmine.createSpyObj('ProductCatalogService', ['getProducts']);
    service.getProducts.and.returnValue(of(products));
    TestBed.configureTestingModule({
      imports: [EcommerceStepComponent],
      providers: [{ provide: ProductCatalogService, useValue: service }]
    });
    component = TestBed.createComponent(EcommerceStepComponent).componentInstance;
    component.ngOnInit();
  });

  it('loads the product carousels and filters by category and collection', () => {
    expect(component.perfumeCards).toEqual([products[0]]);
    expect(component.soapCards).toEqual([products[1]]);
    component.selectedCategory = 'Soap';
    component.selectedCollection = 'offers';
    expect(component.filteredProducts).toEqual([products[1]]);
    component.selectedCollection = 'featured';
    expect(component.filteredProducts).toEqual([]);
  });

  it('reports failures and allows retrying', () => {
    spyOn(console, 'error');
    service.getProducts.and.returnValue(throwError(() => new Error('offline')));
    component.loadProducts();
    expect(component.loadError).toBeTrue();
    expect(component.loading).toBeFalse();
    service.getProducts.and.returnValue(of(products));
    component.loadProducts();
    expect(component.loadError).toBeFalse();
    expect(component.filteredProducts).toEqual(products);
  });

  it('filters product names and descriptions without regard to case', () => {
    component.storefront.search.set('  ROSE  ');
    expect(component.filteredProducts).toEqual([products[0]]);
    component.storefront.search.set('soap');
    expect(component.filteredProducts).toEqual([products[1]]);
    component.storefront.search.set('missing');
    expect(component.filteredProducts).toEqual([]);
  });
});
