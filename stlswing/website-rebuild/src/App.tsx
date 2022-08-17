import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { CurrentUserProvider } from './firebase/user'
import { MobileBottomNav } from './layout/MobileBottomNav'
import ApplicationRouter from './Router'
import { useIsMobile } from './shared/hooks/useIsMobile'
import { useWindowSize } from './shared/hooks/useWindowSize'

const reactQueryClient = new QueryClient()

export function App() {
  const [windowHeight] = useWindowSize()
  const isMobile = useIsMobile()
  const [ref, { height: headerHeight }] = useMeasure()

  // useEffect(() => {
  //   const firestore = getFirestore(firebaseApp)
  //   const a = getDocs(query(collection(firestore, `orders`))).then((response) =>
  //     response.docs.map((d) => console.log(d.data())),
  //   )
  // }, [])

  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <QueryClientProvider client={reactQueryClient}>
          {/* PUT EVERYTHING INSIDE OF THIS DIV */}
          <div
            className='flex flex-col overflow-hidden'
            style={{ height: windowHeight - headerHeight }}
          >
            <div className='h-full overflow-y-auto scroll-smooth'>
              <ApplicationRouter />
            </div>

            <MobileBottomNav ref={ref} />
          </div>
        </QueryClientProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  )
}

export default App
