import React from 'react'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import styleCodeBlocks from '../../utilities/styleCodeBlocks';

const PageItem = ({ page }) => {

  const { language, content, subject } = page
  const html = styleCodeBlocks(content.body, language)

  return (
    <div>

      <h4>
        <Link className="page-link" to={`${window.location.pathname}/${page.slug}`} >{subject}</Link>
      </h4>

      <Markup content={html} allowAttributes="true" />

    </div>
  )
}

export default PageItem