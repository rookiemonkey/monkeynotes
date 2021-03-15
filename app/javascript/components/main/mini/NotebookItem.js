import React from 'react'
import { Link } from 'react-router-dom'

const NotebookItem = ({ item }) => {
  return (
    <li key={item.notebook.id}>
      <h2><Link to={`notebook/${item.notebook.slug}`} >{item.notebook.subject}</Link></h2>

      <ul class="uk-list uk-list-hyphen uk-margin-medium-bottom" id="list-notebook-pages">
        {
          item.pages.map(page => (
            <li>
              <Link to={`notebook/${item.notebook.slug}/${page.slug}`} >{page.subject}</Link>
            </li>
          ))
        }
      </ul>

    </li>
  )
}

export default NotebookItem