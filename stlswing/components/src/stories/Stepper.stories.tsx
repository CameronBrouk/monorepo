import React from 'react'
import { Story } from '@ladle/react'
import * as S from '../components/Stepper/index'

export const Stepper: Story<any> = (props) => {
  return (
    <S.Stepper>
      <S.Step title='Step 1'>content 1</S.Step>
      <S.Step title='Step 2'>content 2</S.Step>
      <S.Step title='Step 3'> content 3</S.Step>
    </S.Stepper>
  )
}
