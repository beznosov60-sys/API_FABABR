import { defineStore } from 'pinia';
import {
  searchCases,
  fetchCaseCard,
  fetchCaseEvents,
  downloadCasePdf
} from '../services/kadApi';

export const useCasesStore = defineStore('cases', {
  state: () => ({
    searchParams: {
      caseNumber: '',
      inn: '',
      query: '',
      startDate: '',
      endDate: '',
      type: '',
      court: ''
    },
    cases: [],
    selectedCase: null,
    events: [],
    loading: false,
    error: null
  }),
  actions: {
    setSearchParams(params) {
      this.searchParams = { ...this.searchParams, ...params };
    },
    async search() {
      this.loading = true;
      this.error = null;
      try {
        const results = await searchCases(this.searchParams);
        this.cases = results || [];
      } catch (error) {
        this.error = 'Не удалось выполнить поиск. Проверьте параметры или попробуйте позже.';
      } finally {
        this.loading = false;
      }
    },
    async loadCase(idOrNumber) {
      this.loading = true;
      this.error = null;
      try {
        const [card, history] = await Promise.all([
          fetchCaseCard(idOrNumber),
          fetchCaseEvents(idOrNumber)
        ]);
        this.selectedCase = card;
        this.events = history || [];
      } catch (error) {
        this.error = 'Не удалось загрузить карточку дела.';
      } finally {
        this.loading = false;
      }
    },
    async downloadPdf(documentUrl) {
      return downloadCasePdf(documentUrl);
    }
  }
});
