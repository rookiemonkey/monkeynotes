import React from 'react'
import { Markup } from 'interweave';
import styleCodeBlocks from '../utilities/styleCodeBlocks';

const PageCard = ({ page }) => {

  const { language, content, subject } = page
  const html = styleCodeBlocks(content.body, language)

  return (
    <React.Fragment>
      <h4>{subject}</h4>
      <Markup content={html} />
    </React.Fragment>
  )
}

export default PageCard