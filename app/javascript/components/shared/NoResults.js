import React from 'react'

const NoResults = ({ query }) => (
  <div class='noresults-container'>
    <h3 className="uk-text-center empty-header">
      NO MATCHING RESULTS FOR '{query}'
    </h3>
  </div>
)

export default NoResults