import { Injectable } from '@angular/core';
import { StepStrategy } from './step.strategy';
import { RouteIds, Step } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class EcommerceStepStrategy implements StepStrategy {
  private stepDefinition: Step = {
    id: RouteIds.ecommerce,
    title: 'Ecommerce Step'
  };

  getStepDefinition() {
    return {
      ...this.stepDefinition
    }
  }
}

