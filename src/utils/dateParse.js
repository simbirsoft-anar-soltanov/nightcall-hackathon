import parse from 'date-fns/parse';
import ru from 'date-fns/locale/ru';

// wrapper as recommended in https://date-fns.org/docs/I18n
const dateParse = (dateStr, formatStr = 'PP', referenceDate = new Date()) => {
  return parse(dateStr, formatStr, referenceDate, { locale: ru });
};

export default dateParse;
