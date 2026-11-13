import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;
  let http: HttpTestingController;
  const originalConfig = window.__PRODUCT_CATALOG__;
  const product = {
    id: 1, title: 'Sample', description: 'Scent', image: 'assets/sample.png',
    category: 'Perfume', featured: true, specialOffer: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProductCatalogService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    window.__PRODUCT_CATALOG__ = originalConfig;
  });

  it('loads the bundled catalogue in sample mode', () => {
    window.__PRODUCT_CATALOG__ = { source: 'sample', apiUrl: '' };
    service.getProducts().subscribe(products => expect(products).toEqual([product]));
    http.expectOne('assets/catalogue/products.json').flush([product]);
  });

  it('loads products from the configured PHP endpoint in API mode', () => {
    window.__PRODUCT_CATALOG__ = { source: 'api', apiUrl: 'http://localhost:8000/index.php' };
    service.getProducts().subscribe(products => expect(products).toEqual([product]));
    const request = http.expectOne(req => req.url === 'http://localhost:8000/index.php' && req.params.get('path') === '/products');
    expect(request.request.method).toBe('GET');
    request.flush([product]);
  });

  it('reports invalid responses instead of silently falling back to samples', () => {
    window.__PRODUCT_CATALOG__ = { source: 'api', apiUrl: 'http://localhost:8000/index.php' };
    let error: Error | undefined;
    service.getProducts().subscribe({ error: (failure: Error) => error = failure });
    http.expectOne(req => req.params.get('path') === '/products').flush([{ ...product, featured: 'yes' }]);
    expect(error?.message).toContain('invalid');
  });

  it('reports duplicate product IDs', () => {
    window.__PRODUCT_CATALOG__ = { source: 'sample', apiUrl: '' };
    let error: Error | undefined;
    service.getProducts().subscribe({ error: (failure: Error) => error = failure });
    http.expectOne('assets/catalogue/products.json').flush([product, product]);
    expect(error?.message).toContain('invalid');
  });

  it('rejects invalid prices', () => {
    window.__PRODUCT_CATALOG__ = { source: 'sample', apiUrl: '' };
    let error: Error | undefined;
    service.getProducts().subscribe({ error: (failure: Error) => error = failure });
    http.expectOne('assets/catalogue/products.json').flush([{ ...product, priceCents: -1 }]);
    expect(error?.message).toContain('invalid');
  });

  it('reports a missing runtime configuration', () => {
    delete window.__PRODUCT_CATALOG__;
    let error: Error | undefined;
    service.getProducts().subscribe({ error: (failure: Error) => error = failure });
    expect(error?.message).toContain('configuration');
  });
});
