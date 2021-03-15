import React from 'react'
import { Markup } from 'interweave';
import styleCodeBlocks from '../utilities/styleCodeBlocks';

const PageCard = ({ page }) => {

  console.log(page)
  const { language, content, subject } = page
  const html = styleCodeBlocks(content.body, language)

  return (
    <React.Fragment>
      <h4>
        <Link to={`${window.location.pathname}/${page.slug}`} >{subject}</Link>
      </h4>
      <Markup content={html} />
    </React.Fragment>
  )
}

export default PageCard