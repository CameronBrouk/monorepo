import React from 'react'
import { Story } from '@ladle/react'
import { useState } from 'react'
import { Divider } from '../components/Dividers/Divider'
import { InfoSection } from '../components/Text/InfoSection'
import * as S from '../components/Search/Search'

export const Search: Story<any> = (props) => {
  const [term, setTerm] = useState('')
  return (
    <div>
      <S.Search onSearch={setTerm} {...props} />
      <InfoSection title='On Search Update: '>{term}</InfoSection>
    </div>
  )
}

Search.args = {
  debounce: true,
  placeholder: undefined,
  search: false,
  autoFocus: true
}
