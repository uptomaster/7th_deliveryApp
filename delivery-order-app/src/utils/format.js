export function parseCredit(amount) {
  if (typeof amount === 'number') return amount
  return Number(amount.toString().replace(/[^0-9]/g, ''))
}

export function formatWon(amount) {
  return `${parseCredit(amount).toLocaleString('ko-KR')}원`
}

export function formatCredit(amount) {
  return `${parseCredit(amount).toLocaleString('ko-KR')}C`
}