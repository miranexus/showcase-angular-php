import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'mnx-toolbar-footer',
  templateUrl: './toolbar-footer.component.html',
  styleUrls: ['./toolbar-footer.component.scss'],
  standalone: true,
  imports: [CommonModule, CarouselModule],
})
export class ToolbarFooterComponent {
  readonly responsiveOptions = [
    { breakpoint: '700px', numVisible: 2, numScroll: 1 },
    { breakpoint: '500px', numVisible: 1, numScroll: 1 }
  ];

  // Product-related links (update as needed)
  @Input() links: { title: string; image?: string; description?: string; url?: string }[] = [
    { title: 'Perfume', url: '/products/perfume' },
    { title: 'Soap', url: '/products/soap' },
    { title: 'Gift Sets', url: '/products/gift-sets' },
    { title: 'Special Offers', url: '/products/special-offers' },
    { title: 'New Arrivals', url: '/products/new-arrivals' },
    { title: 'Best Sellers', url: '/products/best-sellers' }
  ];

  isMobile: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMobile = breakpointObserver.observe([Breakpoints.Handset, '(max-width: 700px)'])
      .pipe(
        map((result: any) => result.matches),
        shareReplay(1)
      );
  }
}
