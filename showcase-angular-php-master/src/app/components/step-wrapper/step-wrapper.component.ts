import { RouteIds } from '../../types';
import { VALID_STEPS } from '../../constants';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Component, inject, Injectable } from '@angular/core';
import { NavigationService, SignalsStoreService } from '../../services';
import {ToolbarHeaderComponent} from '../toolbar-header/toolbar-header.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  selector: 'mnx-step-wrapper',
  imports: [RouterOutlet, CarouselModule, ToolbarHeaderComponent],
  templateUrl: './step-wrapper.component.html',
  styleUrl: './step-wrapper.component.scss'
})
export class StepWrapperComponent {
  RouteIds = RouteIds;

  steps = [
    { id: RouteIds.pSelect, label: 'Dropdown', icon: 'pi pi-list' },
    { id: RouteIds.pDialog, label: 'Dialog', icon: 'pi pi-comments' },
    { id: RouteIds.pTable, label: 'Table', icon: 'pi pi-table' },
    { id: RouteIds.ecommerce, label: 'Ecommerce', icon: 'pi pi-image' }
  ];

  private navigationService = inject(NavigationService);
  private signalsStoreService = inject(SignalsStoreService);

  get activeIndex() {
    return this.steps.findIndex(s => s.id === this.signalsStoreService.getSelectedStep());
  }

  buttonClassFn = (step: any) => {
    return {
      'p-button-info': step.id === this.RouteIds.pSelect,
      'p-button-success': step.id === this.RouteIds.pDialog,
      'p-button-warning': step.id === this.RouteIds.pTable,
      'p-button-help': step.id === this.RouteIds.ecommerce
    };
  };

  onCarouselChange(event: any) {
    const step = this.steps[event.page]?.id;
    if (step) {
      this.changeStep(step);
    }
  }

  changeStep(step: RouteIds) {
    if (VALID_STEPS?.includes(step)) {
      this.signalsStoreService.setSelectedStep(step);
      this.navigationService.navigateToStep(step);
    }
  }
}
