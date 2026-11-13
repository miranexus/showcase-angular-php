import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { StorefrontService } from '../../services/storefront.service';

@Component({
  selector: 'mnx-toolbar-footer',
  templateUrl: './toolbar-footer.component.html',
  styleUrls: ['./toolbar-footer.component.scss'],
  standalone: true,
  imports: [],
})
export class ToolbarFooterComponent {
  readonly storefront = inject(StorefrontService);
  @ViewChild('collectionLinks') private collectionLinks?: ElementRef<HTMLElement>;

  scrollCollections(direction: number): void {
    const element = this.collectionLinks?.nativeElement;
    if (!element) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    element.scrollBy({ left: direction * element.clientWidth * 0.75, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  @Input() links: { title: string; category?: string; collection?: string }[] = [
    { title: 'All products' },
    { title: 'Perfume', category: 'Perfume' },
    { title: 'Soap', category: 'Soap' },
    { title: 'Featured', collection: 'featured' },
    { title: 'Special offers', collection: 'offers' }
  ];
}
