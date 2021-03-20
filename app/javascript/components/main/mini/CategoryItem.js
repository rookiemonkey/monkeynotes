import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {

  return (
    <li className="category-item uk-margin-medium-bottom uk-padding-small" key={category.id}>

      <h2 className="category-header"> {category.subject} </h2>

      <ul className="uk-list uk-list-hyphen" id="list-notebook-pages">
        {
          category.notebooks.map(notebook => (
            <li key={notebook.slug}>
              <Link to={`notebook/${notebook.slug}`} >{notebook.subject}</Link>
            </li>
          ))
        }
      </ul>

    </li>
  )
}

export default CategoryItem