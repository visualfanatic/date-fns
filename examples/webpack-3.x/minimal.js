import addDays from 'date-fns/esm/addDays'

const result = addDays('2017-01-25T21:28:15.000Z', 1)
console.log(result === '2017-01-26T21:28:15.000Z')
