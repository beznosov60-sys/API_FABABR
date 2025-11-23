import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_KAD_API_URL,
  params: { key: import.meta.env.VITE_KAD_API_KEY },
  timeout: 15000
});

export async function searchCases({ caseNumber, inn }) {
  const payload = {
    Page: 1,
    Count: 20
  };

  if (caseNumber) {
    payload.CaseNumber = caseNumber;
  }
  if (inn) {
    payload.Inn = inn;
  }

  try {
    const response = await api.post('/kadapi/v1.0/search', payload);
    const items = response.data?.Items;
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Не удалось выполнить поиск в КАД', error);
    throw error;
  }
}

export async function fetchCaseCard(idOrNumber) {
  try {
    const response = await api.get('/kadapi/v1.0/card', {
      params: { CaseNumber: idOrNumber }
    });
    return response.data;
  } catch (error) {
    console.error('Карточка дела недоступна', error);
    throw error;
  }
}

export async function fetchCaseEvents(idOrNumber) {
  try {
    const response = await api.get('/kadapi/v1.0/card/events', {
      params: { CaseNumber: idOrNumber }
    });
    return response.data?.Items || [];
  } catch (error) {
    console.error('История дела недоступна', error);
    throw error;
  }
}

export async function downloadCasePdf(url) {
  const response = await api.get('/pdf', {
    params: { url },
    responseType: 'blob'
  });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'document.pdf';
  link.click();
  window.URL.revokeObjectURL(link.href);
  return true;
}
