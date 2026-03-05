import { PrimeNgData } from '../models';
import { SignalsStore } from '../store';
import { SelectedCities } from '../types';
import { inject, Injectable } from '@angular/core';
import { RouteIds } from '../types';

@Injectable({
  providedIn: 'root'
})

export class SignalsStoreService {

  private signalsStore = inject(SignalsStore);

  getSelectedStep() {
    return this.signalsStore.data()?.step;
  }

  setSelectedStep(step: RouteIds | string) {
    this.signalsStore.set({
      ...this.signalsStore.data(),
      step: step
    });
  }

  getSelectedCities() {
    return this.signalsStore.data()?.selectedCities;
  }

  getPrimeNgData() {
    return this.signalsStore.data()?.selectedPrimeNgData;
  }

  setSelectedCities(selectedCities: SelectedCities) {
    this.signalsStore.set({
      ...this.signalsStore.data(),
      selectedCities
    });
  }

  setPrimeNgData(selectedPrimeNgData: PrimeNgData[]) {
    this.signalsStore.set({
      ...this.signalsStore.data(),
      selectedPrimeNgData
    });
  }
}
