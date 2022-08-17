import { range } from 'ramda'
import { useState } from 'react'

export const usePagination = <T extends any[]>(itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  const getItemsOnPage = (items: T, page: number) => {
    const indexesToShow = range(
      page * itemsPerPage - itemsPerPage,
      page * itemsPerPage
    )
    if (!items) return []
    return items.filter((_, i) => indexesToShow.includes(i))
  }

  const getTotalPages = (items: T) => Math.ceil(items.length / itemsPerPage)

  return { getItemsOnPage, getTotalPages, currentPage, setCurrentPage }
}
