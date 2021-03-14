import React from 'react'
import { Markup } from 'interweave';

const PageCard = ({ page }) => {

  return (
    <React.Fragment>
      <h4>{page.subject}</h4>
      <Markup content={page.content.body} />
    </React.Fragment>
  )
}

export default PageCard