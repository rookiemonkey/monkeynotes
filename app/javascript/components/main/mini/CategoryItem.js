import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {

  return (
    <li className="uk-margin-medium-bottom" key={category.id}>

      <h2> {category.subject} </h2>

      <ul className="uk-list uk-list-hyphen" id="list-notebook-pages">
        {
          category.notebooks.map(notebook => (
            <li key={notebook.slug}>
              <Link to={`notebook/${notebook.slug}`} >{notebook.subject}</Link>
            </li>
          ))
        }
      </ul>

      <hr className="uk-divider-icon" />

    </li>
  )
}

export default CategoryItem