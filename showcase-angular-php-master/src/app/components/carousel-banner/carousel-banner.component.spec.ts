import { TestBed } from '@angular/core/testing';
import { CarouselBannerComponent } from './carousel-banner.component';

describe('CarouselBannerComponent', () => {
  it('starts with the second banner on both desktop and mobile', () => {
    const component = TestBed.createComponent(CarouselBannerComponent).componentInstance;

    expect(component.images[0]).toContain('perfume_banner_ad_02_desktop.png');
    expect(component.mobileImages[0]).toContain('perfume_banner_ad_02_mobile.png');
    expect(component.images.length).toBe(3);
    expect(component.mobileImages.length).toBe(3);
  });
});
