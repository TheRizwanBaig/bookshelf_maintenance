import styles from '@/styles/Home.module.css'
import FilterBar from '@/components/FilterBar'
import Card from '@/components//Card'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/axiosInstance'
import { useState, useEffect } from 'react'

export default function Home () {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['books'],

    queryFn: () =>
      axiosClient
        .post(process.env.NEXT_PUBLIC_BACKEND_URL +'/api/book/getBooks', {
          title: search,
          sort: sort
        })
        .then(res => {
          console.log(res)
          return res.data
        })
  })
  if (isLoading) {
    return <h3>Loading</h3>
  }
  if (isError) {
    return <h3>Something wrong</h3>
  }
  console.log(data)
  return (
    <div className='bg-gray-50 dark:bg-gray-900'>
      <FilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        refetch={refetch}
      />
      {/* <div className={styles.booksContainer}>
        {Object.keys(data)?.map((cur) => {
          return (
            <div className={styles.books}>
              <div className={styles.booksHeading}>{cur}</div>
              <div className={styles.cardContainer}>
                {data[cur] && data[cur].map((book) => {
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
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
