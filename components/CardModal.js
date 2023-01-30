import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import styles from '../styles/CardModal.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '@/axiosInstance'
import LoadingButton from '@mui/lab/LoadingButton'

import { useState } from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 3
}

const CardModal = ({
  openModal,
  setOpenModal,
  _id,
  title,
  authorName,
  picURL,
  publicationHouse,
  genre,
  publicationYear,
  status,
  refetch
}) => {
  const [editData, setEditData] = useState({
    _id: _id,
    title: title,
    picURL: picURL,
    authorName: authorName,
    publicationHouse: publicationHouse,
    genre: genre,
    publicationYear: publicationYear,
    status: status
  })
  const handleChange = e => {
    let { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }
  const postData = e => {
    e.preventDefault()
    const response = axiosClient.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book/editBook',
      editData
    )
    return response
  }
  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: successData => {
      if (successData.data.error === false) {
        console.log(successData)
        refetch()
        setOpenModal(false)
        // alert(successData.data.message)
      } else {
        // alert(successData.data.message)
      }
    }
  })

  return (
    <Modal
      open={openModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      onClose={() => setOpenModal(false)}
    >
      <Box sx={style}>
        <div>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Update book data
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
                      value={editData.title}
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
                      value={editData.authorName}
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
                      value={editData.publicationYear}
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
                      value={editData.genre}
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
                    value={editData.publicationHouse}
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
                    value={editData.picURL}
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
                  Edit Book
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default CardModal
