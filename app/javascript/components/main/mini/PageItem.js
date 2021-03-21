import React from 'react'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs'
import styleCodeBlocks from '../../utilities/styleCodeBlocks';

const PageItem = ({ page, full, notebook }) => {
  const { language, content, subject, updated_at } = page
  const html = styleCodeBlocks(content.body, language)

  return (
    <div className={`page-item uk-padding-small ${full ? 'page-item-full' : ''}`}>

      <div className="page-header-container uk-margin-bottom">
        <h4>
          <Link className="page-header"
            to={{
              pathname: `${window.location.pathname}/${page.slug}`,
              state: { notebook: { ...notebook }, page: { subject } }
            }}
          >{subject}</Link>
        </h4>
        <span className="page-subheader">
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