import { toPairs } from 'ramda'
import { parseDate } from 'chrono-node'
import { InfoSection } from './InfoSection'
import { formatDate } from '../../utils'

export interface ObjectDisplayProps {
  object: Record<string, any>
  className?: string
}

export const ObjectDisplay = (props: ObjectDisplayProps) => {
  const translateValue = (value: any) => {
    if (value instanceof Date)
      return formatDate('readable-date-and-time', value)
    if (Array.isArray(value)) return `[${value.join(', ')}]`
    if (typeof value === 'object') return <ObjectDisplay object={value} />
    if (typeof value === 'number') return value
    if (typeof value === 'boolean') return `${value}`
    if (typeof value === 'undefined') return `${undefined}`
    if (!Number.isNaN(Number(value))) return Number(value)
    if (parseDate(`${value}`))
      return formatDate('readable-date-and-time', parseDate(value))
    return `${value}`
  }
  return (
    <div className={`divide-y ${props.className}`}>
      {toPairs(props?.object).map(([key, value]) => (
        <InfoSection title={key} key={value}>
          {translateValue(value)}
        </InfoSection>
      ))}
    </div>
  )
}
