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
      inn: ''
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
      const caseNumber = this.searchParams.caseNumber?.trim();
      const inn = this.searchParams.inn?.trim();

      if (!caseNumber && !inn) {
        this.error = 'Введите номер дела или ИНН для поиска.';
        return;
      }

      this.loading = true;
      this.error = null;
      this.cases = [];
      try {
        const results = await searchCases({ caseNumber, inn });
        if (!results?.length) {
          this.error = 'Ничего не найдено';
          return;
        }
        this.cases = results;
      } catch (error) {
        this.error = 'Ничего не найдено';
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
        this.selectedCase = null;
        this.events = [];
      } finally {
        this.loading = false;
      }
    },
    async downloadPdf(documentUrl) {
      return downloadCasePdf(documentUrl);
    }
  }
});
