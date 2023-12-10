export const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
export const renderMoney = (value) => {
  if (value !== 0) {
    if (!value) return null
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}
