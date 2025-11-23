import axios from 'axios';

const apiKey = import.meta.env.VITE_KAD_API_KEY;
const baseURL = import.meta.env.VITE_KAD_API_URL || 'https://kad.arbitr.ru/';

const http = axios.create({
  baseURL,
  timeout: 15000
});

http.interceptors.request.use((config) => {
  const params = config.params || {};
  params.key = apiKey;
  config.params = params;
  return config;
});

const mapParty = (party) => ({
  name: party?.name || 'Неизвестно',
  inn: party?.inn || '—',
  ogrn: party?.ogrn || '—',
  role: party?.role || 'сторона',
  address: party?.address || '—'
});

const demoCase = {
  id: 'demo-77-2025',
  caseNumber: 'А40-123456/2025',
  court: 'АС города Москвы',
  status: 'В производстве',
  judge: 'Иванова И.И.',
  type: 'Арбитражное',
  parties: [
    mapParty({ name: 'ООО "Пример"', inn: '7701234567', ogrn: '1127746000000', role: 'Истец', address: 'Москва' }),
    mapParty({ name: 'АО "Ответчик"', inn: '7722334455', ogrn: '1027700000000', role: 'Ответчик', address: 'Москва' })
  ],
  documents: [
    { id: 'doc-1', title: 'Определение о принятии иска', date: '2025-04-23', url: 'https://kad.arbitr.ru/PdfDocument/demo' }
  ],
  schedule: [
    { date: '2025-05-20', time: '10:00', place: 'Зал 301', type: 'Заседание' }
  ]
};

const demoEvents = [
  {
    id: 'e1',
    date: '2025-04-23',
    type: 'Принят иск',
    comment: 'Исковое заявление принято судом',
    amount: '3 200 000 ₽',
    actor: 'Истец',
    documents: ['Определение о принятии иска']
  },
  {
    id: 'e2',
    date: '2025-05-05',
    type: 'Поступили возражения',
    comment: 'Ответчик представил отзыв',
    actor: 'Ответчик',
    documents: ['Отзыв на иск']
  }
];

export async function searchCases(params) {
  try {
    const payload = {
      Page: 1,
      Count: 20,
      CaseNumber: params.caseNumber || undefined,
      Inn: params.inn || undefined
    };

    const response = await http.post('/kadapi/v1.0/search', payload);
    return response.data?.Items || [];
  } catch (error) {
    console.warn('Поиск завершился с ошибкой, возвращаем демо-данные', error.message);
    if (params.caseNumber || params.inn) {
      return [demoCase];
    }
    return [];
  }
}

export async function fetchCaseCard(idOrNumber) {
  try {
    const response = await http.get('/kadapi/v1.0/card', {
      params: { CaseNumber: idOrNumber }
    });
    return response.data || demoCase;
  } catch (error) {
    console.warn('Карточка недоступна, возврат демо', error.message);
    return demoCase;
  }
}

export async function fetchCaseEvents(idOrNumber) {
  try {
    const response = await http.get('/kadapi/v1.0/card/events', {
      params: { CaseNumber: idOrNumber }
    });
    return response.data?.Items || demoEvents;
  } catch (error) {
    console.warn('События недоступны, возврат демо', error.message);
    return demoEvents;
  }
}

export async function downloadCasePdf(url) {
  const response = await http.get('/pdf', {
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
