import { Route } from '@angular/router';
import { inject } from '@angular/core';
import { RouteIds } from '../../../types';
import { StepResolverService } from '../../../services';
import { EcommerceStepComponent } from './ecommerce-step.component';

export const ecommerceStepRoute: Route = {
  path: 'ecommerce',
  resolve: {step: () => inject(StepResolverService).resolve('ecommerce' as RouteIds) },
  canActivate: [],
  component: EcommerceStepComponent
}
