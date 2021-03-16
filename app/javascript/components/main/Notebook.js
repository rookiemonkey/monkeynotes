import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../shared/Nav'
import PageCard from './mini/PageCard'

const Notebook = () => {
  const [state, setState] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/notebook/${slug}`)
      const data = await raw.json()
      setState(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <h2>{!state.notebook && "Loading ...."}</h2>

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">
          <h2>{state.notebook && state.notebook.subject}</h2>

          <div uk-grid="masonry: true" className="uk-child-width-1-3@m">
            {state.pages && state.pages.map(page => <PageCard page={page} key={page.id} />)}
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Notebook