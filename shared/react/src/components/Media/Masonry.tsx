import { useTransition, animated } from '@react-spring/web'
import { includes, __ } from 'ramda'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { Image } from './Image'
const imageExt = ['.gif', '.jpg', '.jpeg', '.png']
const videoExt = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4', '.MOV']

export default function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number
) {
  const match = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue

  const [value, set] = useState(match)

  useEffect(() => {
    const handler = () => set(match)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return value
}

type MasonryProps = {
  srcList: string[]
}
export const Masonry = (props: MasonryProps) => {
  const imageTypes = ['.png', '.jpg', '.jpeg']
  const videoTypes = ['.mp4', '.mov', '.gif']

  const [tab, setTab] = useState<'video' | 'images'>('images')
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [itemsOnPage, setItemsOnPage] = useState(10)

  const getTabIndex = (tabString: typeof tab) => (tab === 'images' ? 0 : 1)

  useEffect(() => {
    const atBottom = () => {
      const height = window.innerHeight + window.scrollY
      const documentHeight = document.body.offsetHeight
      if (height >= documentHeight - 200) {
        setItemsOnPage((items) => items + 10)
      }
    }

    document.addEventListener('scroll', atBottom)

    return () => {
      document.removeEventListener('scroll', atBottom)
    }
  }, [])

  const mediaListRef = useRef(null)

  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [3, 2, 1],
    2
  )
  const [ref, { width }] = useMeasure()

  const isVideo = includes(__, videoExt)
  const isImage = includes(__, videoExt)

  return (
    <div ref={ref} className='w-full'>
      {props.srcList.map((item) => (
        <button
          key={item}
          className='p-4 rounded-lg'
          // style={{
          //   height: item.x,
          //   width: item.y
          // }}
        ></button>
      ))}
    </div>
  )
}

// export const Masonry = ({ srcList }: any) => {
//   // Hook1: Tie media queries to the number of columns
//   const columns = useMedia(
//     ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
//     [5, 4, 3],
//     2
//   )
//   // Hook2: Measure the width of the container element
//   const [ref, { width }] = useMeasure()
//   // Hook3: Hold items
//   const [items, set] = useState(srcList)
//   // Hook4: shuffle data every 2 seconds
//   // useEffect(() => {
//   //   const t = setInterval(() => set(shuffl), 2000)
//   //   return () => clearInterval(t)
//   // }, [])
//   // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
//   const [heights, gridItems] = useMemo(() => {
//     let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
//     let gridItems = items.map((child, i) => {
//       const getHeight = () => {
//         if (i % 2 === 0) return 600
//         return 400
//       }
//       const height = getHeight()
//       const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
//       const x = (width / columns) * column // x = container width / number of columns * column index,
//       const y = (heights[column] += height / 2) - height / 2 // y = it's just the height of the current column
//       return {
//         src: child,
//         x,
//         y,
//         width: width / columns,
//         height
//       }
//     })
//     return [heights, gridItems]
//   }, [columns, items, width])

//   // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
//   const transitions = useTransition(gridItems, {
//     key: (item: { css: string; height: number }) => item.css,
//     from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
//     enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
//     update: ({ x, y, width, height }) => ({ x, y, width, height }),
//     leave: { height: 0, opacity: 0 },
//     config: { mass: 5, tension: 500, friction: 100 },
//     trail: 25
//   })
//   // Render the grid
//   return (
//     <div ref={ref} style={{ height: Math.max(...heights) }}>
//       {transitions((style, item) => (
//         <animated.div style={style}>
//           <img src={item.src} height={item.height} width={item.width} />
//         </animated.div>
//       ))}
//     </div>
//   )
// }
