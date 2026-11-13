import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';
import { StorefrontService } from './storefront.service';

describe('StorefrontService cart', () => {
  const product: Product = {
    id: 1, title: 'Perfume', description: 'Rose', image: 'assets/a.png',
    category: 'Perfume', priceCents: 4999, featured: true, specialOffer: false
  };
  let saved: string | null;

  beforeEach(() => {
    saved = localStorage.getItem('miranexus-showcase-cart');
    localStorage.removeItem('miranexus-showcase-cart');
  });

  afterEach(() => {
    if (saved === null) localStorage.removeItem('miranexus-showcase-cart');
    else localStorage.setItem('miranexus-showcase-cart', saved);
  });

  it('adds, persists, changes quantities and removes products', () => {
    const store = TestBed.inject(StorefrontService);
    store.add(product);
    store.add(product);
    expect(store.count()).toBe(2);
    expect(store.cartMessage()).toContain('Perfume added to your cart');
    expect(store.subtotalCents()).toBe(9998);
    expect(JSON.parse(localStorage.getItem('miranexus-showcase-cart') ?? '[]')[0].quantity).toBe(2);
    store.changeQuantity(product.id, -1);
    expect(store.count()).toBe(1);
    expect(store.subtotalCents()).toBe(4999);
    store.remove(product.id);
    expect(store.cart()).toEqual([]);
  });

  it('clears search and applies the requested collection filters', () => {
    const store = TestBed.inject(StorefrontService);
    store.search.set('rose');
    store.browse('Soap', 'offers');
    expect(store.search()).toBe('');
    expect(store.category()).toBe('Soap');
    expect(store.collection()).toBe('offers');
    store.browse();
    expect(store.category()).toBe('');
    expect(store.collection()).toBe('all');
  });

  it('restores a saved cart', () => {
    localStorage.setItem('miranexus-showcase-cart', JSON.stringify([{ product, quantity: 3 }]));
    expect(TestBed.inject(StorefrontService).count()).toBe(3);
  });

  it('updates old cart prices from the current catalogue and reports unavailable prices', () => {
    localStorage.setItem('miranexus-showcase-cart', JSON.stringify([{ product: { ...product, priceCents: undefined }, quantity: 2 }]));
    const store = TestBed.inject(StorefrontService);
    expect(store.subtotalCents()).toBeNull();
    store.updateCatalogue([{ ...product, priceCents: 5500 }]);
    expect(store.subtotalCents()).toBe(11000);
    store.updateCatalogue([]);
    expect(store.subtotalCents()).toBeNull();
  });

  it('does not present a partial subtotal when an item has no price', () => {
    const store = TestBed.inject(StorefrontService);
    store.add(product);
    store.add({ ...product, id: 2, priceCents: undefined });
    expect(store.subtotalCents()).toBeNull();
  });

  it('reports storage failures while keeping the cart usable', () => {
    spyOn(console, 'error');
    const store = TestBed.inject(StorefrontService);
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage unavailable');
    store.add(product);
    expect(store.count()).toBe(1);
    expect(store.storageError()).toBeTrue();
  });
});
