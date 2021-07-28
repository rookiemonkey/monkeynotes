import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import NoResult from '../shared/NoResults'
import PageItem from './mini/PageItem'
import NotebookItemModalDelete from './mini/NotebookItemModalDelete'
import NotebookItemModalUpdate from './mini/NotebookItemModalUpdate'
import simplifiedFetch from '../utilities/simplifiedFetch'
import { AuthContext } from '../context/AuthContext'

const Notebook = props => {
  const { isLoggedIn } = useContext(AuthContext)
  const [notebook, setNotebook] = useState(props.location.state.notebook)
  const [state, setState] = useState({})
  const [search, setSearch] = useState({ isSearching: false, hasStarted: false, id: null, data: {} })
  const [isModalDeletionOpen, setIsModalDeletionOpen] = useState(false)
  const [isModalUpdatingOpen, setIsModalUpdatingOpen] = useState(false)
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

  const removePageFromState = useCallback(pageSlug => {
    const newPages = state.pages.filter(({ slug }) => slug != pageSlug)
    setState(prevState => ({ notebook: prevState.notebook, pages: newPages }))
  })

  const updateNotebook = useCallback(updatedNotebook => setNotebook(updatedNotebook))

  const openModalForDeletion = useCallback(() => setIsModalDeletionOpen(true), [])
  const closeModalForDeletion = useCallback(() => setIsModalDeletionOpen(false), [])
  const openModalForUpdating = useCallback(() => setIsModalUpdatingOpen(true), [])
  const closeModalForUpdating = useCallback(() => setIsModalUpdatingOpen(false), [])

  return (
    <React.Fragment>
      <Nav />

      {
        isLoggedIn
          ? (<React.Fragment>
            <NotebookItemModalDelete
              isOpen={isModalDeletionOpen}
              closeModal={closeModalForDeletion}
              slug={slug}
            />

            <NotebookItemModalUpdate
              isOpen={isModalUpdatingOpen}
              closeModal={closeModalForUpdating}
              slug={slug}
              subject={notebook.subject}
              updateNotebook={updateNotebook}
            />
          </React.Fragment>)
          : null
      }

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <ul className="uk-breadcrumb" style={{ width: '75%' }}>
            <li>
              <Link to="/">Notebooks</Link>
            </li>
            <li>
              <span className="current" >{notebook.subject}</span>
            </li>
            {
              isLoggedIn
                ? (
                  <li className="uk-align-right not-breadcrumb">
                    <span uk-icon="trash" className="delete-icon" style={{ marginRight: '5px' }} onClick={openModalForDeletion}></span>
                    <span uk-icon="pencil" className="edit-icon"  style={{ marginRight: '5px' }} onClick={openModalForUpdating}></span>
                  </li>
                )
                : null
            }
          </ul>

          <form onSubmit={handleSearch} 
                style={{ width: '75%' }}
                className="uk-search uk-search-navbar uk-margin-bottom uk-width-1-1@l">
            <div className="uk-flex uk-flex-middle">
              <span uk-icon="search" style={{ marginRight: '10px' }}></span>
              <input onChange={handleChange} ref={input} className="uk-search-input" name="search" type="search" placeholder="What are you looking for in this notebook?" autoComplete='off' />
            </div>
          </form>

          {(!state.notebook || search.hasStarted) && <Loader />}

          {search.isSearching && !search.data.count && <NoResult query={input.current.value} />}

          <div uk-grid="masonry: true" className="pages-parent uk-flex-center">
            {
              !search.isSearching &&
              state.pages &&
              state.pages.map(page => <PageItem 
                page={page} 
                key={page.id} 
                notebook={notebook} 
                removePageFromState={removePageFromState}
              />)
            }

            {
              search.isSearching &&
              search.data.pages.map(page => <PageItem 
                page={page} 
                key={page.id} 
                notebook={notebook} 
                query={input.current.value} 
                removePageFromState={removePageFromState}
              />)
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Notebook