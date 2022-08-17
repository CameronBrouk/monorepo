const exceedsLeft = (bounding: DOMRect) => bounding.left < 0
const exceedsTop = (bounding: DOMRect) => bounding.top < 60 // 60 is the height of the header
const exceedsBottom = (bounding: DOMRect) =>
  bounding.bottom >
  (window.innerHeight || document.documentElement.clientHeight) - 10
const exceedsRight = (bounding: DOMRect) =>
  bounding.right > (window.innerWidth || document.documentElement.clientWidth)

export const isOutOfViewport = (bounding: DOMRect) => ({
  top: exceedsTop(bounding),
  left: exceedsLeft(bounding),
  bottom: exceedsBottom(bounding),
  right: exceedsRight(bounding),
  any:
    exceedsTop(bounding) ||
    exceedsLeft(bounding) ||
    exceedsBottom(bounding) ||
    exceedsRight(bounding)
})

// If The Element is Above The top of the viewport,
// recursively add 20px until it's not.
// There is 100% a better way to do this.
const adjustPosition = (element: HTMLElement) => {
  const { style } = element
  style.marginTop = `${parseInt(style.marginTop) + 20}px`
  const bounding = element.getBoundingClientRect()
  if (isOutOfViewport(bounding).top) adjustPosition(element)
}

export const setPosition = (element: HTMLElement) => {
  const { style } = element

  const bounding = element.getBoundingClientRect()
  const { height, width } = bounding

  const parentElement = element.parentElement as HTMLElement
  const { height: parentHeight, width: parentWidth } =
    parentElement.getBoundingClientRect()

  const exceeds = isOutOfViewport(bounding)

  if (exceeds.bottom) style.marginTop = `-${height + parentHeight}px`
  if (exceeds.right) style.marginLeft = `-${width - parentWidth}px`

  // if (isOutOfViewport(element.getBoundingClientRect()).top)
  // 	adjustPosition(element);
}
