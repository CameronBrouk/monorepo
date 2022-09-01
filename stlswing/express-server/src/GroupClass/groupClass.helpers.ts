export const transformDanceMoveIds = (
  type: 'Required' | 'Taught',
  moveIds?: number[]
) => moveIds?.map((danceMoveId) => ({ danceMoveId, type })) || []
