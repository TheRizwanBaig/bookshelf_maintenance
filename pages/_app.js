import NavBar from '@/components/NavBar'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useEffect } from 'react'
import Login from './login'
import SignUp from './SignUp'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const queryClient = new QueryClient()

export default function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    const value = localStorage.getItem('token')
    const token = !value ? false : value
    const userValue = localStorage.getItem('user')
    const user = !userValue ? false : userValue
    // const user = !userValue ? false : JSON.parse(userValue)
    setIsLogin(token)
    setUser(user)
    setLoading(false)
  }, [refresh])

  if (!loading)
    return (
      <QueryClientProvider client={queryClient}>
        {isLogin ? (
          <>
            {pathname === '/SignUp' || pathname === '/login' ? (
              <>
                <NavBar
              refresh={refresh}
              setRefresh={setRefresh}
              isLogin={isLogin}
            />
                <div className='bg-gray-50 dark:bg-gray-900'>
                  <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
                      Already logged in
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavBar
                  refresh={refresh}
                  setRefresh={setRefresh}
                  isLogin={isLogin}
                  user={user}
                />
                <Component {...pageProps} />
              </>
            )}
          </>
        ) : isLogin === false ? (
          <>
            {pathname === '/SignUp' ? (
              <SignUp />
            ) : (
              <Login
                refresh={refresh}
                setRefresh={setRefresh}
                isLogin={isLogin}
              />
            )}
          </>
        ) : null}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  else
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
}
