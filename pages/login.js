import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ refresh, setRefresh, isLogin }) => {
  const router = useRouter()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const handleChange = e => {
    let { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }
  const [userData, setUserData] = useState()
  const postData = e => {
    e.preventDefault()
    console.log(loginData)
    const response = axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/login',
      loginData
    )
    return response
  }
  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: successData => {
      console.log(successData)
      if (successData.data.error===false) {
        // toast.success(successData.data.message)
        router.push('/')
        setUserData(successData.data.userData)
        localStorage.setItem('token', successData.data.token)
        localStorage.setItem('user', JSON.stringify(successData.data.userData))
        setRefresh(!refresh)
      } else {
        alert(successData.data.message)
      }
    }
  })
  if (isError) {
    return (
      <div className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            Something wrong!
          </div>
        </div>
      </div>
    )
  }
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Login
        </div>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  for='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  value={loginData.email}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  for='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <a
                  href='#'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                onClick={mutate}
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </LoadingButton>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  href='/SignUp'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
