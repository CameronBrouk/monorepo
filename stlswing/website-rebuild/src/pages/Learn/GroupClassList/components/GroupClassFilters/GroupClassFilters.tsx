import { Option, Select } from '../../../../../shared/components/Form'
import { FULL_MONTHS_IN_YEAR } from '../../../../../shared/utils'

export type ClassFilters = {
  month: string
  level: string
  form: string
}

export const defaultFilters = {
  month: '',
  level: '',
  form: ''
}

interface GroupClassFiltersProps {
  filters: ClassFilters
  setFilters: SetState<ClassFilters>
  className?: string
}
export const GroupClassFilters = ({
  filters,
  setFilters,
  className
}: GroupClassFiltersProps) => {
  return (
    <div
      className={`flex w-screen transition duration-700 h-16 p-4 overflow-x-auto overflow-y-hidden border-b space-x-2 items-center bg-gray-100 sm:justify-center sm:hidden ${className}`}
    >
      <Select
        name='month'
        className='m-0'
        label='Month'
        noLabel
        onSelect={(month) => setFilters((filters) => ({ ...filters, month }))}
        defaultValues={[filters.month]}
      >
        {FULL_MONTHS_IN_YEAR.slice(new Date().getMonth() - 12).map((month) => (
          <Option key={month} label={month} value={month} />
        ))}
      </Select>

      <Select
        name='level'
        className='m-0'
        label='Level'
        noLabel
        defaultValues={[filters.level]}
        onSelect={(level) => setFilters((filters) => ({ ...filters, level }))}
      >
        {['1', '2', '3'].map((level) => (
          <Option key={level} label={level} value={level} />
        ))}
        {/* {GROUP_CLASS_LEVELS.map((level) => (
          <Option label={level} value={level} />
        ))} */}
      </Select>

      <Select
        name='type'
        className='m-0'
        label='Dance Form'
        noLabel
        onSelect={(danceForm) =>
          setFilters((filters) => ({ ...filters, danceForm }))
        }
      >
        {['1', '2', '3'].map((type) => (
          <Option key={type} label={type} value={type} />
        ))}
        {/* {DANCE_FORMS.map((month) => (
          <Option label={month} value={month} />
        ))} */}
      </Select>
    </div>
  )
}
