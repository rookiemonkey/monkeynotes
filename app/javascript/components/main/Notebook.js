import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import NoResult from '../shared/NoResults'
import PageItem from './mini/PageItem'
import simplifiedFetch from '../utilities/simplifiedFetch';

const Notebook = props => {
  const { notebook } = props.location.state
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
    const data = await simplifiedFetch(`/search/${search.id}/pages`, 'POST', { search: input.current.value })
    setSearch({ ...search, hasStarted: false, isSearching: true, data: data })
  })

  const handleChange = useCallback(({ target }) => {
    if (target.value == '') setSearch({ ...search, isSearching: false })
  })

  const handleDelete = useCallback(() => {
    alert("Deleting this notebook")
  })

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">

          <ul className="uk-breadcrumb">
            <li>
              <Link to="/">Notebooks</Link>
            </li>
            <li>
              <span className="current" >{notebook.subject}</span>
            </li>
            <li className="uk-align-right not-breadcrumb">
              <button type="button" className="uk-button uk-button-default uk-button-delete" onClick={handleDelete}>
                <span uk-icon="trash" style={{ marginRight: '5px' }}></span>
                Delete
              </button>
            </li>
          </ul>

          <form onSubmit={handleSearch} className="uk-search uk-search-navbar uk-margin-bottom uk-width-1-1@l">
            <div className="uk-flex uk-flex-middle">
              <span uk-icon="search" style={{ marginRight: '10px' }}></span>
              <input onChange={handleChange} ref={input} className="uk-search-input" name="search" type="search" placeholder="What are you looking for in this notebook?" autoComplete='off' />
            </div>
          </form>

          {(!state.notebook || search.hasStarted) && <Loader />}

          {
            search.isSearching && !search.data.count && <NoResult query={input.current.value} />
          }

          <div uk-grid="masonry: true" className="pages-parent uk-flex-center">
            {
              !search.isSearching &&
              state.pages &&
              state.pages.map(page => <PageItem page={page} key={page.id} notebook={notebook} />)
            }

            {
              search.isSearching &&
              search.data.pages.map(page => <PageItem page={page} key={page.id} notebook={notebook} query={input.current.value} />)
            }

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Notebook