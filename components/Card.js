import { useState } from 'react'
import styles from '../styles/Card.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axiosClient from '@/axiosInstance'
import Skeleton from '@mui/material/Skeleton'
import CardModal from './CardModal'

const Card = ({
  ID,
  title,
  author,
  picURL,
  refetch,
  publicationHouse,
  genre,
  publicationYear,
  status
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }
  const postData = newStatus => {
    const response = axiosClient.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book/updateStatus',
      {
        status: newStatus,
        ID: ID
      }
    )
    return response
  }
  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: successData => {
      console.log(successData)
      if (successData.data.error === false) {
        refetch()
      }
    }
  })

  if (isLoading) {
    return (
      <div className={styles.skeletons}>
        <Skeleton
          variant='rounded'
          width='100%'
          height={220}
          sx={{ marginBottom: '5px', borderRadius: '0 12px 12px 0' }}
        />
        <Skeleton
          variant='rounded'
          width='100%'
          height={20}
          sx={{ marginBottom: '5px' }}
        />
        <Skeleton
          variant='rounded'
          width='100%'
          height={20}
          sx={{ marginBottom: '5px' }}
        />
      </div>
    )
  }
  if (isError) {
    return <h3>Something wrong</h3>
  }
  const handleSubmit = newStatus => {
    mutate(newStatus)
    handleClose()
  }

  const handleDelete = () => {
    console.log(ID)
    axiosClient
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book/deleteBook', {
        _id: ID
      })
      .then(res => {
        console.log(res)
        handleClose2()
        refetch()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <div className={styles.card__menu}>
          <IconButton
            sx={{ color: 'white' }}
            size='small'
            onClick={handleClick}
            aria-label='delete'
          >
            Update Status
          </IconButton>
          <IconButton
            sx={{ color: 'white' }}
            size='small'
            onClick={handleClick2}
            aria-label='delete'
          >
            <MoreVertIcon />
          </IconButton>
        </div>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={() => {
              handleSubmit('reading')
            }}
          >
            Reading
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSubmit('complete')
            }}
          >
            Complete
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSubmit('plan_to_read')
            }}
          >
            Plan to read
          </MenuItem>
        </Menu>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenModal(true)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <img src={picURL} width='100%' height='100%' />
      </div>
      <div className={styles.card__name}> {title}</div>
      <div className={styles.card__author}> {author}</div>
      <CardModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        _id={ID}
        title={title}
        picURL={picURL}
        authorName={author}
        publicationHouse={publicationHouse}
        genre={genre}
        publicationYear={publicationYear}
        status={status}
        refetch={refetch}
      />
    </div>
  )
}

export default Card
