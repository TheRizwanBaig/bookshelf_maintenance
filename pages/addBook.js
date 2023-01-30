import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '@/axiosInstance'
import LoadingButton from '@mui/lab/LoadingButton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const AddBook = () => {
  const router = useRouter()
  const [bookData, setBookData] = useState({
    title: '',
    picURL: '',
    authorName: '',
    publicationHouse: '',
    genre: '',
    publicationYear: ''
  })

  const handleChange = e => {
    let { name, value } = e.target
    setBookData({ ...bookData, [name]: value })
  }
  const postData = e => {
    e.preventDefault()
    const response = axiosClient.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book/addBook',
      bookData
    )
    return response
  }
  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: successData => {
      if (successData.data.error === false) {
        console.log(successData)
        // alert(successData.data.message)
        router.push('/')
      } else {
        // alert(successData.data.message)
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
    <div className='bg-gray-50 dark:bg-gray-900'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Add a book
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <label
                    for='Name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={bookData.title}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name'
                    required=''
                  />
                </div>
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Author Name
                  </label>
                  <input
                    type='text'
                    name='authorName'
                    value={bookData.authorName}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name'
                    required=''
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <label
                    for='Publication Year'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Publication Year
                  </label>
                  <input
                    type='text'
                    name='publicationYear'
                    value={bookData.publicationYear}
                    onChange={handleChange}
                    placeholder='2020'
                    defaultValue={'2020'}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <label
                    for='countries'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Select a genre
                  </label>
                  <select
                    name='genre'
                    onChange={handleChange}
                    value={bookData.genre}
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  >
                    <option selected>Choose a genre</option>
                    <option value='Historical'>Historical</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Horror'>Horror</option>
                    <option value='Drama'>Drama</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  for='Publication House'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Publication House
                </label>
                <input
                  type='text'
                  name='publicationHouse'
                  value={bookData.publicationHouse}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name'
                  required=''
                />
              </div>
              <div>
                <label
                  for='Publication House'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Picture URL
                </label>
                <input
                  type='text'
                  name='picURL'
                  value={bookData.picURL}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='.com'
                  required=''
                />
              </div>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                onClick={mutate}
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Add Book
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBook
