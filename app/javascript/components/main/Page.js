import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Markup } from 'interweave'
import DayJS from 'react-dayjs'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import styleCodeBlocks from '../utilities/styleCodeBlocks'

const Page = props => {
  const { notebook, page } = props.location.state
  const [state, setState] = useState({ isLoaded: false })
  const { pageSlug } = useParams()

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/pages/${pageSlug}`)
      const data = await raw.json()
      setState({ isLoaded: true, ...data })
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">

          <ul className="uk-breadcrumb uk-margin-bottom">
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
              <span className="current">
                {page.subject}
              </span>
            </li>
          </ul>

          {
            !state.isLoaded && <Loader />
          }

          {
            state.page && (
              <div className="page-header-container uk-margin-bottom">
                <h4></h4>
                <span className="page-subheader">
                  <Link to={`${window.location.pathname}/edit`}>
                    <span uk-icon="pencil" style={{ marginRight: '5px' }}></span>
                  </Link>
                  Updated as of <DayJS format="MM-DD-YYYY">{state.page.updated_at}</DayJS>
                </span>
              </div>
            )
          }

          {
            state.page && (
              <div className="page-content-container">
                <Markup
                  content={styleCodeBlocks(state.page.content.body, state.page.language)}
                  allowAttributes="true"
                  noWrap="true" />
              </div>
            )
          }

        </div>
      </div>

    </React.Fragment>
  )
}

export default Page