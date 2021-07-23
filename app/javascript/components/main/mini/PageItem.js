import React, { useCallback, useState, useContext } from 'react'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs'
import PageItemModalDelete from './PageItemModalDelete';
import styleCodeBlocks from '../../utilities/styleCodeBlocks';
import highlightQuery from '../../utilities/highlightQuery';
import { AuthContext } from '../../context/AuthContext'

const PageItem = ({ page, full, notebook, query }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const { language, content, subject, slug, updated_at } = page
  let html = styleCodeBlocks(content.body, language);
      html = highlightQuery(html, query)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <div className={`page-item uk-padding-small ${full ? 'page-item-full' : ''}`}>

      {
        isLoggedIn
          ? (<PageItemModalDelete closeModal={closeModal} isOpen={isOpen} slug={slug} />)
          : null
      }

      <div className="page-header-container uk-margin-bottom">
        <h4>
          <Link className="page-header"
            to={{
              pathname: `${window.location.pathname}/${slug}`,
              state: { notebook: { ...notebook }, page: { subject } }
            }}
          >{subject}</Link>
        </h4>
        <span className="page-subheader">
          {
            isLoggedIn
              ? (<span uk-icon="trash" style={{ marginRight: '5px' }} onClick={openModal}></span>)
              : null
          }

          {
            isLoggedIn
              ? (<Link to={`${window.location.pathname}/${slug}/edit`}>
                <span uk-icon="pencil" style={{ marginRight: '5px' }}></span>
              </Link>)
              : null
          }
          Updated as of <DayJS format="MM-DD-YYYY">{updated_at}</DayJS>
        </span>
      </div>

      <div className="page-content-container">
        <Markup content={html} allowAttributes="true" noWrap="true" />
      </div>

    </div>
  )
}

export default PageItem