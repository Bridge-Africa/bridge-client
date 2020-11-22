import moment from 'moment'

export function longDateFormat (row, column, cellValue, index) {
  return moment(cellValue).format('ddd MMMM Do YYYY h:mm a')
}

export function shortDateFormat (row, column, cellValue, index) {
  return moment(cellValue).format('MMM Do YY')
}

export function formatPhone (row, column, cellValue, index) {
  return cellValue.toString().replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

export function notify (msg, title, dur = 3000) {
  //
}
