import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'mnx-carousel-primeng',
  imports: [CarouselModule, ButtonModule, NgClass],
  templateUrl: './carousel-primeng.component.html',
  styleUrls: ['./carousel-primeng.component.scss']
})
export class CarouselPrimengComponent {
  @Input() items: any[] = [];
  @Input() routeIds: any;
  @Input() activeIndex: number = 0;
  @Input() iconField: string = 'icon';
  @Input() labelField: string = 'label';
  @Input() buttonClassFn: (item: any) => any = () => ({});

  @Output() itemClick = new EventEmitter<any>();
  @Output() carouselChange = new EventEmitter<any>();

  onCarouselChange(event: any) {
    this.carouselChange.emit(event);
  }

  onItemClick(item: any) {
    this.itemClick.emit(item);
  }
}
