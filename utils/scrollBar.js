export const removeScrollBar = () => {
  if (document.getElementsByClassName('overflow-hidden__body')?.length > 0) {
      document.body.classList.remove('overflow-hidden__body')
  }
}
export const addScrollBar = () => {
  if (document.getElementsByClassName('overflow-hidden__body')?.length === 0) {
      document.body.classList.add('overflow-hidden__body')
      
  }
}