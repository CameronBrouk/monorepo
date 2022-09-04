import {
  any,
  equals,
  flatten,
  has,
  includes,
  last,
  omit,
  prop,
  propEq,
  uniq,
  without
} from 'ramda'
import React, { useState, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { Menu } from '../../Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export type OptionNode<T = any> = {
  label: string
  value?: T
  type?: 'date' | 'string' | 'number'
  children?: OptionNode<T>[]
}

type Props = {
  optionsTree: OptionNode[]
  onSelect: (options: OptionNode[]) => void
}

export const NestedOptionsMenu = ({ optionsTree, onSelect }: Props) => {
  const [items, setItems] = useState(optionsTree)
  const [path, setPath] = useState<string[]>([])
  const [selections, setSelections] = useState<OptionNode[]>([])

  // Traverses down the tree until it reaches the path specified in the array
  const getChildrenFromPath = (path: string[], optionsTree: OptionNode[]) =>
    path.reduce((children, label) => {
      if (!children) return []
      return children.find(propEq('label', label))?.children || []
    }, optionsTree)

  const flattenChildren = (nodes: OptionNode[]): OptionNode[] => {
    if (!any(has('children'), nodes)) return nodes

    const flattenedNodes = flatten(
      nodes.map((node) => {
        if (!node?.children) return node
        return [omit(['children'], node), ...flatten(node.children)]
      })
    )

    return flattenChildren(flattenedNodes as OptionNode[])
  }

  const transitions = useTransition(items, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)', opacity: 0, width: 0, height: 0 },
    reverse: true,
    expires: 1
  })

  useEffect(() => {
    if (path.length === 0) setItems(optionsTree)
    setItems(getChildrenFromPath(path, optionsTree))
  }, [path, optionsTree])

  const [open, setOpen] = useState(false)

  // const flattenChildren = (nodes: OptionNode[]): OptionNode[] => {
  //   if (!any(has('children'), nodes)) return nodes

  //   const flattenedNodes = flatten(
  //     nodes.map((node) => {
  //       if (!node?.children) return node
  //       return [omit(['children'], node), ...flatten(node.children)]
  //     }),
  //   )

  //   return flattenChildren(flattenedNodes as OptionNode[])
  // }

  const handleClickOption = (option: OptionNode) => {
    if (!option?.children) return onSelectOption(option)
    if (option.children) return setPath((prev) => [...prev, option.label])
  }

  const onSelectOption = (option: OptionNode) => {
    if (includes(option, selections)) return setSelections(without([option]))

    setSelections((prevSelections) => {
      const newSelections = uniq([...prevSelections, option])
      onSelect(newSelections)
      return newSelections
    })
  }

  return (
    <div className=''>
      <button
        onClick={() => setOpen((v) => !v)}
        className='w-full h-12 font-semibold truncate bg-white border cursor-pointer'
      >
        {selections.length === 0
          ? 'Filter Table'
          : selections.map(prop('label')).join(', ')}

        <Menu
          className='absolute z-50 overflow-hidden overflow-y-auto'
          onClose={() => setOpen(false)}
          isOpen={open}
        >
          {/* Breadcrumbs */}
          <div className='w-full p-4'>
            {/* <Breadcrumbs
              titles={path}
              onClickHome={() => setPath([])}
              onClickTitle={() => ''}
            /> */}
          </div>

          <div className='flex flex-col items-start justify-start h-56 bg-white'>
            {transitions((styles, item) => (
              <animated.div
                style={styles}
                className='flex items-center justify-between w-full'
              >
                <button
                  className={`flex justify-between items-center hover:bg-gray-200 p-2 h-full bg-white ${
                    selections.includes(item) && 'bg-blue-100'
                  }`}
                  onClick={() => handleClickOption(item)}
                >
                  <p className='w-56 text-left'>{item.label}</p>
                  {!!item.children && (
                    <FontAwesomeIcon icon={'chevron-right'} />
                  )}
                  {!item.children && (
                    <input
                      id='offers'
                      aria-describedby='offers-description'
                      name='offers'
                      type='checkbox'
                      checked={selections.includes(item)}
                      className={`focus:ring-indigo-500 h-4 w-4 ${
                        selections.includes(item) && 'text-indigo-600'
                      } border-gray-300 rounded`}
                    />
                  )}
                </button>
              </animated.div>
            ))}
          </div>

          {/* {items.map((item) => (
          <button
            className={`flex w-auto p-2 items-center ${
              selections.includes(item) && 'bg-blue-200'
            }`}
            onClick={() => handleClickOption(item)}>
            <p className='flex-grow'>{item.label}</p>
            {!!item.children && <ArrowRightIcon />}
          </button>
        ))} */}
        </Menu>
      </button>
    </div>
  )
}
