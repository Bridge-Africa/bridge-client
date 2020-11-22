export default function log ({next, router, to, from, log}) {
  // eslint-disable-next-line no-new
  new Promise((resolve, reject) => {
    console.log(`From: -> ${from.path}(${from.name}) \nTo: -> ${to.path}(${to.name}) \nAt: ${new Date()}`)
    // d
  }).then(r => {})

  return next()
}
