import * as A from '../components/Accordion/Accordion'

export const Accordion = (props) => {
  return (
    <div>
      <A.Accordion title='Example 1' className='p-4'>
        <div className='h-52'>text text text</div>
      </A.Accordion>
      <A.Accordion title='Example' className='p-4'>
        text text text
      </A.Accordion>
      <A.Accordion title='Example'>
        <div className='h-80'>text text text</div>
        bottom content
      </A.Accordion>
    </div>
  )
}
