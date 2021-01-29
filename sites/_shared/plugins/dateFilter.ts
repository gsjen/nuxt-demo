import Vue from 'vue'

const locale = process.server ? 'en-US' : navigator.language;
const filter = function (value: string | Date | null, options?: Intl.DateTimeFormatOptions | string) {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  if (!value) {
    return ''
  }
  const date = new Date(value);

  if (options === 'time') {
    return date.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  if (options === 'short') {
    return offsetDate.toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
      day: 'numeric'
    });
  }
  if (options === 'long') {
    return offsetDate.toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  }
  if (options === 'date-picker') {
    const [month, day, year] = offsetDate.toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
      day: '2-digit'
    }).split('/')
    return `${year}-${month}-${day}`
  }
  return offsetDate.toLocaleDateString(locale, options as Intl.DateTimeFormatOptions)
}

Vue.filter('date', filter)
