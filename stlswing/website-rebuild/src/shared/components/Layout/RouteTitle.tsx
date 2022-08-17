import { capitalCase } from 'change-case'
import { useRouter } from '../../hooks/useRouter'
import { H1 } from '../Text/H1'

export const RouteTitle = () => {
  const { currentRoute } = useRouter()
  return <H1>{capitalCase(currentRoute.split('/').slice(-1)[0])}</H1>
}
