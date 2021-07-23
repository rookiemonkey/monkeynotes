import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Markup } from 'interweave'
import DayJS from 'react-dayjs'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import styleCodeBlocks from '../utilities/styleCodeBlocks'
import { AuthContext } from '../context/AuthContext'

const Page = props => {
  const { isLoggedIn } = useContext(AuthContext)
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
        <div className="uk-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <ul className="uk-breadcrumb uk-margin-bottom" style={{ width: '75%' }}>
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
              {
                state.page && (
                  <li className="uk-align-right not-breadcrumb">
                    <span className="page-subheader">
                      {
                        isLoggedIn
                        ? (<Link to={`${window.location.pathname}/edit`}>
                          <span uk-icon="pencil" style={{ marginRight: '5px' }}></span>
                        </Link>)
                        : null
                      }
                      Updated as of <DayJS format="MM-DD-YYYY">{state.page.updated_at}</DayJS>
                    </span>
                  </li>
                )
              }
          </ul>

          {
            !state.isLoaded && <Loader />
          }

          {
            state.page && (
              <div className="page-content-container" style={{ width: '75%' }}>
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