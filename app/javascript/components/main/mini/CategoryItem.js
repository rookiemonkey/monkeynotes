import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs'
import CategoryItemModal from './CategoryItemModal';

const CategoryItem = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <li className="category-item uk-margin-medium-bottom uk-padding-small" key={category.id}>

      <CategoryItemModal
        isOpen={isOpen}
        closeModal={closeModal}
        category={category}
      />

      <div className="category-header-container uk-margin-bottom">
        <h2 className="category-header">
          {category.subject}
        </h2>
        <span className="category-subheader">
          <span uk-icon="pencil" style={{ marginRight: '5px' }} onClick={openModal}></span>
          Updated as of <DayJS format="MM-DD-YYYY">{category.updated_at}</DayJS>
        </span>
      </div>

      <ul className="uk-list uk-list-hyphen" id="list-notebook-pages">
        {
          category.notebooks.map(notebook => (
            <li key={notebook.slug}>
              <Link to={{
                pathname: `notebook/${notebook.slug}`,
                state: { notebook: { subject: notebook.subject, slug: notebook.slug } }
              }}
              >{notebook.subject}</Link>
            </li>
          ))
        }
      </ul>

    </li>
  )
}

export default CategoryItem