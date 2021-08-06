import React, { useCallback, useEffect, useState, useRef } from 'react'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import NoResults from '../shared/NoResults'
import PageItem from './mini/PageItem'
import CategoryItem from './mini/CategoryItem'
import simplifiedFetch from '../utilities/simplifiedFetch';

const Categories = () => {
  const [state, setState] = useState({ isLoaded: false, data: [] });
  const [search, setSearch] = useState({ showCategories: true, isSearching: false, hasStarted: false, data: {} })
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
    setSearch({ ...search, hasStarted: true, showCategories: false })
    const data = await simplifiedFetch(`/search/pages`, 'POST', { search: input.current.value })
    setSearch({ ...search, hasStarted: false, isSearching: true, data: data })
  })

  const handleChange = useCallback(({ target }) => {
    if (target.value == '') setSearch({ ...search, isSearching: false, showCategories: true })
  })

  const removeCategoryFromState = useCallback(categorySubject => {
    const newData = state.data.filter(category => category.subject != categorySubject)
    setState(prevState => ({ ...prevState, data: newData }))
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

          {search.hasStarted && <Loader />}

          {!search.isSearching &&
          search.showCategories && (
            <ul className="uk-list">
              {
                state.data.map(category => <CategoryItem 
                  key={category.id} 
                  category={category} 
                  removeCategoryFromState={removeCategoryFromState} 
                />)
              }
            </ul>
          )}

          {search.isSearching && (
            <ul className="uk-list">
              {
                search.data.pages.map(page => <PageItem 
                  key={page.id} 
                  page={page} 
                  full={true} 
                  query={input.current.value} 
                />)
              }
            </ul>
          )}

          {(search.isSearching && !search.data.pages.length) && <NoResults query={input.current.value} />}

        </div>
      </div >

    </React.Fragment >
  )
}

export default Categories