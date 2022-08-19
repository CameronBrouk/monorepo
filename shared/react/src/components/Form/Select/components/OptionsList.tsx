import { searchObject } from '@unimpaired/utils'
import { find, propEq } from 'ramda'
import React, { Children } from 'react'
import { Selection } from '../Select'
import { Option } from './Option/Option'

type OptionsListProps = {
  searchTerm: string
  selections: Selection<any>[]
  handleSelect: (selections: Selection<any>) => void
  children: React.FunctionComponentElement<any>[]
  multiple?: boolean
}

export const OptionsList = (props: OptionsListProps) => (
  <>
    {Children.map(props.children, (child, i) =>
      searchObject(
        { v: child.props.value, l: child.props.label },
        props.searchTerm
      ) ? (
        <Option
          key={i}
          selected={
            !!find(propEq('value', child.props.value), props.selections)
          }
          onClick={() =>
            props.handleSelect({
              value: child.props.value,
              label: child.props.label
            })
          }
          {...child.props}
          role={props.multiple ? 'checkbox' : 'radio'}
        />
      ) : null
    )}
  </>
)
