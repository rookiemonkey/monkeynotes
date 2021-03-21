import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../shared/Nav'

const Page = props => {
  const { notebook, page } = props.location.state
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

          <ul className="uk-breadcrumb">
            <li>
              <Link to="/">
                Notebooks
              </Link>
            </li>
            <li>
              <Link to={{
                pathname: `/notebook/${notebook.slug}`,
                state: { notebook: { ...notebook } }
              }}
              >{notebook.subject}</Link>
            </li>
            <li>
              <span className="page-header">
                {page.subject}
              </span>
            </li>
          </ul>

        </div>
      </div>

    </React.Fragment>
  )
}

export default Page