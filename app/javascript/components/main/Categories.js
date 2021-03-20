import React, { useCallback, useEffect, useState, useRef } from 'react'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import PageItem from './mini/PageItem'
import CategoryItem from './mini/CategoryItem'

const Categories = () => {
  const [state, setState] = useState({ isLoaded: false, data: [] });
  const [search, setSearch] = useState({ isSearching: false, hasStarted: false, data: {} })
  const input = useRef(null);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = await raw.json()
      setState({ isLoaded: true, data })
    })()
  }, [])

  const handleSearch = useCallback(async e => {
    e.preventDefault()
    setSearch({ hasStarted: true, ...search })
    const token = document.querySelector('meta[name="csrf-token"]').content

    const raw = await fetch('/search/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, },
      body: JSON.stringify({ search: input.current.value })
    })

    const data = await raw.json()
    setSearch({ hasStarted: false, isSearching: true, data: data })
  })

  const handleChange = useCallback(({ target }) => {
    if (target.value == '') setSearch({ ...search, isSearching: false })
  })

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container uk-width-1-2@l">

          <form onSubmit={handleSearch} className="uk-search uk-search-navbar uk-width-1-1@l">
            <div className="uk-flex uk-flex-middle">
              <span uk-icon="search" style={{ marginRight: '10px' }}></span>
              <input onChange={handleChange} ref={input} className="uk-search-input" name="search" type="search" placeholder="What are you looking for?" autoComplete='off' />
            </div>
          </form>

          {(!state.isLoaded || search.hasStarted) && <Loader />}

          {!search.isSearching && (
            <ul className="uk-list">
              {
                state.data.map(category => <CategoryItem category={category} />)
              }
            </ul>
          )}

          {search.isSearching && (
            <ul className="uk-list">
              {
                search.data.pages.map(page => <PageItem page={page} full={true} />)
              }
            </ul>
          )}

          {(search.isSearching && !search.data.pages.length) && (
            <h3 className="uk-text-center empty-header">NO MATCHING RESULTS</h3>
          )}

        </div>
      </div >

    </React.Fragment >
  )
}

export default Categories