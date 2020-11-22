import langEn from 'element-ui/lib/locale/lang/en'
import langFr from 'element-ui/lib/locale/lang/fr'
export function loadLocaleMessages () {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  if (typeof messages.en === 'object') {
    messages.en = {...messages.en, ...langEn}
  }
  if (typeof messages.fr === 'object') {
    messages.fr = {...messages.fr, ...langFr}
  }
  return messages
}
