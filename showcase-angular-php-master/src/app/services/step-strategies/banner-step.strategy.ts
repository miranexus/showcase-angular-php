import { Injectable } from '@angular/core';
import { StepStrategy } from './step.strategy';
import { RouteIds, Step } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class BannerStepStrategy implements StepStrategy {
  private stepDefinition: Step = {
    id: RouteIds.banner,
    title: 'Banner Step'
  };

  getStepDefinition() {
    return {
      ...this.stepDefinition
    }
  }
}

