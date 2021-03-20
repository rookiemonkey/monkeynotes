import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import PageItem from './mini/PageItem'

const Notebook = () => {
  const [state, setState] = useState({})
  const [search, setSearch] = useState({ isSearching: false, hasStarted: false, id: null, data: {} })
  const { slug } = useParams()
  const input = useRef(null)

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/notebook/${slug}`)
      const data = await raw.json()
      setState(data)
      setSearch({ ...search, id: data.notebook.id })
    })()
  }, [])

  const handleSearch = useCallback(async e => {
    e.preventDefault()
    setSearch({ ...search, hasStarted: true })
    const token = document.querySelector('meta[name="csrf-token"]').content

    const raw = await fetch(`/search/${search.id}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, },
      body: JSON.stringify({ search: input.current.value })
    })

    const data = await raw.json()
    setSearch({ ...search, hasStarted: false, isSearching: true, data: data })
  })

  const handleChange = useCallback(({ target }) => {
    if (target.value == '') setSearch({ ...search, isSearching: false })
  })

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">

          <form onSubmit={handleSearch} className="uk-search uk-search-navbar uk-width-1-1@l">
            <div className="uk-flex uk-flex-middle">
              <span uk-icon="search" style={{ marginRight: '10px' }}></span>
              <input onChange={handleChange} ref={input} className="uk-search-input" name="search" type="search" placeholder="What are you looking for in this notebook?" autoComplete='off' />
            </div>
          </form>

          {(!state.notebook || search.hasStarted) && <Loader />}

          <h2 className="notebook-header">
            {state.notebook && state.notebook.subject}
          </h2>

          {
            search.isSearching &&
            !search.data.count && (
              <h3 className="uk-text-center empty-header">NO MATCHING RESULTS</h3>
            )
          }

          <div uk-grid="masonry: true" className="uk-child-width-1-3@m">
            {
              !search.isSearching &&
              state.pages &&
              state.pages.map(page => <PageItem page={page} key={page.id} />)
            }

            {
              search.isSearching &&
              search.data.pages.map(page => <PageItem page={page} key={page.id} />)
            }
          </div>

        </div>
      </div>

    </React.Fragment>
  )
}

export default Notebook