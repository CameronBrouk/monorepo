import React, { Suspense } from 'react'
import logo from './assets/images/logo-dark.png'
import { Route, Routes } from 'react-router'
import { LogoLoader } from './shared/components/Loaders/LogoLoader'
const Home = React.lazy(() => import('./pages/Home/Home'))
// import Home from './pages/Home/Home'
const Learn = React.lazy(() => import('./pages/Learn/Learn'))
const More = React.lazy(() => import('./pages/More/More'))
const Calendar = React.lazy(() => import('./pages/Calendar/Calendar'))
const Faq = React.lazy(() => import('./pages/Faq/Faq'))
const GroupClassesListPage = React.lazy(
  () => import('./pages/Learn/GroupClassList/GroupClassList')
)
const LearnNav = React.lazy(() => import('./pages/Learn/LearnNav/LearnNav'))

const LoadingState = () => {
  return (
    <div className='w-screen relative flex flex-col h-screen items-center justify-center'>
      <div className='relative'>
        <img src={logo} height={150} width={150} />
        <div className='absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 scale-150'>
          <div className='absolute left-0 top-0 w-full h-full rounded-full animate-spin border-8 border-4-r border-r-red-800'></div>
        </div>
      </div>
    </div>
  )
}

export const ApplicationRouter = () => {
  return (
    <Suspense fallback={<LogoLoader logoSrc={logo} />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/learn' element={<Learn />}>
          <Route path='/learn' element={<LearnNav />} />
          <Route
            path='/learn/group-classes'
            element={<GroupClassesListPage />}
          />
        </Route>
        <Route path='/more' element={<More />} />
        <Route path='/events' element={<Calendar />} />
        <Route path='/more/faq' element={<Faq />} />
      </Routes>
    </Suspense>
  )
}

export default ApplicationRouter
