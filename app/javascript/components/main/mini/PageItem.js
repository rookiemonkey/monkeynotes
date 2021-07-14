import React from 'react'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs'
import styleCodeBlocks from '../../utilities/styleCodeBlocks';
import highlightQuery from '../../utilities/highlightQuery';

const PageItem = ({ page, full, notebook, query }) => {
  const { language, content, subject, slug, updated_at } = page
  let html = styleCodeBlocks(content.body, language);
      html = highlightQuery(html, query)

  return (
    <div className={`page-item uk-padding-small ${full ? 'page-item-full' : ''}`}>

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
          <Link to={`${window.location.pathname}/${slug}/edit`}>
            <span uk-icon="pencil" style={{ marginRight: '5px' }}></span>
          </Link>
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