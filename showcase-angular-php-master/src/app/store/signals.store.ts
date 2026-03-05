import { SignalsData } from '../types';
import { VALID_STEPS } from '../constants';
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

const STORAGE_KEY = 'signalsStoreState';
const DEFAULT_STATE: SignalsData = { step: '', selectedCities: { from: { name: '', code: '' }, to: { name: '', code: '' } } };

function loadState(): SignalsData {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as SignalsData;
      if (parsed.step && !VALID_STEPS.includes(parsed.step as any)) {
        parsed.step = '';
      }
      return parsed;
    } catch {
      // Ignore parse errors and use default
    }
  }
  return { ...DEFAULT_STATE };
}

function saveState(data: SignalsData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const SignalsStore = signalStore(
  withState({
    data: loadState()
  }),
  withMethods(({ data, ...store }) => ({
    set(newData: SignalsData) {
      patchState(store, { data: newData });
      saveState(newData);
    },
  }))
);
