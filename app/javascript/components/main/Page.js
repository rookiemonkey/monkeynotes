import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../shared/Nav'

const Page = () => {
  const [state, setState] = useState({})
  const { pageSlug } = useParams()

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/pages/${pageSlug}`)
      const data = await raw.json()
      setState(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">

          <ul class="uk-breadcrumb">
            <li>
              <Link to="/">
                Notebooks
              </Link>
            </li>
            {state.notebook && (
              <li>
                <Link to={`/notebook/${state.notebook.slug}`}>
                  {state.notebook.subject}
                </Link>
              </li>
            )}
            {state.page && (
              <li>
                <span className="page-header">
                  {state.page.subject}
                </span>
              </li>
            )}
          </ul>

        </div>
      </div>

    </React.Fragment>
  )
}

export default Page