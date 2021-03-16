import React from 'react'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import styleCodeBlocks from '../../utilities/styleCodeBlocks';

const PageCard = ({ page }) => {

  const { language, content, subject } = page
  const html = styleCodeBlocks(content.body, language)

  return (
    <div>

      <h4>
        <Link to={`${window.location.pathname}/${page.slug}`} >{subject}</Link>
      </h4>

      <Markup content={html} />

    </div>
  )
}

export default PageCard