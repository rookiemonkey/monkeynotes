import React from 'react'
import { Link } from 'react-router-dom'

const NotebookItem = ({ item }) => {
  return (
    <li className="uk-margin-medium-bottom" key={item.notebook.slug}>

      <h2>
        <Link to={`notebook/${item.notebook.slug}`} >{item.notebook.subject}</Link>
      </h2>

      <ul className="uk-list uk-list-hyphen" id="list-notebook-pages">
        {
          item.pages.map(page => (
            <li key={page.slug}>
              <Link to={`notebook/${item.notebook.slug}/${page.slug}`} >{page.subject}</Link>
            </li>
          ))
        }
      </ul>

      <hr className="uk-divider-icon" />

    </li>
  )
}

export default NotebookItem