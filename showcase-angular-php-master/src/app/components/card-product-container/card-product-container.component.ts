import { AfterViewInit, Component, ElementRef, Input, OnDestroy, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardProductComponent } from '../card-product/card-product.component';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'mnx-card-product-container',
  templateUrl: './card-product-container.component.html',
  styleUrls: ['./card-product-container.component.scss'],
  imports: [CarouselModule, CardProductComponent]
})
export class CardProductContainerComponent implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private touchStart?: { x: number; y: number };
  private verticalTouch = false;
  private touchDirectionChosen = false;

  private readonly onTouchStart = (event: TouchEvent): void => {
    if (!(event.target instanceof Element) || !event.target.closest('.p-carousel-viewport')) return;
    const touch = event.touches[0];
    if (touch) this.touchStart = { x: touch.clientX, y: touch.clientY };
    this.verticalTouch = false;
    this.touchDirectionChosen = false;
  };

  private readonly onTouchMove = (event: TouchEvent): void => {
    const touch = event.touches[0];
    if (!this.touchStart || !touch) return;
    const dx = Math.abs(touch.clientX - this.touchStart.x);
    const dy = Math.abs(touch.clientY - this.touchStart.y);
    if (!this.touchDirectionChosen && Math.max(dx, dy) > 5) {
      this.verticalTouch = dy > dx;
      this.touchDirectionChosen = true;
    }
    if (this.verticalTouch) event.stopPropagation();
  };

  private readonly onTouchEnd = (event: TouchEvent): void => {
    if (this.verticalTouch) event.stopPropagation();
    this.touchStart = undefined;
    this.verticalTouch = false;
  };

  ngAfterViewInit(): void {
    this.element.addEventListener('touchstart', this.onTouchStart, { capture: true, passive: true });
    this.element.addEventListener('touchmove', this.onTouchMove, { capture: true, passive: true });
    this.element.addEventListener('touchend', this.onTouchEnd, true);
    this.element.addEventListener('touchcancel', this.onTouchEnd, true);
  }

  ngOnDestroy(): void {
    this.element.removeEventListener('touchstart', this.onTouchStart, true);
    this.element.removeEventListener('touchmove', this.onTouchMove, true);
    this.element.removeEventListener('touchend', this.onTouchEnd, true);
    this.element.removeEventListener('touchcancel', this.onTouchEnd, true);
  }
  @Input() cards: Product[] = [];
  @Input() responsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '900px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 2, // Ensure 2 cards are visible on mobile
      numScroll: 1
    },
    {
      breakpoint: '350px',
      numVisible: 1, // Fallback for very small screens
      numScroll: 1
    }
  ];
}
