import { useNavigate, useLocation, useParams } from 'react-router'
import { useSearchParams, useNavigationType } from 'react-router-dom'

export const useRouter = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const params = useParams()
  const navigationType = useNavigationType()
  const [searchParam, setSearchParam] = useSearchParams()

  const currentRoute = location.pathname

  return {
    navigateTo,
    navigationType,
    location,
    params,
    currentRoute,
    searchParam,
    setSearchParam
  }
}
