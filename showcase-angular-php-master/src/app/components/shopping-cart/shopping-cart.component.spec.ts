import { TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  it('updates visibility when the dialog closes', () => {
    const fixture = TestBed.createComponent(ShoppingCartComponent);
    const component = fixture.componentInstance;
    component.visible = true;
    component.onVisibleChange(false);

    expect(component.visible).toBeFalse();
  });
});
