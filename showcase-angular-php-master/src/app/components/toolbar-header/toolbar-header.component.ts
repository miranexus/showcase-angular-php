import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import {NgOptimizedImage} from '@angular/common';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { StorefrontService } from '../../services/storefront.service';

@Component({
  standalone: true,
  selector: 'mnx-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
  imports: [Toolbar, Button, InputText, NgOptimizedImage, FormsModule, ShoppingCartComponent],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarHeaderComponent {
  readonly store = inject(StorefrontService);
  private readonly router = inject(Router);
  mobileSearchOpen = false;

  async showResults(): Promise<void> {
    this.store.scrollToResults = true;
    if (!this.router.url.split('?')[0].startsWith('/ecommerce')) {
      await this.router.navigate(['/ecommerce']);
    }
    const heading = document.getElementById('catalogue-heading');
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.store.scrollToResults = false;
    }
  }
}
