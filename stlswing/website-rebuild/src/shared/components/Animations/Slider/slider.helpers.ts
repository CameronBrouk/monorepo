type SlideProps = {
  disabled?: boolean
}

export const navigateToSlideIndex = <T extends SlideProps>(
  toIndex: number,
  fromIndex: number,
  slides: T[]
) => {
  const currentTab = slides[fromIndex]
  if (!currentTab) return fromIndex

  // Don't allow negative indexes
  if (toIndex < 0) {
    // toast.error('No previous slides')
    return fromIndex
  }

  // If the index is equal to the current index, don't navigate
  if (toIndex === fromIndex) return fromIndex

  // allow navigation to previous slides
  if (toIndex < fromIndex) return toIndex

  // If parent has disallowed the ability to continue, don't navigate
  if (slides[fromIndex]?.disabled) {
    // toast.error('Please complete the current slide')
    return fromIndex
  }

  // If every slide preceding the desired slide allows continuation, then continue
  if (slides.slice(fromIndex, toIndex - 1).every((slide) => !slide.disabled))
    return toIndex

  return fromIndex
}
