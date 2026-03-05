import { Observable } from 'rxjs';
import { RouteIds, Step } from '../types';
import { inject, Injectable } from '@angular/core';
import { EcommerceStepStrategy, PSelectStepStrategy, PDialogStepStrategy, PTableStepStrategy, StepStrategy } from './step-strategies';

@Injectable({
  providedIn: 'root',
})

export class StepResolverService {
  private readonly strategies: Record<RouteIds, StepStrategy>;
  private pTableStepStrategy= inject(PTableStepStrategy);
  private pDialogStepStrategy = inject(PDialogStepStrategy);
  private pSelectStepStrategy = inject(PSelectStepStrategy);
  private ecommerceStepStrategy = inject(EcommerceStepStrategy);

  constructor() {
    this.strategies = {
      pSelect: this.pSelectStepStrategy,
      pDialog: this.pDialogStepStrategy,
      pTable: this.pTableStepStrategy,
      ecommerce: this.ecommerceStepStrategy,
    };
  }

  resolve(stepId: RouteIds): Observable<Step> | Promise<Step> | Step {
    return this.getStepDefinition(stepId);
  }

  getStepDefinition(stepId: RouteIds): Step {
    return this.getStrategy(stepId).getStepDefinition();
  }

  private getStrategy(stepId: RouteIds) {
    return this.strategies[stepId];
  }
}
