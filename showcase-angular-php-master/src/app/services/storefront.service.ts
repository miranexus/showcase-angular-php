import { Injectable, computed, signal } from '@angular/core';
import { isProduct, Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'miranexus-showcase-cart';

@Injectable({ providedIn: 'root' })
export class StorefrontService {
  readonly search = signal('');
  readonly category = signal('');
  readonly collection = signal('all');
  readonly cartMessage = signal('');
  private messageTimer?: ReturnType<typeof setTimeout>;
  scrollToResults = false;
  private readonly cartState = signal<CartItem[]>([]);
  readonly cart = this.cartState.asReadonly();
  readonly count = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotalCents = computed(() => {
    let total = 0;
    for (const item of this.cart()) {
      if (item.product.priceCents === undefined) return null;
      total += item.product.priceCents * item.quantity;
      if (!Number.isSafeInteger(total)) return null;
    }
    return total;
  });
  readonly storageError = signal(false);

  constructor() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed) || !parsed.every(item =>
          typeof item === 'object' && item !== null &&
          isProduct(item.product) && Number.isSafeInteger(item.quantity) && item.quantity > 0
        ) || new Set(parsed.map(item => item.product.id)).size !== parsed.length) {
          throw new Error('Invalid saved cart');
        }
        this.cartState.set(parsed);
      }
    } catch (error) {
      console.error('Unable to restore cart:', error);
      this.storageError.set(true);
    }
  }

  add(product: Product): void {
    const existing = this.cart().find(item => item.product.id === product.id);
    this.save(existing
      ? this.cart().map(item => item.product.id === product.id ? { product, quantity: item.quantity + 1 } : item)
      : [...this.cart(), { product, quantity: 1 }]);
    const count = this.count();
    this.cartMessage.set(`${product.title} added to your cart. ${count} ${count === 1 ? 'item' : 'items'} in cart.`);
    clearTimeout(this.messageTimer);
    this.messageTimer = setTimeout(() => this.cartMessage.set(''), 4000);
  }

  browse(category = '', collection = 'all'): void {
    this.search.set('');
    this.category.set(category);
    this.collection.set(collection);
    this.scrollToResults = true;
    this.showCatalogue();
  }

  showCatalogue(): void {
    const heading = document.getElementById('catalogue-heading');
    if (!heading) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    heading.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    this.scrollToResults = false;
  }

  changeQuantity(id: number, delta: number): void {
    this.save(this.cart().map(item => item.product.id === id
      ? { ...item, quantity: item.quantity + delta }
      : item).filter(item => item.quantity > 0));
  }

  remove(id: number): void {
    this.save(this.cart().filter(item => item.product.id !== id));
  }

  updateCatalogue(products: Product[]): void {
    if (!this.cart().length) return;
    const catalogue = new Map(products.map(product => [product.id, product]));
    this.save(this.cart().map(item => {
      const current = catalogue.get(item.product.id);
      return { ...item, product: current ?? { ...item.product, priceCents: undefined } };
    }));
  }

  private save(items: CartItem[]): void {
    this.cartState.set(items);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      this.storageError.set(false);
    } catch (error) {
      console.error('Unable to save cart:', error);
      this.storageError.set(true);
    }
  }
}
