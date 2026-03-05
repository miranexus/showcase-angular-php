import { Route } from '@angular/router';
import { inject } from '@angular/core';
import { RouteIds } from '../../../types';
import { StepResolverService } from '../../../services';
import { BannerStepComponent } from './banner-step.component';

export const bannerStepRoute: Route = {
  path: 'banner',
  resolve: {step: () => inject(StepResolverService).resolve('banner' as RouteIds) },
  canActivate: [],
  component: BannerStepComponent
}
