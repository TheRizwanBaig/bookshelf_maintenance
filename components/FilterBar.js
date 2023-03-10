import styles from '../styles/FilterBar.module.css'
const FilterBar = ({ search, setSearch, sort, setSort, refetch }) => {
  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <form>
          <label
            for='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
            <input
              type='search'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search Mockups, Logos...'
              required
            />
            <button
              onClick={e => {
                e.preventDefault()
                refetch()
              }}
              className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className={styles.select}>
        <label for='countries' className={styles.label}>
          Sort
        </label>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option selected>Choose any title</option>
          <option value='title'>Title</option>
          <option value='authorName'>Author Name</option>
          <option value='genre'>Genre</option>
          <option value='publicationYear'>Publication Year</option>
        </select>
        <button
          onClick={e => {
            e.preventDefault()
            refetch()
          }}
          className={styles.sortButton}
        >
          Sort
        </button>
      </div>
    </div>
  )
}

export default FilterBar
