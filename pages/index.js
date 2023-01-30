import styles from '@/styles/Home.module.css'
import FilterBar from '@/components/FilterBar'
import Card from '@/components//Card'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/axiosInstance'
import { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
export default function Home () {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['books'],

    queryFn: () =>
      axiosClient
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book/getBooks', {
          title: search,
          sort: sort
        })
        .then(res => {
          console.log(res)
          return res.data
        })
  })
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
  if (isError) {
    return <h3>Something wrong</h3>
  }
  console.log(isLoading)
  return (
    <div style={{ minHight: '100vh' }} className='bg-gray-50 dark:bg-gray-900'>
      <FilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        refetch={refetch}
      />
      <div className={styles.booksContainer}>
        <div className={styles.books}>
          <div className={styles.booksHeading}>Reading</div>
          {data?.reading ? (
            <div className={styles.cardContainer}>
              {data?.reading?.map(book => {
                return (
                  <Card
                    ID={book._id}
                    title={book.title}
                    author={book.authorName}
                    picURL={book.picURL}
                    refetch={refetch}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.empty}>Empty Shelf</div>
          )}
        </div>
        <div className={styles.books}>
          <div className={styles.booksHeading}>Complete</div>
          {data?.complete ? (
            <div className={styles.cardContainer}>
              {data?.complete?.map(book => {
                return (
                  <Card
                    ID={book._id}
                    title={book.title}
                    author={book.authorName}
                    picURL={book.picURL}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.empty}>Empty Shelf</div>
          )}
        </div>
        <div className={styles.books}>
          <div className={styles.booksHeading}>Plan to read</div>
          {data?.plan_to_read ? (
            <div className={styles.cardContainer}>
              {data?.plan_to_read?.map(book => {
                return (
                  <Card
                    ID={book._id}
                    title={book.title}
                    author={book.authorName}
                    picURL={book.picURL}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.empty}>Empty Shelf</div>
          )}
        </div>
      </div>
    </div>
  )
}
