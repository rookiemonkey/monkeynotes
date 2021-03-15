import React from 'react'
import { Markup } from 'interweave';
import styleAllPreTags from '../utilities/styleAllPreTags';

const PageCard = ({ page }) => {

  const { language, content, subject } = page
  const html = styleAllPreTags(content.body, language)

  return (
    <React.Fragment>
      <h4>{subject}</h4>
      <Markup content={html} />
    </React.Fragment>
  )
}

export default PageCard