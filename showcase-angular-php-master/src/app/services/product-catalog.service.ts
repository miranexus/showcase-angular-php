import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { isProduct, Product } from '../models/product.model';

declare global {
  interface Window {
    __PRODUCT_CATALOG__?: {
      source: 'sample' | 'api';
      apiUrl: string;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return defer(() => {
      const config = window.__PRODUCT_CATALOG__;
      if (!config || (config.source !== 'sample' && config.source !== 'api')) {
        throw new Error('Invalid product catalogue configuration.');
      }

      const url = config.source === 'sample' ? 'assets/catalogue/products.json' : config.apiUrl;
      if (!url) throw new Error('Product catalogue API URL is not configured.');

      const params = config.source === 'api' ? new HttpParams().set('path', '/products') : undefined;
      return this.http.get<unknown>(url, { params });
    }).pipe(
      map(data => {
        if (!Array.isArray(data) || !data.every(isProduct) ||
            new Set(data.map(product => product.id)).size !== data.length) {
          throw new Error('Product catalogue response is invalid.');
        }
        return data;
      })
    );
  }
}
