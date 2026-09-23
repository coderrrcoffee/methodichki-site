/**
 * Форматирование цены: 1290 → «1 290 ₽».
 */
export function formatPrice(value) {
  return `${Number(value).toLocaleString('ru-RU')} ₽`
}

/**
 * Названия категорий по id – для подписи на карточке.
 */
export const categoryLabels = {
  sochinenie: 'Сочинение',
  oge: 'ОГЭ',
  ege: 'ЕГЭ',
  gramota: 'Грамотность',
  school: 'Школа',
  teacher: 'Для учителя',
}
