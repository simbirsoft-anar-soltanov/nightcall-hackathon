import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

// wrapper as recommended in https://date-fns.org/docs/I18n
const dateFormat = (date, formatStr = 'PP') => {
  return format(date, formatStr, { locale: ru });
};

export default dateFormat;
